
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

let div

let Google = "https://www.google.dz/search?q="
let Duckduckgo = "https://duckduckgo.com/?q="
let Yahoo = "https://search.yahoo.com/search?p="
let Bing = "https://www.bing.com/search?q="

let google_logo = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path style="fill:#FBBB00;" d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456C103.821,274.792,107.225,292.797,113.47,309.408z"/><path style="fill:#518EF8;" d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"/><path style="fill:#28B446;" d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"/><path style="fill:#F14336;" d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0C318.115,0,375.068,22.126,419.404,58.936z"/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>'
let duckduckgo_logo = `
<svg height="2048px" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" viewBox="0 0 2048 2048" width="2048px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css">
   <![CDATA[
    .fil9 {fill:none}
    .fil2 {fill:#FEFEFE}
    .fil7 {fill:#2C4F8E}
    .fil6 {fill:#43A144}
    .fil5 {fill:#64BB46}
    .fil1 {fill:#B5B5B5}
    .fil0 {fill:#DA4A26}
    .fil4 {fill:#FFCA28}
    .fil8 {fill:#FFFFFE}
    .fil3 {fill:#212121;fill-rule:nonzero}
   ]]>
  </style></defs><g id="Layer_x0020_1"><circle class="fil0" cx="1024" cy="1024" r="832.001"/><path class="fil1" d="M1087.19 991.642l0 0zm-68.0127 -376.128c-8.08701,-10.1398 -18.0284,-19.9654 -29.889,-29.4083 -13.2921,-10.5815 -29.0008,-20.7591 -47.2241,-30.4429 -35.0693,-18.6236 -74.4827,-31.6099 -115.265,-38.0457 -39.7772,-6.27874 -80.8335,-6.2563 -120.389,0.916536l1.3748 31.5626c1.80354,0.164173 7.70434,3.9 14.3587,8.32087 -20.6776,5.93977 -39.7677,14.4461 -39.4807,39.6815l0.200788 17.4827 17.2996 -1.73268c29.3823,-2.94095 60.1678,-2.0504 90.3225,2.61732 9.21024,1.42559 18.3591,3.20197 27.3862,5.32441l-4.32402 1.15276c-20.4484,5.58426 -38.9292,12.5209 -54.2493,20.6103 -46.2792,24.3189 -75.5127,60.8493 -90.1406,108.371 -14.1461,45.9555 -14.2748,101.815 -2.72835,166.512l0.0625985 0.0625985c15.1453,84.5741 64.1575,316.392 104.117,505.394 19.7858,93.5894 37.3866,176.831 47.1414,224.407 3.26575,15.8445 5.03622,31.0264 5.52048,45.5197 0.303544,9.07914 0.0921261,17.9599 -0.581103,26.6268 -0.451181,5.80276 -1.10906,11.511 -1.95709,17.1189l31.6252 11.6256 338.654 -1.6441 28.6252 -21.0012c-2.10827,-4.26851 -4.23307,-8.54883 -6.37087,-12.8362 -23.002,-46.1233 -47.4957,-93.0083 -68.6682,-133.534 -15.3921,-29.4626 -29.0091,-55.526 -39.0449,-75.5764 -26.824,-53.6174 -53.6351,-119.469 -68.2808,-182.367 -8.77914,-37.7044 -13.1256,-74.0977 -10.3051,-105.626 -15.3106,-6.27874 -26.6894,-11.8016 -31.9642,-15.5906l-0.00944883 0.0153543c-14.2193,-10.1988 -31.1114,-28.1185 -41.8217,-49.7174 -8.61615,-17.3764 -13.3973,-37.2461 -10.1445,-57.841 3.17126,-19.8402 27.3343,-46.7138 57.8434,-67.4575l0 -0.0649607c26.5536,-18.0532 58.7516,-32.5051 86.3186,-34.3134 7.83544,-0.509056 16.3122,-1.00512 23.9918,-1.45158 33.4488,-1.95 50.2418,-2.93032 84.4737,-11.4213 10.8803,-2.69055 26.1886,-6.5563 43.5284,-11.0835 2.36457,-40.7008 -5.94685,-87.5965 -21.0402,-133.234 -22.0028,-66.5339 -58.6819,-131.254 -97.6265,-170.211 -12.548,-12.5528 -28.1693,-22.7894 -45.9048,-30.9378 -16.878,-7.75394 -35.641,-13.6158 -55.4351,-17.7827z"/><path class="fil2" d="M1105.19 991.642l0 0zm-68.0127 -376.128c-8.08701,-10.1398 -18.0284,-19.9654 -29.889,-29.4083 -13.2921,-10.5815 -29.0008,-20.7591 -47.2241,-30.4429 -35.0693,-18.6236 -74.4827,-31.6099 -115.265,-38.0457 -39.7772,-6.27874 -80.8335,-6.2563 -120.389,0.916536l1.3748 31.5626c1.80354,0.164173 7.70434,3.9 14.3587,8.32087 -20.6776,5.93977 -39.7677,14.4461 -39.4807,39.6815l0.200788 17.4827 17.2996 -1.73268c29.3823,-2.94095 60.1678,-2.0504 90.3225,2.61732 9.21024,1.42559 18.3591,3.20197 27.3862,5.32441l-4.32402 1.15276c-20.4484,5.58426 -38.9292,12.5209 -54.2493,20.6103 -46.2792,24.3189 -75.5127,60.8493 -90.1406,108.371 -14.1461,45.9555 -14.2748,101.815 -2.72835,166.512l0.0625985 0.0625985c15.1453,84.5741 64.1575,316.392 104.117,505.394 19.7858,93.5894 37.3866,176.831 47.1414,224.407 3.26575,15.8445 5.03622,31.0264 5.52048,45.5197 0.303544,9.07914 0.0921261,17.9599 -0.581103,26.6268 -0.451181,5.80276 -1.10906,11.511 -1.95709,17.1189l31.6252 11.6256 338.654 -1.6441 28.6252 -21.0012c-2.10827,-4.26851 -4.23307,-8.54883 -6.37087,-12.8362 -23.002,-46.1233 -47.4957,-93.0083 -68.6682,-133.534 -15.3921,-29.4626 -29.0091,-55.526 -39.0449,-75.5764 -26.824,-53.6174 -53.6351,-119.469 -68.2808,-182.367 -8.77914,-37.7044 -13.1256,-74.0977 -10.3051,-105.626 -15.3106,-6.27874 -26.6894,-11.8016 -31.9642,-15.5906l-0.00944883 0.0153543c-14.2193,-10.1988 -31.1114,-28.1185 -41.8217,-49.7174 -8.61615,-17.3764 -13.3973,-37.2461 -10.1445,-57.841 3.17126,-19.8402 27.3343,-46.7138 57.8434,-67.4575l0 -0.0649607c26.5536,-18.0532 58.7516,-32.5051 86.3186,-34.3134 7.83544,-0.509056 16.3122,-1.00512 23.9918,-1.45158 33.4488,-1.95 50.2418,-2.93032 84.4737,-11.4213 10.8803,-2.69055 26.1886,-6.5563 43.5284,-11.0835 2.36457,-40.7008 -5.94685,-87.5965 -21.0402,-133.234 -22.0028,-66.5339 -58.6819,-131.254 -97.6265,-170.211 -12.548,-12.5528 -28.1693,-22.7894 -45.9048,-30.9378 -16.878,-7.75394 -35.641,-13.6158 -55.4351,-17.7827z"/><path class="fil2" d="M1776 1024c0,-200.093 -78.7808,-390.248 -220.265,-531.734 -141.486,-141.484 -331.642,-220.266 -531.735,-220.266 -200.093,0 -390.248,78.7843 -531.733,220.267 -141.483,141.484 -220.267,331.64 -220.267,531.733 0,200.092 78.7855,390.245 220.269,531.726 141.484,141.482 331.64,220.265 531.732,220.265 200.092,0 390.247,-78.7831 531.732,-220.265 141.483,-141.481 220.269,-331.634 220.269,-531.726zm-242.894 509.1c-135.464,135.462 -317.528,210.89 -509.106,210.89 -191.578,0 -373.642,-75.4276 -509.106,-210.89 -135.463,-135.462 -210.893,-317.524 -210.893,-509.1 0,-191.578 75.4276,-373.644 210.892,-509.107 135.463,-135.464 317.529,-210.892 509.107,-210.892 191.58,0 373.646,75.4264 509.11,210.89 135.465,135.464 210.89,317.53 210.89,509.11 0,191.576 -75.43,373.638 -210.893,509.1z"/><path class="fil3" d="M1438.64 1177.41c-0.0011811,-0.0307087 -0.00472441,-0.0165354 -0.0106299,0.00354331l0.0106299 -0.00354331z"/><path class="fil3" d="M1499.8 976.878c0.0307087,-0.155906 -0.0236221,-0.0484252 -0.111024,0.10748l0.111024 -0.10748z"/><path class="fil4" d="M1102.48 986.339l0 0zm390.074 -64.3465c-28.917,-11.341 -74.8914,-12.6791 -93.319,-3.77717 -11.5016,5.56654 -35.7437,13.4823 -63.5658,21.7063 -25.741,7.60631 -53.8937,15.2965 -78.1477,21.7028 -17.6882,4.67008 -33.3024,8.65867 -44.4012,11.4343 -34.9181,8.76024 -52.0477,9.77127 -86.1674,11.7827 -7.83308,0.46063 -16.4799,0.972048 -24.4725,1.49764 -28.1197,1.86614 -60.9638,16.7752 -88.0501,35.4l0 0.0673229c-31.1209,21.4004 -55.7682,49.1244 -59.0032,69.593 -3.31772,21.248 1.55906,41.7461 10.3488,59.6729 10.924,22.2827 28.1551,40.7705 42.6603,51.2918l0.00944883 -0.0153543c5.37993,3.90827 16.9866,9.60591 32.6044,16.0843 26.0327,10.7976 63.2032,23.765 101.25,34.2331 43.6063,11.9976 89.1178,21.0532 121.689,20.4106 34.2626,-0.690945 77.7331,-10.5165 114.543,-24.6721 22.1469,-8.51694 42.2091,-18.7063 56.8796,-29.5748 17.8477,-13.2189 28.6996,-28.4173 28.3984,-44.7378 -0.068504,-3.88465 -0.714567,-7.62993 -1.9689,-11.2087l-0.0212599 0.00826772c-11.5961,-33.0567 -50.3658,-23.5878 -105.528,-10.1114 -46.8579,11.4461 -107.937,26.3658 -169.011,20.4343 -32.5559,-3.16536 -54.4441,-10.611 -67.8756,-20.1319 -5.96221,-4.22481 -9.9319,-8.66812 -12.1807,-13.1091 -1.95827,-3.86693 -2.67402,-7.84253 -2.33032,-11.7154 0.389764,-4.41969 2.17795,-9.04843 5.10119,-13.5721l-0.0437008 -0.0307087c7.86142,-12.1169 23.0835,-9.72048 43.9276,-6.43347 25.9099,4.08426 58.2012,9.17599 99.0178,-3.60827 39.6296,-12.3756 87.7607,-29.8984 131.186,-47.3882 42.4052,-17.0799 80.0788,-34.0772 100.741,-46.1811 25.461,-14.8713 37.5709,-29.426 40.5874,-42.8646 2.72599,-12.1536 -0.889371,-22.4823 -8.90198,-31.0689 -5.87126,-6.2941 -14.2547,-11.3126 -23.9563,-15.1181z"/><g id="_337885008"><path class="fil5" d="M856.504 1667.76l-17.5973 -239.332c11.0504,-22.6973 158.374,47.4024 192.376,58.6111l10.7398 124.539c-31.5142,16.8414 -166.036,112.193 -185.518,56.1815z" id="_337884768"/><path class="fil6" d="M1005.87 1507.43c0,0 70.7493,-53.1615 130.817,-23.1272 0,0 17.0173,95.1308 0,120.135 0,0 -46.7079,26.5418 -128.471,13.2709l-2.34567 -110.278z" id="_337884576"/><path class="fil5" d="M1013.43 1498.23c0,0 70.7493,-53.1615 130.817,-23.1272 0,0 17.0185,95.132 0,120.136 0,0 -46.7067,26.5418 -128.471,13.2709l-2.34567 -110.28z" id="_337884384"/><path class="fil5" d="M1129.86 1494.71c51.2079,-31.0134 213.743,-171.369 196.511,-36.3697l-3.85748 163.065c0.311811,6.46654 -2.81575,9.06142 -8.76142,8.48859l-197.969 -48.3685 14.0776 -86.8158z" id="_337885080"/></g><g id="_337884048"><circle class="fil7" cx="839.42" cy="918.1" id="_337884456" r="48.0213"/><circle class="fil8" cx="861.179" cy="901.842" id="_337884216" r="12.2554"/></g><g id="_337883784"><circle class="fil7" cx="1090.04" cy="871.849" id="_337883664" r="41.1449"/><circle class="fil8" cx="1108.69" cy="857.919" id="_337883880" r="10.5005"/></g><path class="fil7" d="M788.728 792.154c34.2461,-21.5185 69.4548,-5.59016 69.4548,-5.59016 0,0 -23.6126,-31.1516 -72.1087,-11.2984 -48.4311,19.8402 -30.2599,60.3402 -30.2599,60.3402 0,0 -1.27323,-21.9756 32.9138,-43.4516z"/><path class="fil7" d="M1084.91 760.091c-51.6166,-8.50867 -58.3914,33.9768 -58.3914,33.9768 0,0 11.0185,-17.811 51.3461,-18.3425 19.6382,-0.261024 44.9433,14.198 44.9433,14.198 0,0 -9.9319,-25.1788 -37.8981,-29.8323z"/></g><rect class="fil9" height="2048" width="2048"/></svg>
`
let yahoo_logo = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path style="fill:#8F25A9;" d="M496.993,106.814l-58.262,19.421c-8.828,3.531-32.662,30.897-73.269,83.862c-43.255,54.731-66.207,90.041-69.738,107.697l-2.648,48.552l-0.883,30.897l5.297,74.152l76.8,1.766L363.697,512H134.179l4.414-34.428l36.193-1.766c18.538-1.766,30.014-6.179,33.545-11.476c2.648-3.531,3.531-27.366,3.531-68.855v-25.6l-0.883-51.2c-2.648-11.476-22.069-54.731-60.91-128.883c-39.724-76.8-65.324-121.821-77.683-137.71L0,37.076V0h243.641l-2.648,30.897l-75.917,11.476c23.834,54.731,60.028,131.531,108.579,227.752c63.559-75.917,97.103-125.352,97.986-146.538l-64.441-15.89l-3.531-37.076H512L496.993,106.814z"/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'
let bing_logo = '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512.003 512.003" style="enable-background:new 0 0 512.003 512.003;" xml:space="preserve"><path style="fill:#009688;" d="M451.649,213.957l-234.667-85.333c-5.538-2.008-11.656,0.853-13.664,6.391c-0.891,2.457-0.849,5.155,0.118,7.582l42.667,106.667c1.089,2.72,3.249,4.873,5.973,5.952l68.736,27.221L125.377,391.023l52.821-52.821c2.007-2.001,3.135-4.718,3.136-7.552V53.317c-0.001-4.358-2.653-8.277-6.699-9.899L67.969,0.751c-3.288-1.297-7.003-0.898-9.941,1.067c-2.933,1.983-4.692,5.292-4.693,8.832v426.667c0,0.299,0.235,0.555,0.256,0.853c0.095,1.646,0.577,3.247,1.408,4.672c0.426,0.537,0.905,1.031,1.429,1.472c0.603,0.812,1.321,1.531,2.133,2.133l106.667,64c3.407,2.074,7.686,2.074,11.093,0l277.333-170.667c3.145-1.965,5.043-5.423,5.013-9.131V223.983C458.669,219.498,455.864,215.491,451.649,213.957z"/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'

