chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color: '#4320f5' });
  });

  console.log("message from background")