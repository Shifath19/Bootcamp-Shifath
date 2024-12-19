export function loadCSVData(filePath) {
  return new Promise((resolve, reject) => {
      Papa.parse(filePath, {
          download: true,
          header: true,
          skipEmptyLines: true,
          complete: function (results) {
              resolve(results.data); // Parsed data
          },
          error: function (error) {
              reject(`Error loading CSV file: ${error.message}`);
          }
      });
  });
}
