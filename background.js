console.log('background script loaded');

chrome.browserAction.onClicked.addListener(function(tab) {
    console.log('send message');
    var params = {active: true, currentWindow:true};
    chrome.tabs.query(params, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id,{}, function(){});

        //TODO: MOVE INTO CALLBACK
        //TODO: USE HREF FROM CONTENT SCRIPT
        fetchTrackDetails("https://open.spotify.com/track/3qDUJ5FQpEMvfg1ihGEWkR");

        // TODO: SEND A MESSAGE TO THE WINDOW TO INSERT SOME HTML
    });

});

// We need wget headers to get a usable response
chrome.webRequest.onBeforeSendHeaders.addListener(function(details){
    for(var i=0; i < details.requestHeaders.length; ++i){
        if(details.requestHeaders[i].name === "User-Agent"){
            details.requestHeaders[i].value = 'Wget/1.12';
            break;
        }
    }
    return {requestHeaders: details.requestHeaders};
}, {urls: ["https://open.spotify.com/*"]}, ["blocking", "requestHeaders"]);


// https://open.spotify.com/track/3qDUJ5FQpEMvfg1ihGEWkR
function fetchTrackDetails(href) {
    console.log(href);
    if (!href) { return false; }

    var xhr = new XMLHttpRequest();
    xhr.open("GET", href, true);
    xhr.responseType = 'document';
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        console.log(xhr.response);
        console.log(xhr.response.head);
        // TODO: PARSE OUT THE VARS WE WANT FROM THE RESPONSE
      }
    }
    xhr.send();
}