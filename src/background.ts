chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color: '#4320f5' });
  });

  let activeTabId: any = null;

  chrome.webNavigation.onCompleted.addListener((details) => {
    if (details.url.includes("https://dashboard.ctnbee.com/orders/order-items-to-be-prepared/*")) {
      chrome.scripting.executeScript({
        target: { tabId: details.tabId },
        files: ["content.js"]
      });
      activeTabId = details.tabId;
    }
  }, { url: [{ urlContains: "https://dashboard.ctnbee.com/orders/order-items-to-be-prepared/*" }] });

  chrome.webNavigation.onBeforeNavigate.addListener((details) => {
    if (details.tabId === activeTabId) {
      activeTabId = null; // Reset activeTabId on navigation
    }
  });

  console.log("message from background")

  chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
    let adress = details.url.includes("https://dashboard.ctnbee.com/orders/order-items-to-be-prepared/");
    console.log(adress)
    // if (details.url.includes("https://dashboard.ctnbee.com/orders/order-items-to-be-prepared/*)) {
    //   console.log("works")
    // }
  }, { url: [{ urlMatches: "https://dashboard.ctnbee.com" }] });