// this script will detect text selection and hsow a custom popup

document.addEventListener('mouseup', (event) => {
    // Check if the event target is inside the popup
    if (event.target.closest('#dictPopup')) {
        return; // Don't do anything if the click is inside the popup
    }

    const selectedText = window.getSelection().toString().trim();
    console.log('Selected text:', selectedText); // Log for debugging
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
    //popup.className = 'dict-popup'; // Add class for styling
    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;

    const addButton = document.createElement('button');
    //addButton.className = 'dict-popup-button'; // Add class for styling
    addButton.textContent = 'Define';
    addButton.onclick = () => {
        addToDictionary(selectedText);
        clearSelection();
        removePopup();
    };

    popup.appendChild(addButton);
    document.body.appendChild(popup);
}

function removePopup() {
    const existingPopup = document.getElementById('dictPopup');
    if (existingPopup) {
      existingPopup.remove();
    }
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

function clearSelection() {
    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    }
    else if (document.selection) {
        document.selection.empty();
    }
}
