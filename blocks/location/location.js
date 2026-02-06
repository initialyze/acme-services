/*
 * Location/Map Block
 * Display event location details and map
 */
export default function decorate(block) {
  // Create location container
  const locationContainer = document.createElement('div');
  locationContainer.className = 'location-container';

  // Process each row
  const rows = [...block.children];

  rows.forEach((row) => {
    const cells = [...row.children];

    // Process cells: address, map embed, directions, venue details
    if (cells.length >= 2) {
      const addressCell = cells[0];
      const mapCell = cells[1];
      const directionsCell = cells[2] || null;
      const venueCell = cells[3] || null;

      // Add address
      if (addressCell.textContent.trim()) {
        const addressDiv = document.createElement('div');
        addressDiv.className = 'location-address';
        addressDiv.innerHTML = addressCell.innerHTML.trim();
        locationContainer.appendChild(addressDiv);
      }

      // Add map
      if (mapCell.textContent.trim()) {
        const mapDiv = document.createElement('div');
        mapDiv.className = 'location-map';

        // If it's an iframe or image, use it directly
        if (mapCell.querySelector('iframe') || mapCell.querySelector('img')) {
          mapDiv.appendChild(mapCell.firstElementChild);
        } else {
          // Otherwise, treat as a URL and create an iframe
          const iframe = document.createElement('iframe');
          iframe.src = mapCell.textContent.trim();
          iframe.width = '100%';
          iframe.height = '400';
          iframe.frameBorder = '0';
          iframe.allowFullscreen = true;
          iframe.title = 'Event Location Map';
          mapDiv.appendChild(iframe);
        }

        locationContainer.appendChild(mapDiv);
      }

      // Add directions
      if (directionsCell && directionsCell.textContent.trim()) {
        const directionsDiv = document.createElement('div');
        directionsDiv.className = 'location-directions';
        directionsDiv.innerHTML = directionsCell.innerHTML.trim();
        locationContainer.appendChild(directionsDiv);
      }

      // Add venue details
      if (venueCell && venueCell.textContent.trim()) {
        const venueDiv = document.createElement('div');
        venueDiv.className = 'location-venue';
        venueDiv.innerHTML = venueCell.innerHTML.trim();
        locationContainer.appendChild(venueDiv);
      }
    }
  });

  // Replace the block with the location container
  block.innerHTML = '';
  block.appendChild(locationContainer);
}
