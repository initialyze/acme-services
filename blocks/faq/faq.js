/*
 * FAQ Block
 * Display frequently asked questions
 */
export default function decorate(block) {
  // Create FAQ container
  const faqContainer = document.createElement('div');
  faqContainer.className = 'faq-container';

  // Process each row as a FAQ item
  const rows = [...block.children];

  rows.forEach((row, index) => {
    // Skip if it's the header row
    if (index === 0) {
      row.classList.add('faq-header');
      return;
    }

    // Create FAQ item
    const faqItem = document.createElement('details');
    faqItem.className = 'faq-item';

    const cells = [...row.children];

    // Process cells: question, answer
    if (cells.length >= 2) {
      const questionCell = cells[0];
      const answerCell = cells[1];

      // Create summary (question)
      const summary = document.createElement('summary');
      summary.className = 'faq-question';
      summary.textContent = questionCell.textContent.trim();

      // Add question icon
      const questionIcon = document.createElement('span');
      questionIcon.className = 'faq-question-icon';
      questionIcon.textContent = '+';
      summary.appendChild(questionIcon);

      // Create answer (body)
      const answer = document.createElement('div');
      answer.className = 'faq-answer';
      answer.innerHTML = answerCell.innerHTML.trim();

      // Add elements to FAQ item
      faqItem.appendChild(summary);
      faqItem.appendChild(answer);
    }

    faqContainer.appendChild(faqItem);
  });

  // Replace the block with the FAQ container
  block.innerHTML = '';
  block.appendChild(faqContainer);
}
