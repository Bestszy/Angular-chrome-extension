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
  console.log(details)
  if (details.url.includes("https://dashboard.ctnbee.com/orders/order-items-to-be-prepared/" )) {
    console.log(details.url.includes("https://dashboard.ctnbee.com/orders/order-items-to-be-prepared/"))
  }
}, { url: [{ urlMatches: ".*" }] });
  // chrome.webNavigation.onCompleted.addListener((details) => {
  //   if (details.url.includes("https://dashboard.ctnbee.com/orders/order-items-to-be-prepared/*")) {
  //     chrome.scripting.executeScript({
  //       target: { tabId: details.tabId },
  //       files: ["content.js"]
  //     });
  //   }
  // }, { url: [{ urlContains: "https://dashboard.ctnbee.com/orders/order-items-to-be-prepared/*" }] });

