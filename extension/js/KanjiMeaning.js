
function loadData(kanjiData) {
	//kanjiData = JSON.parse(kanjiData);

	if(kanjiData.error == undefined) {
		var kanjiElem = document.querySelector("#kanji-info-kanji");
		var kanjiMeaningElem = document.querySelector("#kanji-info-meaning");
		var kanjiOnElem = document.querySelector("#kanji-info-on");
		var kanjiKunElem = document.querySelector("#kanji-info-kun");
		var kanjiJishoElem = document.querySelector("#kanji-info-jisho");
		var kanjiJishoCharacterElem = document.querySelector("#kanji-info-jisho-character");
	
		kanjiElem.appendChild(document.createTextNode(kanjiData.kanji));
		kanjiMeaningElem.appendChild(document.createTextNode(kanjiData.meanings.join(", ")));
		kanjiOnElem.appendChild(document.createTextNode(kanjiData.on_readings.join(", ")));
		kanjiKunElem.appendChild(document.createTextNode(kanjiData.kun_readings.join(", ")));

		kanjiJishoCharacterElem.appendChild(document.createTextNode(kanjiData.kanji));
		kanjiJishoElem.setAttribute("href", "https://jisho.org/search/" + kanjiData.kanji + "%23kanji");
	}
	else {
		var elem = document.querySelector("#kanji-info-container");
		elem.style = "display: none";

		elem = document.querySelector("#kanji-info-popup");
		var notFoundHtml = document.createElement("p");
		notFoundHtml.appendChild(document.createTextNode("No such Kanji :("));
		elem.appendChild(notFoundHtml);
	}

}

function httpGetAsync(url, ...callbacks) {
	fetch(url)
		.then(response => response.json())
		.then(json => callbacks.forEach(cb => cb(json)));
}




//Create element for Kanji information
var container = document.createElement("div");
container.setAttribute("id", "kanji-info-popup");
document.body.appendChild(container);

//Convert plain html text to node
var kanjiInfoHtmlElem = new DOMParser().parseFromString(kanjiInfoHtml, "text/html");
container.append(...kanjiInfoHtmlElem.body.childNodes);


//Get range of selection, place marker at the end of selection and get coords of that marker
var range = document.getSelection().getRangeAt(0);
range.collapse(false);
marker = document.createElement("span");
range.insertNode(marker);

var elemRect = marker.getBoundingClientRect();
var bodyRect = document.body.getBoundingClientRect();

var Y = elemRect.top - bodyRect.top;
var X = elemRect.left - bodyRect.left;

marker.remove();

container.style.top = 20 + Y + "px";
container.style.left = X + "px";

//URL for requests
var url = "https://kanjiapi.dev/v1/kanji/";

httpGetAsync(url + selectedKanji, loadData, console.log);






//Remove element when user clicks on anything except our container
document.body.onclick = function(event) {
	if(event.target !== container) {
		container.remove();
		document.body.onclick = null;
	}
}


undefined;