console.log('background script loaded');

chrome.browserAction.onClicked.addListener(function(tab) {
    var params = {active: true, currentWindow:true};
    chrome.tabs.query(params, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id,{}, function(resp){
            console.log('resp',resp);
        });

        //TODO: USE HREF FROM CONTENT SCRIPT
        var href = "https://open.spotify.com/track/3qDUJ5FQpEMvfg1ihGEWkR";

        getTrackDetails(href, function(details){
            console.log('details',details);
            // TODO: SEND A MESSAGE TO THE WINDOW TO INSERT SOME HTML
        });

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


function getTrackDetails (href, cb) {
    fetchTrack(href, function(doc) {
        var details = {};
        details.description = getMetaContentByName('description', doc);
        cb(details);
    });
}


// https://open.spotify.com/track/3qDUJ5FQpEMvfg1ihGEWkR
function fetchTrack(href, cb) {
    console.log(href);
    if (!href) { return false; }

    var xhr = new XMLHttpRequest();
    xhr.open("GET", href, true);
    xhr.responseType = 'document'; //woot
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        var doc = xhr.response;
        cb(doc);
      }
    }
    xhr.send();
}


function getMetaContentByName(name, doc){
    return doc.querySelector('meta[property="'+name+'"]').getAttribute('content')
}