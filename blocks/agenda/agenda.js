/*
 * Agenda/Schedule Block
 * Display event schedule with time slots and sessions
 */
export default function decorate(block) {
  // Create agenda container
  const agendaContainer = document.createElement('div');
  agendaContainer.className = 'agenda-container';

  // Process each row as an agenda item
  const rows = [...block.children];

  rows.forEach((row, index) => {
    // Skip if it's the header row
    if (index === 0) {
      row.classList.add('agenda-header');
      return;
    }

    // Create agenda item
    const agendaItem = document.createElement('div');
    agendaItem.className = 'agenda-item';

    const cells = [...row.children];

    // Process cells: date, time, session title, speaker, description, room
    if (cells.length >= 5) {
      const dateCell = cells[0];
      const timeCell = cells[1];
      const titleCell = cells[2];
      const speakerCell = cells[3];
      const descriptionCell = cells[4];
      const roomCell = cells[5] || null;

      // Add date and time
      const dateTimeDiv = document.createElement('div');
      dateTimeDiv.className = 'agenda-datetime';

      if (dateCell.textContent.trim()) {
        const dateDiv = document.createElement('div');
        dateDiv.className = 'agenda-date';
        dateDiv.textContent = dateCell.textContent.trim();
        dateTimeDiv.appendChild(dateDiv);
      }

      if (timeCell.textContent.trim()) {
        const timeDiv = document.createElement('div');
        timeDiv.className = 'agenda-time';
        timeDiv.textContent = timeCell.textContent.trim();
        dateTimeDiv.appendChild(timeDiv);
      }

      agendaItem.appendChild(dateTimeDiv);

      // Add session title
      if (titleCell.textContent.trim()) {
        const titleDiv = document.createElement('div');
        titleDiv.className = 'agenda-title';
        titleDiv.textContent = titleCell.textContent.trim();
        agendaItem.appendChild(titleDiv);
      }

      // Add speaker
      if (speakerCell.textContent.trim()) {
        const speakerDiv = document.createElement('div');
        speakerDiv.className = 'agenda-speaker';
        speakerDiv.textContent = speakerCell.textContent.trim();
        agendaItem.appendChild(speakerDiv);
      }

      // Add description
      if (descriptionCell.textContent.trim()) {
        const descDiv = document.createElement('div');
        descDiv.className = 'agenda-description';
        descDiv.textContent = descriptionCell.textContent.trim();
        agendaItem.appendChild(descDiv);
      }

      // Add room
      if (roomCell && roomCell.textContent.trim()) {
        const roomDiv = document.createElement('div');
        roomDiv.className = 'agenda-room';
        roomDiv.textContent = roomCell.textContent.trim();
        agendaItem.appendChild(roomDiv);
      }
    }

    agendaContainer.appendChild(agendaItem);
  });

  // Replace the block with the agenda
  block.innerHTML = '';
  block.appendChild(agendaContainer);
}
