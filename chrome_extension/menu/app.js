const button = document.createElement('button');
button.textContent = 'Greet me!'
document.body.insertAdjacentElement('afterbegin', button);

button.addEventListener('click', () => {
    chrome.runtime.sendMessage('', {
        type: 'notification',
        options: {
            title: '通知デモ',
            message: 'Content Message',
            iconUrl: '/menu/icon/icon1.png',
            type: 'basic'
        }
    });
});

chrome.storage.local.set({ "selectedContent": "a", sub: {} }, function () {
});

chrome.storage.local.get(function (item) {
    document.getElementById("p").innerText = JSON.stringify(item)
    // chrome.storage.local.set({ "selectedContent": 1, sub: item });
});