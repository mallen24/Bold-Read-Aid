// content.js
let isEnabled = false;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.hasOwnProperty('isEnabled')) {
        isEnabled = request.isEnabled;
    }
});

document.addEventListener('mouseup', function() {
    if (!isEnabled) return;
    const selectedText = window.getSelection().toString();
    if (selectedText) {
        const range = window.getSelection().getRangeAt(0);
        const span = document.createElement('span');
        span.innerHTML = boldFirstHalfOfEachWord(selectedText);
        range.deleteContents();
        range.insertNode(span);
    }
});

function boldFirstHalfOfEachWord(text) {
    return text.split(' ').map(word => {
        const middle = Math.floor(word.length / 2);
        return word.substring(0, middle).bold() + word.substring(middle);
    }).join(' ');
}


