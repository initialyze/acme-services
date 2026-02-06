/*
 * Sponsor Logos Block
 * Display sponsor logos and company information
 */
export default function decorate(block) {
  // Create sponsors container
  const sponsorsContainer = document.createElement('div');
  sponsorsContainer.className = 'sponsors-container';

  // Process each row as a sponsor
  const rows = [...block.children];

  rows.forEach((row, index) => {
    // Skip if it's the header row
    if (index === 0) {
      row.classList.add('sponsors-header');
      return;
    }

    // Create sponsor item
    const sponsorItem = document.createElement('div');
    sponsorItem.className = 'sponsor-item';

    const cells = [...row.children];

    // Process cells: company name, logo, website, tier level, description
    if (cells.length >= 3) {
      const nameCell = cells[0];
      const logoCell = cells[1];
      const websiteCell = cells[2];
      const tierCell = cells[3] || null;
      const descCell = cells[4] || null;

      // Add logo
      if (logoCell.textContent.trim()) {
        const logoDiv = document.createElement('div');
        logoDiv.className = 'sponsor-logo';

        // If it's an image, use it directly
        if (logoCell.querySelector('img')) {
          logoDiv.appendChild(logoCell.firstElementChild);
        } else {
          // Otherwise, treat as a URL
          const img = document.createElement('img');
          img.src = logoCell.textContent.trim();
          img.alt = nameCell.textContent.trim();
          logoDiv.appendChild(img);
        }

        sponsorItem.appendChild(logoDiv);
      }

      // Add company name
      if (nameCell.textContent.trim()) {
        const nameDiv = document.createElement('div');
        nameDiv.className = 'sponsor-name';
        nameDiv.textContent = nameCell.textContent.trim();
        sponsorItem.appendChild(nameDiv);
      }

      // Add website link
      if (websiteCell.textContent.trim()) {
        const websiteLink = document.createElement('a');
        websiteLink.className = 'sponsor-website';
        websiteLink.href = websiteCell.textContent.trim();
        websiteLink.textContent = 'Visit Website';
        websiteLink.target = '_blank';
        sponsorItem.appendChild(websiteLink);
      }

      // Add tier level
      if (tierCell && tierCell.textContent.trim()) {
        const tierDiv = document.createElement('div');
        tierDiv.className = 'sponsor-tier';
        tierDiv.textContent = tierCell.textContent.trim();
        sponsorItem.appendChild(tierDiv);
      }

      // Add description
      if (descCell && descCell.textContent.trim()) {
        const descDiv = document.createElement('div');
        descDiv.className = 'sponsor-description';
        descDiv.textContent = descCell.textContent.trim();
        sponsorItem.appendChild(descDiv);
      }
    }

    sponsorsContainer.appendChild(sponsorItem);
  });

  // Replace the block with the sponsors container
  block.innerHTML = '';
  block.appendChild(sponsorsContainer);
}
