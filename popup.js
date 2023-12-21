// popup.js
document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('toggleButton');
    chrome.storage.local.get('isEnabled', data => {
        button.textContent = data.isEnabled ? 'Disable' : 'Enable';
    });

    button.addEventListener('click', function() {
        chrome.storage.local.get('isEnabled', data => {
            const newState = !data.isEnabled;
            chrome.storage.local.set({ isEnabled: newState });
            button.textContent = newState ? 'Disable' : 'Enable';

            // Send a message to the content script
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { isEnabled: newState });
            });
        });
    });
});
