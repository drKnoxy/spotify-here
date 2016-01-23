console.log('content script loaded');

// Monitor for button click
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var href = getSpotifyUrl();
    sendResponse({href: href});
  });

function getSpotifyUrl() {
    var anchors = document.activeElement.getElementsByTagName('a');
    return anchors[0].href
}

