import { Filter } from './components/Filter.js';
import { PaperCard } from './components/PaperCard.js';
import { Pagination } from './components/Pagination.js';
import { Search } from './components/Search.js';
import { DataAnalyzer } from './utils/dataAnalyzer.js';
import { ExportHelper } from './utils/exportHelper.js';

class ResearchPapersApp {
    constructor() {
        this.papers = [];
        this.filteredPapers = [];
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.activeFilters = new Map();
        this.sortField = '';
        this.sortDirection = 'asc';

        this.initialize();
    }

    async initialize() {
        /* Initializes the application by loading data, setting up components and event listeners */
        try {
            await this.loadData();
            this.setupComponents();
            this.setupEventListeners();
            this.applyFiltersAndRender();
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.showError('Failed to load research papers data.');
        }
    }

    async loadData() {
        /* Fetches and loads the first 1000 research papers from the data source */
        try {
            const response = await fetch('./public/data.json');
            if (!response.ok) throw new Error('Failed to fetch data');
            const data = await response.json();
            this.papers = data.slice(0, 1000);
            this.filteredPapers = [...this.papers];
        } catch (error) {
            console.error('Failed to load data:', error);
            this.showError('Failed to load research papers data.');
        }
    }

    setupComponents() {
        /* Initializes search, filters, and pagination components */
        this.search = new Search((searchTerm) => {
            this.handleSearch(searchTerm);
        });

        const filterTypes = DataAnalyzer.analyzeData(this.papers);
        this.setupFilters(filterTypes);

        this.pagination = new Pagination(
            this.filteredPapers.length,
            this.itemsPerPage,
            this.currentPage,
            (page) => this.handlePageChange(page)
        );
    }

    setupFilters(filterTypes) {
        /* Creates and initializes filter widgets based on analyzed data types */
        const filterContainer = document.getElementById('filterContainer');
        filterContainer.innerHTML = '';

        Object.entries(filterTypes).forEach(([field, type]) => {
            const filter = new Filter(field, type, this.papers, (filterData) => {
                this.handleFilterChange(filterData);
            });
            filterContainer.appendChild(filter.createFilterElement());
        });
    }

    setupEventListeners() {
        /* Sets up event listeners for sorting, exporting, and filter clearing */
        document.getElementById('sortSelect').addEventListener('change', (e) => {
            this.handleSort(e.target.value);
        });

        document.getElementById('exportBtn').addEventListener('click', () => {
            this.handleExport();
        });

        document.getElementById('clearFilters').addEventListener('click', () => {
            this.clearAllFilters();
        });
    }

    handleSearch(searchTerm) {
        /* Updates filters based on search term and refreshes display */
        if (searchTerm) {
            this.activeFilters.set('search', {
                type: 'search',
                value: searchTerm
            });
        } else {
            this.activeFilters.delete('search');
        }
        this.applyFiltersAndRender();
    }

    handleFilterChange(filterData) {
        /* Updates active filters based on user input and refreshes display */
        const { field, type, value, min, max } = filterData;
        
        if (value === '' && type !== 'range') {
            this.activeFilters.delete(field);
        } else {
            this.activeFilters.set(field, filterData);
        }

        this.applyFiltersAndRender();
        this.updateActiveFiltersDisplay();
    }

    handleSort(field) {
        /* Updates sorting parameters and refreshes display */
        if (field === this.sortField) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortField = field;
            this.sortDirection = 'asc';
        }
        this.applyFiltersAndRender();
    }

    async handleExport() {
        /* Exports filtered papers to a ZIP file */
        try {
            await ExportHelper.exportToZip(this.filteredPapers);
        } catch (error) {
            console.error('Export failed:', error);
            this.showError('Failed to export data.');
        }
    }

    handlePageChange(page) {
        /* Updates current page and refreshes paper display */
        this.currentPage = page;
        this.renderPapers();
    }

    applyFiltersAndRender() {
        /* Applies all active filters, sorts results, and updates display */
        this.filteredPapers = this.papers.filter(paper => {
            return Array.from(this.activeFilters.values()).every(filter => {
                switch (filter.type) {
                    case 'search':
                        return Object.values(paper).some(value => 
                            String(value).toLowerCase().includes(filter.value.toLowerCase())
                        );
                    case 'select':
                        return !filter.value || paper[filter.field] === filter.value;
                    case 'range':
                        return paper[filter.field] >= filter.min && paper[filter.field] <= filter.max;
                    default:
                        return true;
                }
            });
        });

        if (this.sortField) {
            this.filteredPapers.sort((a, b) => {
                const aVal = a[this.sortField];
                const bVal = b[this.sortField];
                const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
                return this.sortDirection === 'asc' ? comparison : -comparison;
            });
        }

        this.currentPage = 1;
        this.updateResultCount();
        this.pagination.updatePagination(this.filteredPapers.length);
        this.renderPapers();
    }

    renderPapers() {
        /* Renders the current page of filtered papers */
        const papersList = document.getElementById('papersList');
        papersList.innerHTML = '';

        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pageItems = this.filteredPapers.slice(startIndex, endIndex);

        pageItems.forEach(paper => {
            const card = new PaperCard(paper);
            papersList.appendChild(card.createCard());
        });
    }

    updateActiveFiltersDisplay() {
        /* Updates the UI display of currently active filters */
        const container = document.getElementById('activeFilters');
        container.innerHTML = '';

        this.activeFilters.forEach((filter, field) => {
            if (field !== 'search') {
                const tag = document.createElement('span');
                tag.className = 'active-filter';
                tag.textContent = `${field}: ${filter.value || `${filter.min}-${filter.max}`}`;
                
                const removeBtn = document.createElement('button');
                removeBtn.textContent = '×';
                removeBtn.onclick = () => {
                    this.activeFilters.delete(field);
                    this.applyFiltersAndRender();
                    this.updateActiveFiltersDisplay();
                };
                
                tag.appendChild(removeBtn);
                container.appendChild(tag);
            }
        });
    }

    updateResultCount() {
        /* Updates the displayed count of filtered results */
        const countElement = document.getElementById('resultCount');
        countElement.textContent = `${this.filteredPapers.length} results`;
    }

    clearAllFilters() {
        /* Resets all filters and sort parameters to their default states */
        this.activeFilters.clear();
        this.sortField = '';
        this.sortDirection = 'asc';
        
        document.querySelectorAll('select').forEach(select => select.value = '');
        document.querySelectorAll('input').forEach(input => {
            if (input.type !== 'range') input.value = '';
        });
        
        this.applyFiltersAndRender();
        this.updateActiveFiltersDisplay();
    }

    showError(message) {
        /* Displays error message in console */
        console.error(message);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ResearchPapersApp();
});