
let is_on = true
let is_on_obj = { 'is_on': is_on}

if(localStorage.getItem('is_on') == null)
	localStorage.setItem('is_on', JSON.stringify(is_on_obj))
else
	is_on = JSON.parse(localStorage.getItem('is_on')).is_on


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

let div
let Google = "https://www.google.dz/search?q="
let Duckduckgo = "https://duckduckgo.com/?q="
let Yahoo = "https://search.yahoo.com/search?p="
let Bing = "https://www.bing.com/search?q="
let Startpage = "https://www.startpage.com/do/dsearch?query="

document.addEventListener("mouseup", function(e){
	if(is_on){
		selected_text = get_the_selected_text()
		if(selected_text != ""){

			let encoded_selected_text = encodeURI(selected_text)
			create_search_div(encoded_selected_text, e)
			selected_text = ""
/*
			setTimeout(function(){
				divs = document.querySelectorAll(".selected_text_extension")
				for(let i = 0; i < divs.length; i++)
					document.body.removeChild(divs[i])
			}, 25000) */
		}
	}
	
})

document.addEventListener("keyup", function(e){
	if(is_on){
		selected_text = get_the_selected_text()
		if(selected_text != ""){
			
			let encoded_selected_text = encodeURI(selected_text)
			create_search_div(encoded_selected_text, e)
			selected_text = ""
/*
			setTimeout(function(){
				divs = document.querySelectorAll(".selected_text_extension")
				for(let i = 0; i < divs.length; i++)
					document.body.removeChild(divs[i])
			}, 25000) */
		}
	}
})

function create_search_div(encoded_selected_text, e){
	let div = document.createElement("div")
	div.classList.add("selected_text_extension")
	div.setAttribute("style", "width: 200px;height: 35px;z-index: 10000; position: absolute; left: "+e.pageX+"px; top: "+e.pageY+"px; border: 1px solid rgb(226, 226, 226); border-radius: 3px; background: rgb(245, 245, 245);overflow: hidden;");
	
	div.innerHTML=`
		<ul style='list-style: none;width: 100%;height: 100%;padding: 0;margin: 0;' >
			<li style='width: 20%;padding: 11px;margin: 0;float:left;box-sizing: border-box;'>
				<a style='position: relative;top: -2px' target='blank' href="${ Google + encoded_selected_text } "> 
					<img style="width: 100%; height: 100%;" src="${chrome.extension.getURL("/assets/logos/google.svg")}" />
				</a>
			</li>
			<li style='width: 20%;padding: 6px;margin: 0;float:left;box-sizing: border-box;'>
				<a style='position: relative;top: -2px' target='blank' href="${ Duckduckgo + encoded_selected_text } "> 
					<img style="width: 100%; height: 100%;" src="${chrome.extension.getURL("/assets/logos/duckduckgo.svg")}" />
				</a>
			</li>
			<li style='width: 20%;padding: 11px;margin: 0;float:left;box-sizing: border-box;'>
				<a style='position: relative;top: -2px' target='blank' href="${ Yahoo + encoded_selected_text } "> 
					<img style="width: 100%; height: 100%;" src="${chrome.extension.getURL("/assets/logos/yahoo.svg")}" />
				</a>
			</li>
			<li style='width: 20%;padding: 10px;margin: 0;float:left;box-sizing: border-box;'>
				<a style='position: relative;top: -2px' target='blank' href="${ Bing + encoded_selected_text } ">
					<img style="width: 100%; height: 100%;" src="${chrome.extension.getURL("/assets/logos/bing.svg")}" />
				</a>
			</li>
			<li style='width: 20%;padding: 10px;margin: 0;float:left;box-sizing: border-box;'>
				<a style='position: relative;top: -2px' target='blank' href="${ Startpage + encoded_selected_text } ">
					<img style="width: 100%; height: 100%;" src="${chrome.extension.getURL("/assets/logos/startpage.jpg")}" />
				</a>
			</li>
		</ul>
	`

	if(document.querySelector("div.selected_text_extension") != null)
		document.body.removeChild(document.querySelector("div.selected_text_extension"))
	document.body.appendChild(div)
}


window.addEventListener("click", function(e){
	let divs = document.querySelectorAll("div.selected_text_extension")

	if(divs.length == 2){
		document.body.removeChild(divs[1])
		let div = divs[0]
		if(div != null && (div != e.target || div != e.target.parentElement || div != e.target.parentElement.parentElement  || div != e.target.parentElement.parentElement.parentElement)){
			document.body.removeChild(div)
		}
	}
})

