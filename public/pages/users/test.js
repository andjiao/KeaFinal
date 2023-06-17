const { response } = require("express");

async function loadIntoTable(url, table){
    const tableHead = table.querySelector("thead");
    const tableBody = table.querySelector("tbody");
    const response = await fetch(url);
    // const {headers, rows} = await response.json();
    const data = await response;

    console.log(data)

    // Cleear table
    tableHead.innerHTML ="<tr></tr>"
    tableBody.innerHTML =""

    //populate the headers
    for (const headerText of headers){
        const headerElement = document.createElement("th");

        headerElement.textContent = headerText;
        tableHead.querySelector("tr").appendChild(headerElement);
    }

    // Populate the rows
    for (const row of rows){
        const rowElement = document.createElement("tr");

        for (const cellText of row){
        cellElement.textContent = cellText;
        rowElement.appendChild(cellElement);

        }  
        tableBody.appendChild(rowElement)
        
    }
   


}

loadIntoTable("./data.json", document.querySelector("table"))

