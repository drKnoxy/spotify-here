console.log('content script loaded');

// Monitor for button click
chrome.runtime.onMessage.addListener(listener);

function listener(request, sender, sendResponse) {
    console.log('request', request.message);

    switch(request.message) {
        case 'scrape':
            scrapeHandler(sendResponse);
            break;
        case 'replace-track':
            insertHandler(request);
            break;
        default:
            console.log('other', request);
            break;
    }
}

//
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

//
function insertHandler(trackDetails) {
    var anchors = document.activeElement.getElementsByTagName('a');
    console.log(anchors);
    anchors[0].outerHTML = '<div>its alive</div>';
}