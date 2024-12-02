chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color: '#4320f5' });
  });

  chrome.webNavigation.onCompleted.addListener((details) => {
    if (details.url.includes("https://dashboard.ctnbee.com/orders/order-items-to-be-prepared/*")) {
      chrome.scripting.executeScript({
        target: { tabId: details.tabId },
        files: ["content.js"]
      });
    }
  }, { url: [{ urlContains: "https://dashboard.ctnbee.com/orders/order-items-to-be-prepared/*" }] });

  console.log("message from background")