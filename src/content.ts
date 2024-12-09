import { fabrics } from "./fabrics";

const url =window.location.hostname
console.log(url)

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "deactivate") {
    console.log("Cleaning up content script...");
    // Perform cleanup (e.g., remove injected DOM elements or stop observers)
    // Optionally, disconnect MutationObserver or other persistent listeners
  }
});

function injectSnippet() {
  fetch(chrome.runtime.getURL('contentscript.html'))
      .then(response => response.text())
      .then(data => {
          const container = document.createElement('div');
          //container.className="con"
          container.innerHTML = data;
          document.body.appendChild(container); // Append the snippet to the body or desired location
          //injectCSS(); // Inject CSS after adding the snippet
      })
      .catch(error => console.error('Error loading snippet:', error));
}
function injectCSS() {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = chrome.runtime.getURL('contentscript.css');
  document.head.appendChild(link); // Add the CSS to the page
}

let obj: object
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.greeting === "Hello from Popup") {
      const table = document.querySelector("Table") as HTMLTableElement;
      injectSnippet();
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

function atStart (){
  injectSnippet();
  injectCSS()
}
 atStart()