document.addEventListener("mouseup", function(e){
	if(is_on){
		selected_text = get_the_selected_text()
		if(selected_text != ""){

			div = document.createElement("div")
			div.classList.add("selected_text_extension")
			div.setAttribute("style", "width: 150px;height: 35px;z-index: 10000; position: absolute; left: "+e.pageX+"px; top: "+e.pageY+"px; border: 1px solid rgb(226, 226, 226); border-radius: 2px; background: rgb(245, 245, 245);overflow: hidden;");
			
			encoded_selected_text = encodeURI(selected_text)
			div.innerHTML=`
				<ul style='list-style: none;width: 100%;height: 100%;padding: 0;margin: 0;' >
					<li style='width: 25%;padding: 10px;margin: 0;float:left;box-sizing: border-box;'>
						<a style='position: relative;top: -2px' target='blank' href="${ Google + encoded_selected_text } ">${ google_logo }</a>
					</li>
					<li style='width: 25%;padding: 10px;margin: 0;float:left;box-sizing: border-box;'>
						<a style='position: relative;top: -2px' target='blank' href="${ Duckduckgo + encoded_selected_text } ">${ duckduckgo_logo }</a>
					</li>
					<li style='width: 25%;padding: 10px;margin: 0;float:left;box-sizing: border-box;'>
						<a style='position: relative;top: -2px' target='blank' href="${ Yahoo + encoded_selected_text } ">${ yahoo_logo }</a>
					</li>
					<li style='width: 25%;padding: 10px;margin: 0;float:left;box-sizing: border-box;'>
						<a style='position: relative;top: -2px' target='blank' href="${ Bing + encoded_selected_text } ">${ bing_logo }</a>
					</li>
				</ul>
			`

			document.body.appendChild(div)


			selected_text = ""
			setTimeout(function(){
				divs = document.querySelectorAll(".selected_text_extension")
				for(let i = 0; i < divs.length; i++)
					document.body.removeChild(divs[i])
			}, 2500)
		}
	}
	
})

