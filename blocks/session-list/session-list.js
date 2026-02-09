/*
 * Session List Block
 * Display list of sessions with key details from JSON data
 */
export default function decorate(block) {
  // Get the JSON data endpoint from the block's first data attribute
  const jsonEndpoint = block.dataset.jsonEndpoint || 'https://raw.githubusercontent.com/initialyze/initialyzers-aem-data/refs/heads/main/session-catalog.json';

  // Create session list container
  const sessionListContainer = document.createElement('div');
  sessionListContainer.className = 'session-list-container';

  // Create search bar
  const searchContainer = document.createElement('div');
  searchContainer.className = 'session-search-container';

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search sessions by title, speaker, or description...';
  searchInput.className = 'session-search-input';

  searchContainer.appendChild(searchInput);
  sessionListContainer.appendChild(searchContainer);

  // Create filter controls
  const filterContainer = document.createElement('div');
  filterContainer.className = 'session-filter-container';

  const categoryFilter = document.createElement('select');
  categoryFilter.className = 'session-category-filter';
  categoryFilter.innerHTML = `
    <option value="">All Categories</option>
    <option value="keynote">Keynote</option>
    <option value="workshop">Workshop</option>
    <option value="talk">Talk</option>
    <option value="panel">Panel</option>
  `;

  const sortBySelect = document.createElement('select');
  sortBySelect.className = 'session-sort-select';
  sortBySelect.innerHTML = `
    <option value="date">Sort by Date</option>
    <option value="title">Sort by Title</option>
    <option value="speaker">Sort by Speaker</option>
  `;

  filterContainer.appendChild(categoryFilter);
  filterContainer.appendChild(sortBySelect);
  sessionListContainer.appendChild(filterContainer);

  // Create pagination controls
  const paginationContainer = document.createElement('div');
  paginationContainer.className = 'session-pagination-container';

  const prevButton = document.createElement('button');
  prevButton.className = 'session-pagination-btn session-prev-btn';
  prevButton.textContent = 'Previous';
  prevButton.disabled = true;

  const pageDisplay = document.createElement('span');
  pageDisplay.className = 'session-page-display';
  pageDisplay.textContent = 'Page 1 of 1';

  const nextButton = document.createElement('button');
  nextButton.className = 'session-pagination-btn session-next-btn';
  nextButton.textContent = 'Next';
  nextButton.disabled = true;

  paginationContainer.appendChild(prevButton);
  paginationContainer.appendChild(pageDisplay);
  paginationContainer.appendChild(nextButton);
  sessionListContainer.appendChild(paginationContainer);

  // Create session grid
  const sessionGrid = document.createElement('div');
  sessionGrid.className = 'session-grid';
  sessionListContainer.appendChild(sessionGrid);

  // Store session data
  let allSessions = [];
  let filteredSessions = [];
  let currentPage = 1;
  const itemsPerPage = 10;

  // Function to fetch and process JSON data
  async function fetchSessions() {
    try {
      if (!jsonEndpoint) {
        // If no endpoint provided, create sample data
        allSessions = [
          {
            id: 1,
            title: "Introduction to Modern Web Development",
            speaker: "Jane Smith",
            description: "Learn the latest trends and best practices in web development.",
            date: "2023-10-15",
            time: "09:00 - 10:30",
            category: "talk",
            tags: ["web", "development", "javascript"]
          },
          {
            id: 2,
            title: "Advanced CSS Techniques",
            speaker: "John Doe",
            description: "Deep dive into modern CSS features and layout techniques.",
            date: "2023-10-15",
            time: "11:00 - 12:30",
            category: "workshop",
            tags: ["css", "frontend", "design"]
          },
          {
            id: 3,
            title: "Building Scalable Applications",
            speaker: "Alice Johnson",
            description: "How to design and build scalable applications using modern frameworks.",
            date: "2023-10-15",
            time: "14:00 - 15:30",
            category: "keynote",
            tags: ["architecture", "scalability", "frameworks"]
          },
          {
            id: 4,
            title: "JavaScript Performance Optimization",
            speaker: "Bob Wilson",
            description: "Techniques to optimize JavaScript performance for better user experience.",
            date: "2023-10-16",
            time: "10:00 - 11:30",
            category: "talk",
            tags: ["javascript", "performance", "optimization"]
          },
          {
            id: 5,
            title: "Responsive Design Patterns",
            speaker: "Sarah Davis",
            description: "Best practices for creating responsive designs that work across all devices.",
            date: "2023-10-16",
            time: "13:00 - 14:30",
            category: "workshop",
            tags: ["responsive", "design", "mobile"]
          },
          {
            id: 6,
            title: "API Security Best Practices",
            speaker: "Michael Brown",
            description: "Essential security practices for API development and deployment.",
            date: "2023-10-16",
            time: "15:00 - 16:30",
            category: "panel",
            tags: ["security", "api", "development"]
          },
          {
            id: 7,
            title: "The Future of Web Technologies",
            speaker: "Emma Taylor",
            description: "Exploring upcoming web technologies and their potential impact.",
            date: "2023-10-17",
            time: "09:30 - 11:00",
            category: "keynote",
            tags: ["future", "technology", "innovation"]
          },
          {
            id: 8,
            title: "Accessibility in Modern Web Apps",
            speaker: "David Miller",
            description: "How to make web applications accessible to all users.",
            date: "2023-10-17",
            time: "12:00 - 13:30",
            category: "talk",
            tags: ["accessibility", "wcag", "inclusive"]
          },
          {
            id: 9,
            title: "State Management in React Applications",
            speaker: "Lisa Anderson",
            description: "Advanced patterns for state management in React applications.",
            date: "2023-10-17",
            time: "14:00 - 15:30",
            category: "workshop",
            tags: ["react", "state", "redux"]
          },
          {
            id: 10,
            title: "Cloud-Native Development Patterns",
            speaker: "Robert Thomas",
            description: "Building applications for the cloud using modern patterns and practices.",
            date: "2023-10-17",
            time: "16:00 - 17:30",
            category: "talk",
            tags: ["cloud", "development", "patterns"]
          },
          {
            id: 11,
            title: "Machine Learning for Web Developers",
            speaker: "Jennifer White",
            description: "Introduction to machine learning concepts and how they apply to web development.",
            date: "2023-10-18",
            time: "10:00 - 11:30",
            category: "workshop",
            tags: ["ml", "ai", "web"]
          },
          {
            id: 12,
            title: "DevOps Practices for Modern Teams",
            speaker: "Christopher Lee",
            description: "Effective DevOps practices to improve team productivity and deployment reliability.",
            date: "2023-10-18",
            time: "13:00 - 14:30",
            category: "panel",
            tags: ["devops", "ci/cd", "teams"]
          }
        ];
      } else {
        // Fetch data from the provided endpoint
        const response = await fetch(jsonEndpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        allSessions = Array.isArray(data) ? data : (data.sessions || []);
      }

      // Process the data
      filteredSessions = [...allSessions];
      renderSessions();
    } catch (error) {
      console.error('Error fetching sessions:', error);
      // Create a fallback UI with error message
      const errorDiv = document.createElement('div');
      errorDiv.className = 'session-error';
      errorDiv.textContent = 'Failed to load sessions. Please try again later.';
      sessionListContainer.innerHTML = '';
      sessionListContainer.appendChild(errorDiv);
    }
  }

  // Function to filter sessions based on search term
  function filterSessions() {
    const searchTerm = searchInput.value.toLowerCase();
    const categoryFilterValue = categoryFilter.value;

    filteredSessions = allSessions.filter(session => {
      const matchesSearch =
        (session.title && session.title.toLowerCase().includes(searchTerm)) ||
        (session.speaker && session.speaker.toLowerCase().includes(searchTerm)) ||
        (session.description && session.description.toLowerCase().includes(searchTerm));

      const matchesCategory = categoryFilterValue ? session.category === categoryFilterValue : true;

      return matchesSearch && matchesCategory;
    });

    currentPage = 1;
    renderSessions();
  }

  // Function to sort sessions
  function sortSessions() {
    const sortBy = sortBySelect.value;

    filteredSessions.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date) - new Date(b.date);
        case 'title':
          return (a.title || '').localeCompare(b.title || '');
        case 'speaker':
          return (a.speaker || '').localeCompare(b.speaker || '');
        default:
          return 0;
      }
    });

    renderSessions();
  }

  // Function to render sessions with pagination
  function renderSessions() {
    // Clear the grid
    sessionGrid.innerHTML = '';

    // Calculate pagination
    const totalPages = Math.ceil(filteredSessions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentSessions = filteredSessions.slice(startIndex, endIndex);

    // Update pagination controls
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages || totalPages === 0;
    pageDisplay.textContent = `Page ${currentPage} of ${totalPages || 1}`;

    // Render session cards
    currentSessions.forEach(session => {
      const sessionCard = document.createElement('div');
      sessionCard.className = 'session-card';

      // Create session card content
      sessionCard.innerHTML = `
        <div class="session-card-header">
          <h3 class="session-card-title">${session.title || 'Untitled Session'}</h3>
          <span class="session-card-category">${session.category || 'General'}</span>
        </div>
        <div class="session-card-speaker">
          <strong>Speaker:</strong> ${session.speaker || 'TBD'}
        </div>
        <div class="session-card-date-time">
          <span class="session-card-date">${session.date || 'Date TBD'}</span>
          <span class="session-card-time">${session.time || 'Time TBD'}</span>
        </div>
        <div class="session-card-description">
          ${session.description || 'No description available.'}
        </div>
        <div class="session-card-tags">
          ${session.tags && session.tags.length > 0
            ? session.tags.map(tag => `<span class="session-tag">${tag}</span>`).join('')
            : ''}
        </div>
        <div class="session-card-link">
          <a href="${session.detailsUrl || '#'}" class="session-details-link">View Details</a>
        </div>
      `;

      sessionGrid.appendChild(sessionCard);
    });

    // Add event listeners for pagination
    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderSessions();
      }
    });

    nextButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderSessions();
      }
    });

    // Add event listeners for filters and search
    searchInput.addEventListener('input', filterSessions);
    categoryFilter.addEventListener('change', filterSessions);
    sortBySelect.addEventListener('change', sortSessions);
  }

  // Fetch and display sessions
  fetchSessions();

  // Replace the block with the session list
  block.innerHTML = '';
  block.appendChild(sessionListContainer);
}