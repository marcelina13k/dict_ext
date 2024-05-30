// manually inject the content script into all open tabs when the extension is loaded or reloaded

chrome.runtime.onInstalled.addListener(() => {
    chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
            if (tab.id) {
                chrome.scripting.executeScript({
                    target: {tabId: tab.id},
                    files: ['content.js']
                });
            }
        });
    });
});
