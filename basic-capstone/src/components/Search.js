export class Search {
  constructor(onSearch) {
      this.onSearch = onSearch;
      this.setupSearch();
  }

  setupSearch() {
    // set up the search input with debouncing
        // So we don't flood the system with search requests while someone's still typing
      const searchInput = document.getElementById('searchInput');
      
    
      let debounceTimer;
      
      searchInput.addEventListener('input', (e) => {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
              this.handleSearch(e.target.value);
          }, 300); // Wait 300ms after user stops typing
      });
  }

  handleSearch(searchTerm) {
      this.onSearch(searchTerm.toLowerCase());
  }
}