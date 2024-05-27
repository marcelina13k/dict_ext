// this script will detect text selection and hsow a custom popup

document.addEventListener('mouseup', (event) => {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 0) {
        showPopup(event.clientX, event.clientY, selectedText);
    }
    else {
        removePopup();
    }
});

function showPopup(x, y, selectedText) {
    removePopup(); // remove any existing popup

    const popup = document.createElement('div');
    popup.id = 'dictPopup';
    popup.style.position = 'absolute';
    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;
    popup.style.backgroundColor = '#fff';
    popup.style.border = '1px solid #ccc';
    popup.style.padding = '10px';
    popup.style.boxShadow = '0px 0px 5px rgba(0, 0, 0, 0.2)';
    popup.style.zIndex = '1000';

    const addButton = document.createElement('button');
    addButton.textContent = 'Add to Dictionary';
    addButton.onclick = () => {
        addToDictionary(selectedText);
        removePopup();
    };

    popup.appendChild(addButton);
    document.body.appendChild(popup);
}

function addToDictionary(text) {
    chrome.storage.local.get({dictionary: []}, (result) => {
        let dictionary = result.dictionary;
        dictionary.push(text);
        chrome.storage.local.set({dictionary: dictionary}, () => {
            console.log(`${text} added to dictionary`);
        });
    });
}
