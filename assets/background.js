'use strict'

let is_on = true

chrome.browserAction.onClicked.addListener(function(){
    
    if(is_on){
        is_on = false
        chrome.browserAction.setIcon({ path: { "38": "/assets/off-38x38.png" } });
    }else{
        is_on = true
        chrome.browserAction.setIcon({ path: { "38": "/assets/on-38x38.png" } });
    }

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {is_on: is_on});
    })
})



