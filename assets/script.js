'use strict'

let is_on = true

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	is_on = request.is_on 
})
