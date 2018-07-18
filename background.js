chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('tabl');
  chrome.tabs.executeScript(null, {file: "vendor/jquery-3.3.1.min.js"}, function() {
    chrome.tabs.executeScript(null, {file: "action.js"});
  });
});
