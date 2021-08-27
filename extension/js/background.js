
var ctxBrowser = chrome;


ctxBrowser.contextMenus.create({
  id: "log-selection",
  title: "Kanji Meaning",
  contexts: ["selection"]
}, window.onCreated);


var fullUrl = ctxBrowser.runtime.getURL("KanjiInfo.html");
var kanjiInfoHtml;

fetch(fullUrl)
  .then(response => response.text())
  .then(infoHtml => {
    kanjiInfoHtml = infoHtml;
  })
  .catch(err => console.log(err));


ctxBrowser.contextMenus.onClicked.addListener(function(info, tab) {
  if(info.menuItemId === "log-selection") {

    selectedKanji = info.selectionText.charAt(0);

    ctxBrowser.tabs.insertCSS({file:"KanjiStyle.css"});

    ctxBrowser.tabs.executeScript({
      code: "var kanjiInfoHtml = decodeURI(\"" + encodeURI(kanjiInfoHtml) + "\");"
    }, function() {
        ctxBrowser.tabs.executeScript({
          code: "var selectedKanji = \"" + selectedKanji +"\";"
        }, function() {
            ctxBrowser.tabs.executeScript({
              file: "js/KanjiMeaning.js"        
            })
          })
      });
  }
});