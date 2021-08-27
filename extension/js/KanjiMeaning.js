
function loadData(kanjiData) {
	//kanjiData = JSON.parse(kanjiData);

	if(kanjiData.error == undefined) {
		var kanjiElem = document.querySelector("#kanji-info-kanji");
		var kanjiMeaningElem = document.querySelector("#kanji-info-meaning");
		var kanjiOnElem = document.querySelector("#kanji-info-on");
		var kanjiKunElem = document.querySelector("#kanji-info-kun");
		var kanjiJishoElem = document.querySelector("#kanji-info-jisho");
		var kanjiJishoCharacterElem = document.querySelector("#kanji-info-jisho-character");
	
		kanjiElem.innerHTML = kanjiData.kanji;
		kanjiMeaningElem.innerHTML = kanjiData.meanings.join(", ");
		kanjiOnElem.innerHTML = kanjiData.on_readings.join(", ");
		kanjiKunElem.innerHTML = kanjiData.kun_readings.join(", ");

		kanjiJishoCharacterElem.innerHTML = kanjiData.kanji;
		kanjiJishoElem.setAttribute("href", "https://jisho.org/search/" + kanjiData.kanji + "%23kanji");
	}
	else {
		var elem = document.querySelector("#kanji-info-container");
		elem.style = "display: none";

		elem = document.querySelector("#kanji-info-popup");
		var notFoundHtml = document.createElement("p");
		notFoundHtml.innerHTML = "No such Kanji :("
		elem.appendChild(notFoundHtml);
	}

}

function httpGetAsync(url, callback) {
	fetch(url)
		.then(response => response.json())
		.then(json => callback(json));
}




//Create element for Kanji information
var container = document.createElement("div");
container.setAttribute("id", "kanji-info-popup");


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

httpGetAsync(url + selectedKanji, console.log);

httpGetAsync(url + selectedKanji, loadData);

container.innerHTML = kanjiInfoHtml;

document.body.appendChild(container);


//Remove element when user clicks on anything except our container
document.body.onclick = function(event) {
	if(event.target !== container) {
		container.remove();
		document.body.onclick = null;
	}
}


