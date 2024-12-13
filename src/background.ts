// chrome.runtime.onInstalled.addListener(() => {
//     chrome.storage.sync.set({ color: '#4320f5' });
//   }); 
chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
  chrome.scripting.executeScript({
    target: { tabId: details.tabId },
    files: ["content.js"]
  });
}, { url: [{ urlContains: "https://dashboard.ctnbee.com/orders/order-items-to-be-prepared/*" }] });

chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
  const tab:any = details.tabId;
  if(details.url.includes("https://dashboard.ctnbee.com/orders/order-items-to-be-prepared/")===false){
    chrome.tabs.query({ active: true, currentWindow: true }, () => {
      chrome.tabs.sendMessage(tab, { greeting: "helloo" }, (response) => {
        console.log(response);
      });
    });
    
    console.log(details)

  }
}, { url: [{ urlMatches: "https://dashboard.ctnbee.com/" }] });
  // chrome.webNavigation.onCompleted.addListener((details) => {
  //   if (details.url.includes("https://dashboard.ctnbee.com/orders/order-items-to-be-prepared/*")) {
  //     chrome.scripting.executeScript({
  //       target: { tabId: details.tabId },
  //       files: ["content.js"]
  //     });
  //   }
  // }, { url: [{ urlContains: "https://dashboard.ctnbee.com/orders/order-items-to-be-prepared/*" }] });

