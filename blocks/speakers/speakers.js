/*
 * Speaker Cards Block
 * Display speaker profiles with photos, bios, and company info
 * Supports both table-based and Content Fragment-based content
 */

// Function to create speaker card from fragment data
function createSpeakerCardFromFragment(speakerData) {
  const speakerCard = document.createElement('div');
  speakerCard.className = 'speaker-card';

  // Add photo
  if (speakerData.image_ext) {
    const photoDiv = document.createElement('div');
    photoDiv.className = 'speaker-photo';

    const img = document.createElement('img');
    img.src = speakerData.image_ext;
    img.alt = speakerData.title || 'Speaker';
    photoDiv.appendChild(img);
    speakerCard.appendChild(photoDiv);
  } else if (speakerData.image) {
    // Fallback to image property if image_ext is not available
    const photoDiv = document.createElement('div');
    photoDiv.className = 'speaker-photo';

    const img = document.createElement('img');
    img.src = speakerData.image;
    img.alt = speakerData.title || 'Speaker';
    photoDiv.appendChild(img);
    speakerCard.appendChild(photoDiv);
  }

  // Add name
  if (speakerData.title) {
    const nameDiv = document.createElement('div');
    nameDiv.className = 'speaker-name';
    nameDiv.textContent = speakerData.title;
    speakerCard.appendChild(nameDiv);
  }

  // Add title
  if (speakerData.jobTitle) {
    const titleDiv = document.createElement('div');
    titleDiv.className = 'speaker-title';
    titleDiv.textContent = speakerData.jobTitle;
    speakerCard.appendChild(titleDiv);
  }

  // Add company
  if (speakerData.companyName) {
    const companyDiv = document.createElement('div');
    companyDiv.className = 'speaker-company';
    companyDiv.textContent = speakerData.companyName;
    speakerCard.appendChild(companyDiv);
  }

  // Add bio (from description)
  if (speakerData.description && speakerData.description.html) {
    const bioDiv = document.createElement('div');
    bioDiv.className = 'speaker-bio';
    bioDiv.textContent = speakerData.description.html;
    speakerCard.appendChild(bioDiv);
  }

  // Add social links (if available)
  if (speakerData.tags && speakerData.tags.length > 0) {
    const socialDiv = document.createElement('div');
    socialDiv.className = 'speaker-social';

    speakerData.tags.forEach((tag) => {
      const linkSpan = document.createElement('span');
      linkSpan.className = 'speaker-social-link';
      linkSpan.textContent = tag;
      socialDiv.appendChild(linkSpan);
    });

    speakerCard.appendChild(socialDiv);
  }

  return speakerCard;
}

// Function to process table-based speakers (used in both modes)
function processTableBasedSpeakers(block, container) {
  // Process each row as a speaker
  const rows = [...block.children];

  rows.forEach((row, index) => {
    // Skip if it's the header row
    if (index === 0) {
      row.classList.add('speakers-header');
      return;
    }

    // Create speaker card
    const speakerCard = document.createElement('div');
    speakerCard.className = 'speaker-card';

    const cells = [...row.children];

    // Process cells: name, title, company, photo, bio, social links
    if (cells.length >= 4) {
      const nameCell = cells[0];
      const titleCell = cells[1];
      const companyCell = cells[2];
      const photoCell = cells[3];
      const bioCell = cells[4] || null;
      const socialCell = cells[5] || null;

      // Add photo
      if (photoCell.textContent.trim()) {
        const photoDiv = document.createElement('div');
        photoDiv.className = 'speaker-photo';

        // If it's an image, use it directly
        if (photoCell.querySelector('img')) {
          photoDiv.appendChild(photoCell.firstElementChild);
        } else {
          // Otherwise, treat as a URL
          const img = document.createElement('img');
          img.src = photoCell.textContent.trim();
          img.alt = nameCell.textContent.trim();
          photoDiv.appendChild(img);
        }

        speakerCard.appendChild(photoDiv);
      }

      // Add name
      if (nameCell.textContent.trim()) {
        const nameDiv = document.createElement('div');
        nameDiv.className = 'speaker-name';
        nameDiv.textContent = nameCell.textContent.trim();
        speakerCard.appendChild(nameDiv);
      }

      // Add title
      if (titleCell.textContent.trim()) {
        const titleDiv = document.createElement('div');
        titleDiv.className = 'speaker-title';
        titleDiv.textContent = titleCell.textContent.trim();
        speakerCard.appendChild(titleDiv);
      }

      // Add company
      if (companyCell.textContent.trim()) {
        const companyDiv = document.createElement('div');
        companyDiv.className = 'speaker-company';
        companyDiv.textContent = companyCell.textContent.trim();
        speakerCard.appendChild(companyDiv);
      }

      // Add bio
      if (bioCell && bioCell.textContent.trim()) {
        const bioDiv = document.createElement('div');
        bioDiv.className = 'speaker-bio';
        bioDiv.textContent = bioCell.textContent.trim();
        speakerCard.appendChild(bioDiv);
      }

      // Add social links
      if (socialCell && socialCell.textContent.trim()) {
        const socialDiv = document.createElement('div');
        socialDiv.className = 'speaker-social';

        const socialLinks = socialCell.textContent.trim().split(',');
        socialLinks.forEach((link) => {
          const linkSpan = document.createElement('span');
          linkSpan.className = 'speaker-social-link';
          linkSpan.textContent = link.trim();
          socialDiv.appendChild(linkSpan);
        });

        speakerCard.appendChild(socialDiv);
      }
    }

    container.appendChild(speakerCard);
  });
}

// Function to load speakers from Content Fragment
async function loadSpeakersFromFragment(fragmentPath, container) {
  try {
    const response = await fetch(fragmentPath);
    const data = await response.json();

    if (data && data.items) {
      data.items.forEach((item) => {
        const speakerCard = createSpeakerCardFromFragment(item);
        container.appendChild(speakerCard);
      });
    }
  } catch (error) {
    // Fallback to default behavior
    processTableBasedSpeakers(null, container);
  }
}

export default function decorate(block) {
  // Create speakers container
  const speakersContainer = document.createElement('div');
  speakersContainer.className = 'speakers-container';

  // Check if this is a fragment-based block
  const { fragmentPath } = block.dataset;

  if (fragmentPath) {
    // Load content from fragment
    loadSpeakersFromFragment(fragmentPath, speakersContainer);
  } else {
    // Fallback to table-based content
    processTableBasedSpeakers(block, speakersContainer);
  }

  // Replace the block with the speakers container
  block.innerHTML = '';
  block.appendChild(speakersContainer);
}
