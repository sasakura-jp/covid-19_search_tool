// setInterval(, 5000)
// chrome.runtime.onMessage.addListener(data => {
//     if (data.type === 'notification') {
//         chrome.notifications.create('', data.options);
//     }
// });

// function setNotificationCallback(callback) {

//     console.log(window)
//     const OldNotify = window.Notification;
//     const newNotify = (title, opt) => {
//         callback(title, opt);
//         return new OldNotify(title, opt);
//     };
//     newNotify.requestPermission = OldNotify.requestPermission.bind(OldNotify);
//     Object.defineProperty(newNotify, 'permission', {
//         get: () => {
//             return OldNotify.permission;
//         }
//     });

//     window.Notification = newNotify;
//     console.log(window.Notification)
// }

//Contextmenuを追加(権限も)
chrome.runtime.onInstalled.addListener(() => {
    const parent = chrome.contextMenus.create({
        id: 'parent',
        contexts: ["selection"],
        title: 'ころなけんさくつーる'
    });
    chrome.contextMenus.create({
        parentId: "parent",
        title: "「%s」を調査",
        type: "normal",
        contexts: ["selection"],
        onclick: function (info) {
            console.log(info)
            chrome.tabs.create({
                url: 'https://www.az.lab.uec.ac.jp/~ehara/mws/?keyword=&text=' + encodeURIComponent(info.selectionText)
            });
        }
    });
    // chrome.contextMenus.create({
    //     id: 'child2',
    //     parentId: 'parent',
    //     title: '新しいページで検索',
    //     type: "normal",
    //     contexts: ["selection"],
    //     onclick: function (info) {
    //         chrome.tabs.create({
    //             url: 'http://google.com/search?q=' + encodeURIComponent(info.selectionText)
    //         });
    //     }
    // });
    // chrome.contextMenus.create({
    //     id: 'child3',
    //     parentId: 'parent',
    //     title: '子メニュー3'
    // });
    // chrome.contextMenus.create({
    //     id: 'grandchild1',
    //     parentId: 'child1',
    //     title: '孫メニュー1'
    // });
    // chrome.contextMenus.create({
    //     id: 'grandchild2',
    //     parentId: 'child1',
    //     title: '孫メニュー2'
    // });
});



// setNotificationCallback((title, opt) => console.log({ title, opt }))
// chrome.notifications.onShown.addListener((e) => console.log(e))