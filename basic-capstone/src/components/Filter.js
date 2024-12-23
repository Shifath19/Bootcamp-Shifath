export class Filter {
  constructor(field, type, data, onFilterChange) {
       // I store the field name, filter type, data array, and callback function
        // that'll be triggered when the filter changes
      this.field = field;
      this.type = type;
      this.data = data;
      this.onFilterChange = onFilterChange;
  }

  createFilterElement() {
     // I create the main wrapper for a filter element. Each filter gets its own
        // container with a label and the appropriate input type
      const wrapper = document.createElement('div');
      wrapper.className = 'filter-item';

      const label = document.createElement('label');
      label.textContent = this.formatFieldName(this.field);
      wrapper.appendChild(label);

      switch (this.type) {
          case 'range':
              wrapper.appendChild(this.createRangeFilter());
              break;
          case 'select':
              wrapper.appendChild(this.createSelectFilter());
              break;
          case 'search':
              wrapper.appendChild(this.createSearchFilter());
              break;
      }

      return wrapper;
  }

  createRangeFilter() {
        // I handle numeric values by creating a min-max range filter
        // Pretty useful for things like years or citation counts!
      const container = document.createElement('div');
      container.className = 'range-filter';

      const values = this.data.map(item => item[this.field]);
      const min = Math.min(...values);
      const max = Math.max(...values);

      const minInput = document.createElement('input');
      minInput.type = 'number';
      minInput.value = min;
      minInput.className = 'range-input';

      const maxInput = document.createElement('input');
      maxInput.type = 'number';
      maxInput.value = max;
      maxInput.className = 'range-input';

      const updateFilter = () => {
          this.onFilterChange({
              field: this.field,
              type: 'range',
              min: Number(minInput.value),
              max: Number(maxInput.value)
          });
      };

      minInput.addEventListener('change', updateFilter);
      maxInput.addEventListener('change', updateFilter);

      container.appendChild(minInput);
      container.appendChild(document.createTextNode(' to '));
      container.appendChild(maxInput);

      return container;
  }

  createSelectFilter() {
      // I create a dropdown menu for fields with a manageable number of unique values
        // Think categories or venues - stuff you can easily pick from a list
      const select = document.createElement('select');
      select.className = 'select-filter';

      const uniqueValues = [...new Set(this.data.map(item => item[this.field]))];
      
      // Add default option
      const defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.textContent = 'All';
      select.appendChild(defaultOption);

      // Add other options
      uniqueValues.forEach(value => {
          if (value) {  // Only add non-empty values
              const option = document.createElement('option');
              option.value = value;
              option.textContent = value;
              select.appendChild(option);
          }
      });

      select.addEventListener('change', (e) => {
          this.onFilterChange({
              field: this.field,
              type: 'select',
              value: e.target.value
          });
      });

      return select;
  }

  createSearchFilter() {
     // I make a search input for fields with too many unique values
        // Perfect for author names or paper titles where a dropdown would be impractical
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'search-filter';
      input.placeholder = `Search ${this.formatFieldName(this.field)}...`;

      input.addEventListener('input', (e) => {
          this.onFilterChange({
              field: this.field,
              type: 'search',
              value: e.target.value
          });
      });

      return input;
  }

  formatFieldName(field) {
     // I make field names look pretty by capitalizing them and replacing underscores with spaces
        // Because nobody likes reading "publication_year" when they could read "Publication Year"!
      return field
          .split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
  }
}