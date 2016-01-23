console.log('background script loaded');

chrome.browserAction.onClicked.addListener(function(tab) {
    var params = {active: true, currentWindow:true};
    chrome.tabs.query(params, function(tabs) {
        var msg = {message: 'scrape'};
        // Send the click to the content script
        chrome.tabs.sendMessage(tabs[0].id, msg, function(resp){
            console.log('bg resp', resp)
            // COMMENT
            getTrackDetails(resp.href, function(details){
                console.log('details',details);
                details.message = 'track-details';
                chrome.tabs.sendMessage(tabs[0].id, details);
            });
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
        addMetaProps(details, doc);
        addProps(details, doc);

        cb(details);
    });
}

function addMetaProps(details, doc) {
    var props = [
        {prop:'description',    label:'description'},
        {prop:'og:title',       label:'title'},
        {prop:'og:image',       label:'album_art'},
        {prop:'music:duration', label:'duration'},
        {prop:'music:album',    label:'album_href'},
        {prop:'music:musician', label:'artist_href'},
    ];

    props.forEach(function(prop) {
        details[prop.label] = getMetaContentByName(prop.prop, doc);
    });
}

function addProps(details, doc) {
    var query = doc.querySelectorAll('a.owner-name');
    details.artist = query[0].innerText;
    details.album = query[1].innerText;
}


// href = https://open.spotify.com/track/3qDUJ5FQpEMvfg1ihGEWkR
function fetchTrack(href, cb) {

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
    console.log('meta props' + name);
    return doc.querySelector('meta[property="'+name+'"]').getAttribute('content')
}