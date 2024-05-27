// this file sets up the context menu

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "addToDict",
        title: "Add to Personal Dictionar",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "addToDict") {
        chrome.storage.local.get({dictionary: []}, (result) => {
            let dictionary = result.dictionary;
            dictionary.push(info.selectionText);
            chrome.storage.local.set({dictionary: dictionary}, () => {
                console.log(`${info.selectionText} add to dictionary`);
            });
        });
    }
});
