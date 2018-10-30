
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

let Google = "https://www.google.dz/search?q="
let Duckduckgo = "https://duckduckgo.com/?q="
let Yahoo = "https://search.yahoo.com/search?p="
let Bing = "https://www.bing.com/search?q="
let Startpage = "https://www.startpage.com/do/dsearch?query="

document.addEventListener("mouseup", function(e){
	
	let search_on_select_wrapper = document.querySelector("div.search_on_select_wrapper")	
	if( search_on_select_wrapper == null ){

		selected_text = get_the_selected_text()
		if(selected_text != ""){

			let encoded_selected_text = encodeURI(selected_text)
			create_search_div(encoded_selected_text, e)
			selected_text = ""

			setTimeout(function(){
				if(document.querySelector("div.search_on_select_wrapper") != null ){
					clearSelection()
					document.body.removeChild( document.querySelector("div.search_on_select_wrapper") )
				}
			}, 5000) 

		}
	}
	
}, false)

document.addEventListener("keyup", function(e){

	let search_on_select_wrapper = document.querySelector("div.search_on_select_wrapper")	
	if( search_on_select_wrapper == null ){

		selected_text = get_the_selected_text()
		if(selected_text != ""){

			let encoded_selected_text = encodeURI(selected_text)
			create_search_div(encoded_selected_text, e)
			selected_text = ""

			setTimeout(function(){
				if(document.querySelector("div.search_on_select_wrapper") != null ){
					clearSelection()
					document.body.removeChild( document.querySelector("div.search_on_select_wrapper") )
				}
			}, 5000) 

		}
	}

}, false)


function create_search_div(encoded_selected_text, e){

	if(JSON.parse(localStorage.getItem('is_on')).is_on){

		let div = document.createElement("div")
		div.classList.add("search_on_select_wrapper")
		div.setAttribute("style", "width: 100%; height: 100%; background: rgba(0,0,0,0); z-index: 10000;position: absolute; left: 0px; top: 0px;");

		let pageX = e.pageX
		let pageY = e.pageY

		if( ((200 + pageX) > window.innerWidth))
			pageX =  e.pageX - ((200 + pageX) - window.innerWidth + 20 )

		div.innerHTML=`
			<ul style='list-style: none;width: 200px;height: 35px; position: absolute; left: ${ pageX }px; top: ${ pageY }px; border: 1px solid rgb(226, 226, 226); border-radius: 3px; background: rgb(245, 245, 245);overflow: hidden;padding: 0;margin: 0;' >
				<li style='width: 20%;height: 100%;margin: 0;float: left;'>
					<a style='position: relative;display: block;width: 100%;height: 100%;padding: 7px;box-sizing: border-box;' target='_blank' href="${ Google + encoded_selected_text } "> 
						<img style="width: 100%; height: 100%;" src="${chrome.extension.getURL("/assets/logos/google.svg")}" />
					</a>
				</li>
				<li style='width: 20%;height: 100%;margin: 0;float: left;'>
					<a style='position: relative;display: block;width: 100%;height: 100%;padding: 3px;box-sizing: border-box;' target='_blank' href="${ Duckduckgo + encoded_selected_text } "> 
						<img style="width: 100%; height: 100%;" src="${chrome.extension.getURL("/assets/logos/duckduckgo.svg")}" />
					</a>
				</li>
				<li style='width: 20%;height: 100%;margin: 0;float: left;'>
					<a style='position: relative;display: block;width: 100%;height: 100%;padding: 7px;box-sizing: border-box;' target='_blank' href="${ Yahoo + encoded_selected_text } "> 
						<img style="width: 100%; height: 100%;" src="${chrome.extension.getURL("/assets/logos/yahoo.svg")}" />
					</a>
				</li>
				<li style='width: 20%;height: 100%;margin: 0;float: left;'>
					<a style='position: relative;display: block;width: 100%;height: 100%;padding: 7px;box-sizing: border-box;' target='_blank' href="${ Bing + encoded_selected_text } ">
						<img style="width: 100%; height: 100%;" src="${chrome.extension.getURL("/assets/logos/bing.svg")}" />
					</a>
				</li>
				<li style='width: 20%;height: 100%;margin: 0;float: left;'>
					<a style='position: relative;display: block;width: 100%;height: 100%;padding: 7px;box-sizing: border-box;' target='_blank' href="${ Startpage + encoded_selected_text } ">
						<img style="width: 100%; height: 100%;" src="${chrome.extension.getURL("/assets/logos/startpage.jpg")}" />
					</a>
				</li>
			</ul>
		`

		if(document.querySelector("div.search_on_select_wrapper") != null)
			document.body.removeChild(document.querySelector("div.search_on_select_wrapper"))
		document.body.appendChild(div)

	}
}

document.addEventListener("click", function(e){
	let search_on_select_wrapper = document.querySelector(".search_on_select_wrapper")
	let path = e.path

	if( search_on_select_wrapper != null && (e.target == search_on_select_wrapper || path.indexOf(search_on_select_wrapper) > 0) ){
		document.body.removeChild(search_on_select_wrapper)
		clearSelection()
	}
})


function clearSelection(){
 	if (window.getSelection) {window.getSelection().removeAllRanges();}
 	else if (document.selection) {document.selection.empty();}
}
