'use strict'

let is_on = true
let is_on_obj = { 'is_on': is_on}

if(localStorage.getItem('is_on') == null)
	localStorage.setItem('is_on', JSON.stringify(is_on_obj))
else
	is_on = localStorage.getItem('is_on')

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	is_on = request.is_on 
	
	is_on_obj = { 'is_on': is_on}
	localStorage.setItem('is_on', JSON.stringify(is_on_obj))
})


let selected_text = ""

function get_the_selected_text() {
	let text = ""
	if (typeof window.getSelection != "undefined")
		text = window.getSelection().toString()
	else            
		if (typeof document.selection != "undefined" && document.selection.type == "Text")
			text = document.selection.createRange().text;

	return text
}


