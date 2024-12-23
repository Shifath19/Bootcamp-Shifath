export class PaperCard {
  constructor(paper) {
     // To keep track of all the paper details we'll need to display
      this.paper = paper;
  }

  createCard() {
    
        // Each card shows the title, authors, year, and other important details
      const card = document.createElement('div');
      card.className = 'paper-card';

      // Add title
      if (this.paper.title) {
          const title = document.createElement('h3');
          title.textContent = this.paper.title;
          card.appendChild(title);
      }

      // Add authors
      if (this.paper.authors) {
          const authors = document.createElement('p');
          authors.className = 'authors';
          authors.textContent = `Authors: ${this.paper.authors}`;
          card.appendChild(authors);
      }

      // Add year
      if (this.paper.year) {
          const year = document.createElement('p');
          year.className = 'year';
          year.textContent = `Year: ${this.paper.year}`;
          card.appendChild(year);
      }

      // Add abstract (with truncation)
      if (this.paper.abstract) {
          const abstract = document.createElement('p');
          abstract.className = 'abstract';
          const truncatedAbstract = this.paper.abstract.length > 200 
              ? this.paper.abstract.substring(0, 200) + '...'
              : this.paper.abstract;
          abstract.textContent = truncatedAbstract;
          card.appendChild(abstract);
      }

      // Add other relevant fields
      this.addAdditionalFields(card);

      return card;
  }

  addAdditionalFields(card) {
      const excludeFields = ['title', 'authors', 'year', 'abstract'];
      
      Object.entries(this.paper).forEach(([key, value]) => {
          if (!excludeFields.includes(key) && value) {
              const element = document.createElement('p');
              element.className = `field-${key}`;
              element.textContent = `${this.formatFieldName(key)}: ${value}`;
              card.appendChild(element);
          }
      });
  }

  formatFieldName(field) {
      return field
          .split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
  }
}