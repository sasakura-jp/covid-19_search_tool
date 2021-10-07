let timerid = 0;
var addedKeywordArray = [];

//入力から5秒後に単語抽出を行う
function setTimer(){
  //キーワード抽出中のロード表示
  setLoader();
  //設定済みのタイマーを削除
  if(timerid != 0){
    window.clearTimeout(timerid);
  }
  //新しいタイマーを設定
  timerid = window.setTimeout( function() {
    generateKeywordButton();
  }, 3000 );
}

//単語抽出を行い、各単語を選択可能なボタンを表示
function generateKeywordButton(keywordArray=[]){

  var text = document.getElementById("textArea1").value;

  //スコア付きで単語抽出
  if (text != ""){
    (async () => {
      console.log(text);
      const res = await KeywordAPI(text)
      if (res.err) {
          this.error = res.err
      }
      const result = res.result.phrases
      this.keywords = result.map(e => e.text)
      console.log(res);

      const formArea2 = document.getElementById('formArea2');
      formArea2.innerHTML = '';

      //キーワードごとにボタン作成
      for ( const keyword in this.keywords) {
        if(this.keywords.hasOwnProperty(keyword)) {
          var keyword_button = document.createElement('button');
          keyword_button.setAttribute('type','button');
          keyword_button.setAttribute('class',"btn btn-outline-secondary text-center btn-words btn-sm");
          keyword_button.innerHTML = this.keywords[keyword];
          keyword_button.addEventListener('click',function(){
            if (!this.classList.contains("active")){
              this.classList.add("active");
            } else {
              this.classList.remove("active");
            }
            //単語選択時に検索
            //searchClick();
          });
          if(keywordArray.includes(this.keywords[keyword])){
            keyword_button.classList.add("active");
          }
          formArea2.appendChild(keyword_button);
        }
      }

      //追加されたキーワードボタンを作成
      if(addedKeywordArray.length != 0){
        for (var i in addedKeywordArray){
          var keyword_button = document.createElement('button');
          keyword_button.setAttribute('type','button');
          keyword_button.setAttribute('class',"btn btn-outline-secondary text-center btn-words btn-sm");
          keyword_button.innerHTML = addedKeywordArray[i];
          keyword_button.addEventListener('click',function(){
            if (!this.classList.contains("active")){
              this.classList.add("active");
            } else {
              this.classList.remove("active");
            }
            //単語選択時に検索
            //searchClick();
          });
          if(keywordArray.includes(addedKeywordArray[i])){
            keyword_button.classList.add("active");
          }
          formArea2.appendChild(keyword_button);
        }
      }

      //最後に任意のキーワードを追加できるボタンを作成
      var new_keyword_button = document.createElement('button');
      new_keyword_button.setAttribute('type','button');
      new_keyword_button.setAttribute('class',"btn btn-secondary rounded-circle p-0 btn-sm add-button");
      new_keyword_button.setAttribute('style','width:1.5rem;height:1.5rem;');
      new_keyword_button.setAttribute('id','new_keyword_button');
      new_keyword_button.innerHTML = "+";
      new_keyword_button.addEventListener('click',function(){
        var new_keyword_area = document.getElementById('newKeywordArea');
        if(new_keyword_area.classList.contains("new-keyword-area-hidden")){
          new_keyword_area.classList.remove("new-keyword-area-hidden");
          new_keyword_button.innerHTML = "-";
        } else {
          new_keyword_area.classList.add("new-keyword-area-hidden");
          new_keyword_button.innerHTML = "+";
        }
        document.getElementById('newKeyword').focus();
      });
      formArea2.appendChild(new_keyword_button);
    })();
  }
  //ロード表示を削除
  removeLoader();
}

