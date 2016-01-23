console.log('content script loaded');

// Monitor for button click
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    spotifyEmbed();
  });

function spotifyEmbed() {
    var anchors = document.activeElement.getElementsByTagName('a');
    for (var i = 0; anchors[i]; i++) {
        var anchor = anchors[i];
        var href = anchor.href;
        console.log(href);
        fetchTrackDetails(href);
    }
}

// https://open.spotify.com/track/3qDUJ5FQpEMvfg1ihGEWkR
function fetchTrackDetails(href) {
    if (!href) { return false; }


}

function getMetaContentByName(name){
   return document.querySelector("meta[name='"+name+"']").getAttribute('content');
}