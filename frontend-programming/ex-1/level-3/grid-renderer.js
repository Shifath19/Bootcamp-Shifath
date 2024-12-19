export function renderStudentGrid(studentData) {
  const gridOptions = {
      columnDefs: [
          { headerName: "ID", field: "ID", sortable: true, filter: true },
          { headerName: "Name", field: "Name", sortable: true, filter: true },
          { headerName: "Age", field: "Age", sortable: true, filter: true },
          { 
              headerName: "Grade", 
              field: "Grade", 
              sortable: true, 
              filter: true,
              cellStyle: params => params.value === 'A' ? { backgroundColor: '#c8f7c5' } : null // Highlight rows with grade A
          }
      ],
      rowData: studentData,
      pagination: true, // Enable pagination
      animateRows: true
  };

  // Render the grid
  const gridDiv = document.getElementById('studentGrid');
  new agGrid.Grid(gridDiv, gridOptions);
}
