import { loadCSVData } from './csv-loader.js';
import { renderStudentGrid } from './grid-renderer.js';

// Button Event Listener to Load CSV Data and Render Grid
document.getElementById('loadDataBtn').addEventListener('click', async () => {
    try {
        const studentData = await loadCSVData('students.csv'); // Load CSV data
        renderStudentGrid(studentData); // Render AG Grid
    } catch (error) {
        console.error(error);
        alert('Failed to load student data!');
    }
});
