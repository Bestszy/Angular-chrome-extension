import { fabrics } from "./fabrics";

const init=function(){
    const body = document.body;
    const injectElement = document.createElement("div");
    injectElement.className = "can";
    injectElement.innerHTML="j200: 156cm",
    injectElement.style.backgroundColor = 'pink'
    injectElement.style.position = 'fixed';
    injectElement.style.top = '0';
    injectElement.style.width = '400px';
    injectElement.style.left = '250px';
    //injectElement.style.width = '100%';
    injectElement.style.zIndex = '10000'; // Ensures it stays above other content
    body.insertBefore(injectElement, body.firstChild);
}
init()
let obj: object
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.greeting === "Hello from Popup") {
      const table = document.querySelector("Table") as HTMLTableElement;

      // Initialize an empty object to store the result
      const result: Record<string, string> = {};
      if (table) {
        // Loop through rows, skipping the header row (start at index 1)
        for (let i = 1; i < table.rows.length; i++) {
          const row = table.rows[i];
          // Get the name from the first column (index 0) and number from the second column (index 1)
          const name = row.cells[0]?.innerText.trim(); // Safe navigation for cells
          const number = row.cells[1]?.innerText;
          if (name) {
            result[name] = number; // Add key-value pair to the result object
          }
        }
          }
        obj=result
        Object.keys(obj).forEach(key => {
          if (key in fabrics) {
            console.log(`Key: ${key}, Value in object2: ${fabrics[key]}`);
          } else {
            console.log(`Key: ${key} is not present in object2`);
          }
        });
        console.log("start")
        console.log(obj)
        console.log(fabrics)
        console.log("end")
        // loggg()
        // Object.keys(result).forEach(key: any => {
        //   if (key in fabrics) {
        //     console.log(`Key: ${key}, Value in object2: ${fabrics[key]}`);
        //   } else {
        //     console.log(`Key: ${key} is not present in object2`);
        //   }
        // });


        console.log("Message received in Content Script:", request.greeting, typeof table);
        sendResponse({ response: "Hello from Content Script" });
    }
});

// function loggg(){
//   Object.keys(obj).forEach(key => {
//       if (key in fabrics) {
//         console.log(`Key: ${key}, Value in object2: ${fabrics[key]}`);
//       } else {
//         console.log(`Key: ${key} is not present in object2`);
//       }
//     });

// console.log("start")
// console.log(obj)
// console.log(fabrics)
// console.log("end")
// }
