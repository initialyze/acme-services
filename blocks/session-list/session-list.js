/*
 * Session List Block
 * Display list of sessions with key details
 */
export default function decorate(block) {
  // Create session list container
  const sessionListContainer = document.createElement('div');
  sessionListContainer.className = 'session-list-container';

  // Process each row as a session
  const rows = [...block.children];

  rows.forEach((row, index) => {
    // Skip if it's the header row
    if (index === 0) {
      row.classList.add('session-list-header');
      return;
    }

    // Create session item
    const sessionItem = document.createElement('div');
    sessionItem.className = 'session-item';

    const cells = [...row.children];

    // Process cells: title, date, time, speaker, description, tags
    if (cells.length >= 5) {
      const titleCell = cells[0];
      const dateCell = cells[1];
      const timeCell = cells[2];
      const speakerCell = cells[3];
      const descriptionCell = cells[4];
      const tagsCell = cells[5] || null;

      // Add title
      if (titleCell.textContent.trim()) {
        const titleDiv = document.createElement('div');
        titleDiv.className = 'session-title';
        titleDiv.textContent = titleCell.textContent.trim();
        sessionItem.appendChild(titleDiv);
      }

      // Add date and time
      const dateTimeDiv = document.createElement('div');
      dateTimeDiv.className = 'session-datetime';

      if (dateCell.textContent.trim()) {
        const dateSpan = document.createElement('span');
        dateSpan.className = 'session-date';
        dateSpan.textContent = dateCell.textContent.trim();
        dateTimeDiv.appendChild(dateSpan);
      }

      if (timeCell.textContent.trim()) {
        const timeSpan = document.createElement('span');
        timeSpan.className = 'session-time';
        timeSpan.textContent = timeCell.textContent.trim();
        dateTimeDiv.appendChild(timeSpan);
      }

      sessionItem.appendChild(dateTimeDiv);

      // Add speaker
      if (speakerCell.textContent.trim()) {
        const speakerDiv = document.createElement('div');
        speakerDiv.className = 'session-speaker';
        speakerDiv.textContent = speakerCell.textContent.trim();
        sessionItem.appendChild(speakerDiv);
      }

      // Add description
      if (descriptionCell.textContent.trim()) {
        const descDiv = document.createElement('div');
        descDiv.className = 'session-description';
        descDiv.textContent = descriptionCell.textContent.trim();
        sessionItem.appendChild(descDiv);
      }

      // Add tags
      if (tagsCell && tagsCell.textContent.trim()) {
        const tagsDiv = document.createElement('div');
        tagsDiv.className = 'session-tags';

        const tags = tagsCell.textContent.trim().split(',');
        tags.forEach((tag) => {
          const tagSpan = document.createElement('span');
          tagSpan.className = 'session-tag';
          tagSpan.textContent = tag.trim();
          tagsDiv.appendChild(tagSpan);
        });

        sessionItem.appendChild(tagsDiv);
      }
    }

    sessionListContainer.appendChild(sessionItem);
  });

  // Replace the block with the session list
  block.innerHTML = '';
  block.appendChild(sessionListContainer);
}
