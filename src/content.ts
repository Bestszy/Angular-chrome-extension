const init=function(){
    const body = document.body;
    const injectElement = document.createElement("div");
    injectElement.className = "rustyZone-element";
    injectElement.innerHTML="Hello from the Rusty Zone Element",

    
    injectElement.style.position = 'fixed';
    injectElement.style.top = '0';
    injectElement.style.left = '0';
    injectElement.style.width = '100%';
    injectElement.style.zIndex = '10000'; // Ensures it stays above other content
    body.insertBefore(injectElement, body.firstChild);
}
init()
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.greeting === "Hello from Popup") {
        const table:any = document.querySelector("table");
        let tableData = [];
        for (let i = 1; i < table.rows.length; i++) {
            const row = table.rows[i];
            let rowData = [];
          
            // Loop through each cell in the row
            for (let j = 0; j < row.cells.length; j++) {
              rowData.push(row.cells[j].innerText);  // Get the text content of the cell
            }
          
            // Add the row data to the main data array
            tableData.push(rowData);
          }
        console.log(tableData)
        console.log("Message received in Content Script:", request.greeting, typeof table);
        sendResponse({ response: "Hello from Content Script" });
    }
});
