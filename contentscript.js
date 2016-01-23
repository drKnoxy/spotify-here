console.log('content script loaded');

// Monitor for button click
chrome.runtime.onMessage.addListener(listener);

function listener(request, sender, sendResponse) {
    console.log('request', request);
    if (request.message === 'scrape') {
        scrapeHandler(sendResponse);
    } else {
        console.log('other');
    }
}

function scrapeHandler(sendResponse) {
    var msg = {
        href: getSpotifyUrl()
    };
    console.log(msg);
    sendResponse(msg);
}

function getSpotifyUrl() {
    var anchors = document.activeElement.getElementsByTagName('a');
    return anchors[0].href
}
