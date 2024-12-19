export async function loadStudentData() {
  try {
      const response = await fetch('students.json'); // Fetch the local JSON file
      if (!response.ok) {
          throw new Error(`Error loading data: ${response.status}`);
      }
      const data = await response.json(); // Parse the JSON data
      return data;
  } catch (error) {
      console.error('Failed to load student data:', error.message);
      return [];
  }
}
