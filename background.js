// background.js
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ isEnabled: false }); // Default state
});
