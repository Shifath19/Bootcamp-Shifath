export class Pagination {
  constructor(totalItems, itemsPerPage, currentPage, onPageChange) {
    
        // Keeping track of how many items we have and how many to show per page
      this.totalItems = totalItems;
      this.itemsPerPage = itemsPerPage;
      this.currentPage = currentPage;
      this.onPageChange = onPageChange;
      this.totalPages = Math.ceil(totalItems / itemsPerPage);
  }

  updatePagination(totalItems) {
    
      this.totalItems = totalItems;
      this.totalPages = Math.ceil(totalItems / this.itemsPerPage);
      this.render();
  }

  render() {
    
        // Previous button, page numbers, next button - 
      const paginationContainer = document.querySelector('.pagination');
      paginationContainer.innerHTML = '';

      // Previous button
      const prevButton = document.createElement('button');
      prevButton.id = 'prevPage';
      prevButton.textContent = 'Previous';
      prevButton.disabled = this.currentPage === 1;
      prevButton.addEventListener('click', () => this.goToPage(this.currentPage - 1));

      // Current page indicator
      const currentPageSpan = document.createElement('span');
      currentPageSpan.id = 'currentPage';
      currentPageSpan.textContent = `Page ${this.currentPage} of ${this.totalPages}`;

      // Next button
      const nextButton = document.createElement('button');
      nextButton.id = 'nextPage';
      nextButton.textContent = 'Next';
      nextButton.disabled = this.currentPage === this.totalPages;
      nextButton.addEventListener('click', () => this.goToPage(this.currentPage + 1));

      // Append elements
      paginationContainer.appendChild(prevButton);
      paginationContainer.appendChild(currentPageSpan);
      paginationContainer.appendChild(nextButton);
  }

  goToPage(page) {
     // Making sure we don't try to go to page 0 or beyond the last page
      if (page >= 1 && page <= this.totalPages) {
          this.currentPage = page;
          this.onPageChange(page);
          this.render();
      }
  }
}