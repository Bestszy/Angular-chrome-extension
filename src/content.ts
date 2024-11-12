const init=function(){
    const body = document.body;
    const injectElement = document.createElement("div");
    injectElement.className = "rustyZone-element";
    injectElement.innerHTML="Hello from the Rusty Zone Element",

    
    injectElement.style.position = 'fixed';
    injectElement.style.top = '0';
    injectElement.style.left = '0';
    injectElement.style.width = '100%';
    injectElement.style.zIndex = '1000'; // Ensures it stays above other content
    body.insertBefore(injectElement, body.firstChild);
}
init()
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.greeting === "Hello from Popup") {
        console.log("Message received in Content Script:", request.greeting);
        sendResponse({ response: "Hello from Content Script" });
    }
});