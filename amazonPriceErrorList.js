var artnr = "";

function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

function downloadFile(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function getArtNrs(){
	var currentpage = parseInt(document.getElementById("myitable-gotopage").value);
	
	var maxpages = parseInt(document.getElementsByClassName("mt-totalpagecount")[0].innerHTML.replaceAll(' ', '').replaceAll('von', '').replaceAll('\t', '').replaceAll('\n', ''));
	
	if(currentpage < maxpages){
		setTimeout(function(){ 
			eventFire(document.querySelectorAll("a[href='#next']")[0], 'click');
			getArtNrs(artnr);
		}, 5000);
	}
	else{
		downloadFile("amazonPriceErrorList.txt", artnr);
	}
	
	addArtNrsToString();
}

function addArtNrsToString(){
	var tempnr = "";
	var skucheck = "";

		for(var i = 0; i < document.querySelectorAll('.mt-link-content').length; i++){
			skucheck = document.getElementsByClassName('mt-link-content')[i].href;
			if(skucheck.includes("mSku")){
				tempnr = document.getElementsByClassName('mt-link-content')[i].innerHTML;
				tempnr = tempnr.replaceAll(' ', '').replaceAll('\n', '') + '\n';
				artnr = artnr + tempnr;
			}
		}
}

getArtNrs();