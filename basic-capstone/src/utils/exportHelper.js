export class ExportHelper {
  static async exportToZip(data, filename = 'filtered_papers') {
      try {
          const zip = new JSZip();
          
          // Add JSON file
          const jsonContent = JSON.stringify(data, null, 2);
          zip.file(`${filename}.json`, jsonContent);

          // Add CSV file
          const csvContent = this.convertToCSV(data);
          zip.file(`${filename}.csv`, csvContent);

          // Generate zip file
          const content = await zip.generateAsync({
              type: "blob",
              compression: "DEFLATE",
              compressionOptions: {
                  level: 9
              }
          });

          // Trigger download
          this.downloadBlob(content, `${filename}.zip`);
      } catch (error) {
          console.error('Error during export:', error);
          throw new Error('Failed to export data');
      }
  }

  static convertToCSV(data) {
      if (!data || data.length === 0) return '';

      // Get headers from first object
      const headers = Object.keys(data[0]);
      
      // Create CSV header row
      const csvRows = [
          headers.join(',')
      ];

      // Add data rows
      for (const item of data) {
          const values = headers.map(header => {
              const value = item[header];
              // Handle special cases (arrays, objects, null values)
              if (Array.isArray(value)) {
                  return `"${value.join(';')}"`;
              } else if (typeof value === 'object' && value !== null) {
                  return `"${JSON.stringify(value)}"`;
              } else if (value === null || value === undefined) {
                  return '';
              } else if (typeof value === 'string') {
                  // Escape quotes and wrap in quotes
                  return `"${value.replace(/"/g, '""')}"`;
              }
              return value;
          });
          csvRows.push(values.join(','));
      }

      return csvRows.join('\n');
  }

  static downloadBlob(blob, filename) {
        //  created a download link and trigger the file download

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Cleanup
      setTimeout(() => URL.revokeObjectURL(url), 100);
  }
}