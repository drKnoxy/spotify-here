console.log('background script loaded');

chrome.browserAction.onClicked.addListener(function(tab) {
    console.log('send message');
    var params = {active: true, currentWindow:true};
    chrome.tabs.query(params, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id,{}, function(){});
    });
});
