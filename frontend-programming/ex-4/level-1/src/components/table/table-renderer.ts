import { User, TableOptions, SortConfig } from '../../types';
import { Logger } from '../../utils/logger';
import './table.css';

export class TableRenderer {
    private container: HTMLElement;
    private data: User[] = [];
    private options: TableOptions;
    private currentSort: SortConfig = { column: 'id', direction: 'asc' };

    constructor(containerId: string, options: TableOptions = { sortable: true, filterable: true }) {
        const element = document.getElementById(containerId);
        if (!element) {
            throw new Error(`Container element with id '${containerId}' not found`);
        }
        this.container = element;
        this.options = options;
    }

    public showLoading(): void {
        this.container.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Loading data...</p>
            </div>
        `;
    }

    public setData(data: User[]): void {
        Logger.log('Setting table data', data);
        this.data = data;
        this.render();
    }

    private sortData(): User[] {
        return [...this.data].sort((a, b) => {
            const aValue = a[this.currentSort.column];
            const bValue = b[this.currentSort.column];
            
            const modifier = this.currentSort.direction === 'asc' ? 1 : -1;
            
            if (aValue < bValue) return -1 * modifier;
            if (aValue > bValue) return 1 * modifier;
            return 0;
        });
    }

    private render(): void {
        const table = document.createElement('table');
        table.className = 'data-table';

        // Create header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const columns: (keyof User)[] = ['id', 'name', 'age', 'grade'];

        columns.forEach(column => {
            const th = document.createElement('th');
            th.textContent = column.charAt(0).toUpperCase() + column.slice(1);
            
            if (this.options.sortable) {
                th.addEventListener('click', () => this.handleHeaderClick(column));
                if (this.currentSort.column === column) {
                    th.classList.add('sorted', this.currentSort.direction);
                }
            }
            
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create body
        const tbody = document.createElement('tbody');
        const sortedData = this.sortData();

        sortedData.forEach(user => {
            const row = document.createElement('tr');
            columns.forEach(column => {
                const td = document.createElement('td');
                td.textContent = user[column].toString();
                row.appendChild(td);
            });
            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        // Replace existing content
        this.container.innerHTML = '';
        this.container.appendChild(table);
    }

    private handleHeaderClick(column: keyof User): void {
        if (this.currentSort.column === column) {
            this.currentSort.direction = this.currentSort.direction === 'asc' ? 'desc' : 'asc';
        } else {
            this.currentSort = { column, direction: 'asc' };
        }
        this.render();
    }
}