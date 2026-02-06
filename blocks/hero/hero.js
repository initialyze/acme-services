/*
 * Hero Block
 * Display event branding with CTA
 * https://www.hlx.live/developer/block-collection/hero
 */
export default function decorate(block) {
  // Get all rows in the block
  const rows = [...block.children];

  // Process each row
  rows.forEach((row) => {
    // Get all cells in the row
    const cells = [...row.children];

    // Process cells based on their content
    if (cells.length >= 2) {
      // First cell is typically the image or background
      const imageCell = cells[0];
      const contentCell = cells[1];

      // Add hero class to the row
      row.classList.add('hero');

      // Add image wrapper if needed
      if (imageCell.querySelector('picture')) {
        imageCell.classList.add('hero-image');
      }

      // Add content wrapper
      if (contentCell) {
        contentCell.classList.add('hero-content');
      }
    }
  });
}