//キーワードを追加
function addKeyword(){
  var newKeyword = document.getElementById('newKeyword').value;
  if (newKeyword.length !== 0 && !isConf(newKeyword)){
    const formArea2 = document.getElementById('formArea2');
    var keyword_button = document.createElement('button');
    keyword_button.setAttribute('type','button');
    keyword_button.setAttribute('class',"btn btn-outline-secondary text-center btn-words btn-sm");
    keyword_button.innerHTML = newKeyword;
    keyword_button.addEventListener('click',function(){
      if (!this.classList.contains("active")){
        this.classList.add("active");
      } else {
        this.classList.remove("active");
      }
      //単語選択時に検索
      //searchClick();
    });
    formArea2.insertBefore(keyword_button,formArea2.lastElementChild);
    addedKeywordArray.push(newKeyword);
    //追加キーワード入力欄の表示を非表示に戻す
    document.getElementById('newKeyword').value = "";
    var new_keyword_area = document.getElementById('newKeywordArea');
    new_keyword_area.classList.add("new-keyword-area-hidden");
    var new_keyword_button = document.getElementById('new_keyword_button');
    new_keyword_button.innerHTML = "+";
  }

}

//キーワードリストと新しく追加するキーワードの競合がないか判定
function isConf(newKeyword){
  var keywords = document.getElementsByClassName("btn btn-outline-secondary text-center btn-words btn-sm");
  for (const keyword of keywords) {
    if(keyword.innerHTML == newKeyword){
      return true;
    }
  }
  return false;
}

//キーワード追加時のエンターでsubmitされないように
function invalidEnter(){
  addKeyword();
  return false;
}

//キーワード抽出中のロード表示をセット
function setLoader(){
  const loader = document.getElementById('loader');
  if (loader.classList.contains("loaded")){
    loader.classList.remove("loaded");
  }
  const eText = document.getElementById('e_text');
  if (eText.classList.contains("hidden")){
    eText.classList.remove("hidden");
  }
}

//キーワード抽出中のロード表示を削除
function removeLoader(){
  const loader = document.getElementById('loader');
  if (!loader.classList.contains("loaded")){
    loader.classList.add("loaded");
  }
  const eText = document.getElementById('e_text');
  if (!eText.classList.contains("hidden")){
    eText.classList.add("hidden");
  }
}


//検索ボタン押下時
function searchClick() {
  //結果表示部分取得
  const content = document.getElementById("content")
  //初期化
  content.innerHTML = "";

  //検索対象の取得
  var q = ""; //getTargetSite();
  var keywordArray = [];

  //選択されている単語を取得
  const selected_keywords = document.getElementsByClassName("btn btn-outline-secondary text-center btn-words btn-sm active");
  for ( const selected_keyword of selected_keywords) {
    q += selected_keyword.innerHTML + " ";
    keywordArray.push(selected_keyword.innerHTML);
  }
  //入力された文字列の情報
  var inputText = document.getElementById('textArea1').value;

  var keyword = "";
  //選択されていない場合は入力された文字列をそのまま入れる
  if (selected_keywords.length == 0) {
    q = inputText;
  } else {
    //選択済みの抽出単語情報
    keyword = keywordArray.join('|');
  }

  var addedKeyword = "";
  if (addedKeywordArray.length != 0){
    //追加されたキーワードの情報
    addedKeyword = addedKeywordArray.join('|');
  }

  //遷移
  location.href = location.href.split(/#|\?/g)[0] + '?q=' + q +  '&text=' + inputText + '&keyword=' + keyword + '&added=' + addedKeyword;



}


//検索対象を取得
function getTargetSite(){
  //全てのドメインを除外したテンプレートから選択されたドメインを取り除く形
  var targetSiteArray = ["go.jp","covnavi.jp","www.covid19-yamanaka.com"];

  const checkboxes = document.getElementsByName("checkbox[]");
  for (const checkbox of checkboxes) {
    if (checkbox.checked) {
      targetSiteArray.splice(targetSiteArray.indexOf(checkbox.value),1);
    }
  }
  //return "-site:" + targetSiteArray.join(' -site:');
  return "";
}

//検索対象
function selectAllSource(n,name){
  const checkboxes = document.getElementsByName(name);
  for (const checkbox of checkboxes){
    if (n == 1) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
  }
}
