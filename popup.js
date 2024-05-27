// this file populates the popup with the dictionary entries

document.addEventListener('DOMContentLoaded', () => {
    const dictList = document.getElementById('dictList');

    chrome.storage.local.get({dictionary: []}, (result) => {
        let dictionary = result.dictionary;
        dictionary.forEach(word => {
            let li = document.createElement('li');
            li.textContent = word;
            dictList.appendChild(li);
        });
    });
});
