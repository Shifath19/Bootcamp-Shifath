// Fetch data from data.json
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const products = data;
        const categoryFilter = document.getElementById('categoryFilter');
        const productList = document.getElementById('product-list');
        const searchInput = document.getElementById('search');
        let currentPage = 1;
        const itemsPerPage = 6;

        // Populate categories
        const categories = [...new Set(products.map(product => product.category))];
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });

        // Function to display products
        function displayProducts(page) {
            productList.innerHTML = '';
            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const filteredProducts = products.filter(product => {
                const searchTerm = searchInput.value.toLowerCase();
                const categoryTerm = categoryFilter.value;
                return (product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm)) &&
                       (categoryTerm === '' || product.category === categoryTerm);
            });
            const paginatedProducts = filteredProducts.slice(start, end);
            paginatedProducts.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';
                productDiv.innerHTML = `
                    <img src="https://via.placeholder.com/250x150" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                `;
                productList.appendChild(productDiv);
            });
            setupPagination(filteredProducts.length);
        }

        // Function to setup pagination
        function setupPagination(totalItems) {
            const pagination = document.getElementById('pagination');
            pagination.innerHTML = '';
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            for (let i = 1; i <= totalPages; i++) {
                const pageButton = document.createElement('button');
                pageButton.textContent = i;
                pageButton.onclick = () => {
                    currentPage = i;
                    displayProducts(currentPage);
                };
                pagination.appendChild(pageButton);
            }
        }

        // Event listeners
        searchInput.addEventListener('input', () => {
            currentPage = 1;
            displayProducts(currentPage);
        });

        categoryFilter.addEventListener('change', () => {
            currentPage = 1;
            displayProducts(currentPage);
        });

        // Initial display
        displayProducts(currentPage);
    })
    .catch(error => console.error('Error fetching data:', error));
