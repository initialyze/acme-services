/*
 * CTA Banner Block
 * Promote registration or other actions
 */
export default function decorate(block) {
  // Create CTA banner container
  const ctaContainer = document.createElement('div');
  ctaContainer.className = 'cta-banner-container';

  // Process each row
  const rows = [...block.children];

  rows.forEach((row) => {
    const cells = [...row.children];

    // Process cells: headline, description, image, CTA button
    if (cells.length >= 2) {
      const headlineCell = cells[0];
      const descriptionCell = cells[1];
      const imageCell = cells[2] || null;
      const ctaCell = cells[3] || null;

      // Add headline
      if (headlineCell.textContent.trim()) {
        const headlineDiv = document.createElement('h2');
        headlineDiv.className = 'cta-headline';
        headlineDiv.textContent = headlineCell.textContent.trim();
        ctaContainer.appendChild(headlineDiv);
      }

      // Add description
      if (descriptionCell.textContent.trim()) {
        const descDiv = document.createElement('div');
        descDiv.className = 'cta-description';
        descDiv.textContent = descriptionCell.textContent.trim();
        ctaContainer.appendChild(descDiv);
      }

      // Add image if provided
      if (imageCell && imageCell.textContent.trim()) {
        const imageDiv = document.createElement('div');
        imageDiv.className = 'cta-image';

        // If it's an image, use it directly
        if (imageCell.querySelector('img')) {
          imageDiv.appendChild(imageCell.firstElementChild);
        } else {
          // Otherwise, treat as a URL
          const img = document.createElement('img');
          img.src = imageCell.textContent.trim();
          img.alt = headlineCell.textContent.trim() || 'Event image';
          imageDiv.appendChild(img);
        }

        ctaContainer.appendChild(imageDiv);
      }

      // Add CTA button if provided
      if (ctaCell && ctaCell.textContent.trim()) {
        const ctaButton = document.createElement('a');
        ctaButton.className = 'cta-button';
        ctaButton.href = ctaCell.textContent.trim();
        ctaButton.textContent = 'Register Now';
        ctaButton.target = '_blank';
        ctaContainer.appendChild(ctaButton);
      }
    }
  });

  // Replace the block with the CTA container
  block.innerHTML = '';
  block.appendChild(ctaContainer);
}
