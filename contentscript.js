console.log('content script loaded');

// Monitor for button click
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // spotifyEmbed();
    //TODO: SEND RESPONSE OF HREFS TO FETCH
  });

function spotifyEmbed() {
    var anchors = document.activeElement.getElementsByTagName('a');
    for (var i = 0; anchors[i]; i++) {
        var anchor = anchors[i];
        var trackDetails = fetchTrackDetails(anchor.href);
    }
}

// https://open.spotify.com/track/3qDUJ5FQpEMvfg1ihGEWkR
function fetchTrackDetails(href) {
    console.log(href);
    if (!href) { return false; }

    var xhr = new XMLHttpRequest();
    xhr.open("GET", href, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        console.log(xhr.responseText);
      }
    }
    xhr.send();
}

function getMetaContentByName(name){
   return document.querySelector("meta[name='"+name+"']").getAttribute('content');
}