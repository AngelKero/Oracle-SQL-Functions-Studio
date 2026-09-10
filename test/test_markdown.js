import { CURRICULUM_MODULES } from '../js/data/curriculum.js';

export function renderMarkdown(md) {
  if (!md) return '';
  const lines = md.trim().split('\n');
  const output = [];

  let inCodeBlock = false;
  let codeBlockLines = [];

  let inTable = false;
  let tableRows = [];

  let inList = false;
  let listItems = [];
  let listType = 'ul';

  function formatInline(str) {
    return str
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>');
  }

  function flushTable() {
    if (!inTable || tableRows.length === 0) return;
    let html = '<div class="table-responsive-wrapper results-table-scroll"><table class="oracle-table markdown-table"><thead>';
    const headerCells = tableRows[0].split('|').slice(1, -1).map(c => c.trim());
    html += '<tr>' + headerCells.map(c => `<th>${formatInline(c)}</th>`).join('') + '</tr></thead><tbody>';

    let startBody = 1;
    if (tableRows.length > 1 && tableRows[1].includes('---')) {
      startBody = 2;
    }

    for (let r = startBody; r < tableRows.length; r++) {
      const cells = tableRows[r].split('|').slice(1, -1).map(c => c.trim());
      html += '<tr>' + cells.map(c => `<td>${formatInline(c)}</td>`).join('') + '</tr>';
    }
    html += '</tbody></table></div>';
    output.push(html);
    tableRows = [];
    inTable = false;
  }

  function flushList() {
    if (!inList || listItems.length === 0) return;
    output.push(`<${listType} style="margin: 0.75rem 0 1rem 1.5rem;">${listItems.map(li => `<li>${formatInline(li)}</li>`).join('')}</${listType}>`);
    listItems = [];
    inList = false;
  }

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    // Code block toggle
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        // End code block
        output.push(`<div class="code-snippet-box"><pre><code>${codeBlockLines.join('\n')}</code></pre></div>`);
        codeBlockLines = [];
        inCodeBlock = false;
      } else {
        // Start code block
        flushTable();
        flushList();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(rawLine);
      continue;
    }

    // Table line
    if (line.startsWith('|') && line.endsWith('|')) {
      flushList();
      inTable = true;
      tableRows.push(line);
      continue;
    } else if (inTable) {
      flushTable();
    }

    // Bullet or Numbered List
    const bulletMatch = line.match(/^[-*]\s+(.*)$/);
    const numMatch = line.match(/^\d+\.\s+(.*)$/);

    if (bulletMatch) {
      flushTable();
      if (!inList || listType !== 'ul') {
        flushList();
        inList = true;
        listType = 'ul';
      }
      listItems.push(bulletMatch[1]);
      continue;
    } else if (numMatch) {
      flushTable();
      if (!inList || listType !== 'ol') {
        flushList();
        inList = true;
        listType = 'ol';
      }
      listItems.push(numMatch[1]);
      continue;
    } else if (inList && line === '') {
      flushList();
      continue;
    } else if (inList) {
      flushList();
    }

    if (line === '') continue;

    // Subheadings
    if (line.startsWith('### ')) {
      output.push(`<h4 style="color: #fff; margin: 1.25rem 0 0.5rem 0;">${formatInline(line.substring(4))}</h4>`);
      continue;
    }

    // Regular paragraph
    output.push(`<p style="margin-bottom: 0.85rem;">${formatInline(line)}</p>`);
  }

  if (inCodeBlock && codeBlockLines.length > 0) {
    output.push(`<div class="code-snippet-box"><pre><code>${codeBlockLines.join('\n')}</code></pre></div>`);
  }
  flushTable();
  flushList();

  return output.join('\n');
}

// Test against all modules
let errorCount = 0;
for (const m of CURRICULUM_MODULES) {
  for (const s of m.sections) {
    const html = renderMarkdown(s.content);
    if (!html || html.includes('| :--- |')) {
      console.error(`Unrendered table in ${m.id} - ${s.title}`);
      errorCount++;
    }
  }
}

if (errorCount === 0) {
  console.log('✅ Markdown parser correctly processed all 8 curriculum modules and all sections without errors!');
} else {
  console.error(`❌ Found ${errorCount} errors`);
  process.exit(1);
}
