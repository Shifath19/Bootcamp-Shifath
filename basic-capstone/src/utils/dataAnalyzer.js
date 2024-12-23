export class DataAnalyzer {
  static analyzeData(papers) {
      // Initialize an empty object to store the analysis results
      
      if (!papers || papers.length === 0) {
          return {};
      }

      const filterTypes = {};
      const sample = papers[0];

      // Analyze each field in the data
      Object.entries(sample).forEach(([key, value]) => {
          filterTypes[key] = this.determineFilterType(key, papers);
      });

      return filterTypes;
  }

  static determineFilterType(field, papers) {
      //  decide whether a field should be a dropdown, range slider, or search input
        // Based on the type of data and how many unique values there are
      const uniqueValues = new Set(papers.map(paper => paper[field]));
      const sample = papers[0][field];

      // Determine the type of filter based on data characteristics
      if (typeof sample === 'number') {
          return 'range';
      } else if (typeof sample === 'string') {
          // If there are too many unique values, use search instead of select
          return uniqueValues.size > 20 ? 'search' : 'select';
      } else if (Array.isArray(sample)) {
          return 'multi-select';
      }

      return 'search'; // default to search for unknown types
  }

  static getFieldStatistics(papers, field) {
       // I calculate useful stats about a field
        // Like min/max values, averages, and how many unique values there are
      const values = papers.map(paper => paper[field]).filter(value => value != null);
      
      return {
          min: Math.min(...values),
          max: Math.max(...values),
          average: values.reduce((a, b) => a + b, 0) / values.length,
          uniqueValues: [...new Set(values)],
          uniqueCount: new Set(values).size
      };
  }
}