document.addEventListener("keyup", function(e){
	if(is_on){
		selected_text = get_the_selected_text()
		if(selected_text != ""){

			div = document.createElement("div")
			div.classList.add("selected_text_extension")
			div.setAttribute("style", "width: 150px;height: 35px;z-index: 10000; position: absolute; left: "+e.pageX+"px; top: "+e.pageY+"px; border: 1px solid rgb(226, 226, 226); border-radius: 2px; background: rgb(245, 245, 245);overflow: hidden;");
			
			encoded_selected_text = encodeURI(selected_text)
			div.innerHTML=`
				<ul style='list-style: none;width: 100%;height: 100%;padding: 0;margin: 0;' >
					<li style='width: 25%;padding: 10px;margin: 0;float:left;box-sizing: border-box;'>
						<a style='position: relative;top: -2px' target='blank' href="${ Google + encoded_selected_text } ">${ google_logo }</a>
					</li>
					<li style='width: 25%;padding: 10px;margin: 0;float:left;box-sizing: border-box;'>
						<a style='position: relative;top: -2px' target='blank' href="${ Duckduckgo + encoded_selected_text } ">${ duckduckgo_logo }</a>
					</li>
					<li style='width: 25%;padding: 10px;margin: 0;float:left;box-sizing: border-box;'>
						<a style='position: relative;top: -2px' target='blank' href="${ Yahoo + encoded_selected_text } ">${ yahoo_logo }</a>
					</li>
					<li style='width: 25%;padding: 10px;margin: 0;float:left;box-sizing: border-box;'>
						<a style='position: relative;top: -2px' target='blank' href="${ Bing + encoded_selected_text } ">${ bing_logo }</a>
					</li>
				</ul>
			`

			document.body.appendChild(div)


			selected_text = ""
			setTimeout(function(){
				divs = document.querySelectorAll(".selected_text_extension")
				for(let i = 0; i < divs.length; i++)
					document.body.removeChild(divs[i])
			}, 2500)
		}
	}
})

