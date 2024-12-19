import { loadStudentData } from './data-loader.js';
import { renderTableRows } from './table-renderer.js';

// Add Event Listener to Load Students
document.getElementById('loadStudentsBtn').addEventListener('click', async () => {
    const data = await loadStudentData();
    renderTableRows(data);
});

// Change Font Logic
document.getElementById('changeFontBtn').addEventListener('click', () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap';
    document.head.appendChild(link);

    document.getElementById('studentTable').style.fontFamily = "'Courier Prime', monospace";
});

// Browser Info Display
function displayBrowserInfo() {
    const browserInfoDiv = document.getElementById('browserInfo');
    browserInfoDiv.innerHTML = `
        <h3>Browser Information:</h3>
        <p><strong>Browser Name:</strong> ${navigator.appName}</p>
        <p><strong>User Agent:</strong> ${navigator.userAgent}</p>
        <p><strong>Window Dimensions:</strong> ${window.innerWidth}px x ${window.innerHeight}px</p>
    `;
}

displayBrowserInfo();
window.addEventListener('resize', displayBrowserInfo);
