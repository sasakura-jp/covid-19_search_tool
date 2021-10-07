var government = ['www.kantei.go.jp', 'corona.go.jp', 'www.mhlw.go.jp', 'www.forth.go.jp', 'www.cov19-vaccine.mhlw.go.jp', 'www.anzen.mofa.go.jp', 'www.mofa.go.jpmofaj/', 'www.moj.go.jp', 'www.niid.go.jp', 'www.npa.go.jp', 'www.npsc.go.jp', 'www.fsa.go.jp', 'www.clb.go.jp', 'www.kunaicho.go.jp', 'www.soumu.go.jp', 'www.mof.go.jp', 'www.mext.go.jp', 'www.meti.go.jp', 'www.mlit.go.jp', 'www.env.go.jp'];

var todofuken = ['www.pref.hokkaido.lg.jp','www.pref.aomori.lg.jp', 'www.pref.iwate.jp', 'www.pref.miyagi.jp', 'www.pref.akita.lg.jp', 'www.pref.yamagata.jp', 'www.pref.fukushima.lg.jp', 'www.pref.ibaraki.jp', 'www.pref.tochigi.lg.jp', 'www.pref.gunma.jp', 'www.pref.saitama.lg.jp', 'www.pref.chiba.lg.jp', 'www.metro.tokyo.lg.jp', 'www.pref.kanagawa.jp', 'www.pref.niigata.lg.jp', 'www.pref.toyama.jp', 'www.pref.ishikawa.lg.jp', 'www.pref.fukui.lg.jp', 'www.pref.yamanashi.jp', 'www.pref.nagano.lg.jp', 'www.pref.gifu.lg.jp', 'www.pref.shizuoka.jp', 'www.pref.aichi.jp', 'www.pref.mie.lg.jp', 'www.pref.shiga.lg.jp', 'www.pref.kyoto.jp', 'www.pref.osaka.lg.jp', 'web.pref.hyogo.lg.jp', 'www.pref.nara.jp', 'www.pref.wakayama.lg.jp', 'www.pref.tottori.lg.jp', 'www.pref.shimane.lg.jp', 'www.pref.okayama.jp', 'www.pref.hiroshima.lg.jp', 'www.pref.yamaguchi.lg.jp', 'www.pref.tokushima.lg.jp', 'www.pref.kagawa.lg.jp', 'www.pref.ehime.jp', 'www.pref.kochi.lg.jp', 'www.pref.fukuoka.lg.jp', 'www.pref.saga.lg.jp', 'www.pref.nagasaki.jp', 'www.pref.kumamoto.jp', 'www.pref.oita.jp', 'www.pref.miyazaki.lg.jp', 'www.pref.kagoshima.jp', 'www.pref.okinawa.lg.jp'];

var media = ['www3.nhk.or.jp'];

var medical = ['covnavi.jp', 'www.med.or.jp', 'www.jpeds.or.jp', 'www.msf.or.jp'];

var others = ['www.covid19-yamanaka.com', 'fij.info', 'www.seiho.or.jp'];

function seticon(){

	var s_result = document.getElementsByClassName('gsc-resultsRoot gsc-tabData gsc-tabdActive');
	var rc_name = s_result[0].childNodes[0].childNodes[1].className;
	if(rc_name=='gsc-expansionArea'){
		var result_list = s_result[0].childNodes[0].childNodes[1].childNodes;
	}else{
		var result_list = s_result[0].childNodes[0].childNodes[0].childNodes;
	}

	for(var i=0; i<10; i++){
		var url = result_list[i].childNodes[0].childNodes[1].childNodes[0].textContent;
		if(government.includes(url)){
			result_list[i].classList.add('government');
		}else if(todofuken.includes(url)){
			result_list[i].classList.add('todofuken');
		}else if(medical.includes(url)){
			result_list[i].classList.add('medical');
		}else if(media.includes(url)){
			result_list[i].classList.add('media');
		}else if(others.includes(url)){
			result_list[i].classList.add('others');
		}else{
			result_list[i].classList.add('s_unknown');
		}

		result_list[i].style.paddingLeft = '30px';
	}

	var shift_gsearch = document.getElementsByClassName('gcsc-more-maybe-branding-root');
	if(shift_gsearch.length > 0){
		for(var j=0; j<shift_gsearch.length; j++){
			shift_gsearch[j].style.display = 'none';
		}
	}

	var spelling = document.getElementsByClassName('gs-spelling gs-result');
	if(spelling.length > 0){
		for(var j=0; j<spelling.length; j++){
			spelling[j].style.display = 'none';
		}
	}

}


//urlからパラメータを取得
function getParam(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

//検索条件の引き継ぎ
function setSearchParameter(){
	const inputText = getParam("text");
	if (inputText != '' && inputText != null){
		document.getElementById('textArea1').value = inputText;
		addedKeywordArray = getParam("added").split('|');
		if (addedKeywordArray[0] == ""){
			addedKeywordArray.splice(0, 1);
		}
		const keywordArray = getParam("keyword").split('|');
		generateKeywordButton(keywordArray);
		const keywordButton = document.getElementsByClassName("btn btn-outline-secondary text-center btn-words btn-sm");


	}

}



window.onload = function() {
	setSearchParameter();


	seticon();

	var adblock = document.getElementsByClassName('gsc-adBlock');
	console.log(adblock);
	if(adblock.length > 0){
		console.log('adblock!');
		adblock[0].style.display = 'none';
	}

	var observer = new MutationObserver(function(){
		console.log('DOM changed.');
		seticon();
	});
	const elem = document.getElementById('___gcse_0');
	console.log('gcs_0: ', elem);

	const config={
		childList: true,
		subtree: true
	};

	observer.observe(elem, config);

};
