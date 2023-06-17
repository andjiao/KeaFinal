{
    async function loadIntoTable(url, table){

        const tableBody = table.querySelector("tbody");

        const response = await fetch("http://localhost:8080/members")

        try{
            if(response.ok){
                const result = await response.json();
            } else{
                const data = await response.json()
                console.log(data)
            }

        } catch (error){
            console.log(error.msg())

        }
      
    
    }




    // loadIntoTable("http://localhost:8080/members", document.querySelector("table"))

    
}