export async function getMembers() {
  try {
    await fetch('http://localhost:8080/members')
    .then((docs)=>{
      buildTable(docs)
      return docs.length
    })
    .then(n => {
      document.getElementById("status").innerHTML = "Loaded " + n + " row(s)!"
      if (n > 0) {
          selectRow()
          scrollToSelection()
      }
  })
  .catch(error => console.error("Error:", error));
    
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error('Could not fetch members');
  }
}

function buildTable(docs) {
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";

  docs.forEach(doc => {
    const row = document.createElement("tr");

    // Create and populate table cells based on the data in the 'doc' object
    // Customize this logic based on your specific data structure
    const cell1 = document.createElement("td");
    cell1.textContent = doc.field1;
    row.appendChild(cell1);

    const cell2 = document.createElement("td");
    cell2.textContent = doc.field2;
    row.appendChild(cell2);

    // Append the row to the table body
    tableBody.appendChild(row);
  });
}


