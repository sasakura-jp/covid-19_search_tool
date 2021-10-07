# ころなけんさくつーる

![](https://user-images.githubusercontent.com/41366495/136415381-01e41a69-63fe-476c-8fad-4cf22231c05a.gif)

## Table of Contents

**for general**

+ About
+ できること
+ ツール使い方
+ 信頼できるソースについて
+ ロードマップ

**for developers**

+ リポジトリの構成
+ 構成技術
+ 技術的なロードマップ
+ License

**for MWSCup**

+ 審査基準について

## About

COVID-19に関して，信頼できるソースから容易に情報を検索できるツール．

COVID-19に関するデマ情報，フェイクニュースはワクチンの接種率の低下など，COVID-19の感染予防対策を妨害するような影響を伴い．問題となっている．このツールでは，COVID-19に関する記事，投稿などを基に簡単にファクトチェックを行えるようにすることで，情報源を調査する手間を取り除き，自分でソースを確認するといった人々を増やすことを目的とする．

> このツールは`MWSCup 2021 事前課題`として `Undamoni`が作成しました． 

## できること

1. COVID-19に関連した情報を信頼できるソースから検索できる．
2. 見つけた長文そのものをコピペし，抽出されたキーワードを選択するだけで検索ができる．
3. 拡張機能を用いることで，選択した文章を自動的にコピペし調査できる．

## ツール使い方

### Webサイト

1. [Webサイト](https://covid-19-search-tool.web.app/)にアクセスする．
2. テキスト入力欄にファクトチェックを行いたい文章をコピペする．
3. 数秒後にキーワードが抽出されるので，適宜選択し「検索」ボタンをクリックする．
4. タブごとに信頼できるソースからの情報が表示されるので，適切な記事を読む．

> 初回起動時は，単語抽出APIの起動の関係で1分弱時間がかかる場合があります．

### Chrome拡張機能

このツールでは，コピペの作業を省略するために拡張機能が利用できる．
使い方は文章を選択し，`右クリック>ころなけんさくつーる>「XXXX」を調査`の順に操作．

拡張機能のインストール方法は次の通り．

1. このリポジトリをクローンする．
2. Chrome拡張機能ページにアクセスし，デベロッパーモードをオンにする．
3. chrome_extensionフォルダをChromeの「パッケージ化されていない拡張機能を読み込む」機能で読み込む．
4. 必要に応じて拡張機能をパッケージ化し，インストールする．

> Chrome拡張機能を公開する為には，手数料と審査が必要となるため，今回は省略しました．


## 信頼できるソースについて

このツールでは，信頼できるソースから情報を検索することを主な機能としている．
COVID-19に関する情報は非常に流動性の高い情報であるため，このツールを継続的に利用する為には「信頼できるソース」がその通りの効力を持つようにメンテナンスを行う必要がある．このメンテナス作業は多くの人からの意見があった方が公平で正確な情報となることが期待できるため，多くの人の意見を取り入れられる環境があることが望ましい．

現時点では，これを実現する方法として2通りを用意している．

1. リポジトリの`source_url.csv`へのPull Request
2. 専用ページによる管理者へのリクエスト

1番は直接ファイルを編集する形式であるため，誰がどういう意図でといった情報も含めて記録され，意見を取り入れるといった際にはもっとも適切である．2番目はGithubよりも敷居の低い方法としてURLのみを送信できるフォームを用意した．管理コストを抑えるために，これは削除の要望やリクエストに対する意見などの情報は取り扱わない．

このリポジトリには`source_url.csv`という信頼できるソースの一覧を示したファイルが存在する．メンテナンスを行う際には，このファイルを編集しリポジトリへマージする際に検索エンジン側に適応しソースが更新する．

## ロードマップ

+ [完了]COVID-19に関する信頼できるソースからの検索ができる
+ [完了]キーワード抽出により，長文を容易に処理できる
+ [完了]拡張機能で容易にツールを使用できる
+ [完了]専用ページで，各々が容易に信頼できるソースを申請できる
+ 各々が独自のソースリストを基にCOVID-19に限らず検索できる

---

*for developers*

## リポジトリの構成

```
/
|--- web_app/
|       Webアプリケーションフロントエンド(HTML/CSS/JS)
|--- keyword_api/
|       単語抽出を行うAPI(Golang)
|--- chrome_extension/
|       chromeの拡張機能(javascript)
|--- source_url.csv
        信頼できるソースのリスト
```

## 構成技術

### 全体構成

```
                          +------+
                          | USER |
                      +---+------+---+
                      |    Access    |
                      |              |
   +---------+     +--v---+     +----v----+
   |Keyword  <-----+WebApp<-----+Chrome   |
   |Extractor|     +--+---+     |Extension|
   +---------+        |         +---------+
                      |
   +------------+     |
   |Google      <-----+
   |CustomSearch|
   +------------+
```

### WebApp

+ Vanilla HTML/JS
+ Bootstrap製
+ Firebase hostingで動作
+ 検索はGoogle CustomSearchを使用
+ 工夫
  + URLだけで内部状態を保持
  + アイコン表記でソースを明確化
  + 検索結果を見やすい表示形式に

### キーワード抽出

+ Go言語
+ Cloud Functionで動作
+ Yahooのキーワード抽出APIを使用
  + 学習済みの有名なモデルよりも高精度のため
  + CORS, APIトークンの管理のためラッパーAPI化

### 拡張機能

+ JavaScript
+ 一般的な範疇を出ない，シンプルな構成

## 技術的なロードマップ

### 検索機能について

+ [完了]Googleのカスタム検索APIを基に検索を行う
+ カスタム検索エンジンのソースを動的に変更する方法を確立する

### キーワード抽出について

+ [完了]Yahooのキーワード抽出APIを用いて実現する
+ 公開済みのモデルをFine Tuningして，コロナに適したキーワード抽出をおこなう

### 信頼できるソースについて

+ [完了]Gitによる更新ができる環境を用意する
+ [完了]信頼できるソースの申請，議論ができるページを用意する
+ カスタム検索APIに自動で反映されるように，パイプラインを用意する
+ CSVベースで個人ごとに信頼できるソースが用意できるようにする

## License

This software is released under the MIT License, see LICENSE.

---

*for MWSCup*

##  審査基準について

### 要件

+ Githubを用いて公開し，容易に利用・改変可能となっている
+ チームで協力して作成している
+ 成果物による法令順守違反及び倫理問題はない

### 継続性と貢献

COVID-19に関するデマ情報の問題は非常に多くの人に関係する．今回のツールではデマそのものの防止ではなく，自衛策として調査を簡単に利用できるようにした．この点で利用したい人は任意のプラットフォームで使用することができる．
ツールを普段使いするコストを下げるために拡張機能を作成し，基本的にはキーボードを触らずに調査ができることを目安に，ハードルをできるだけ下げるように工夫した．

継続的な改良計画については，信頼できるソースを継続して更新できる仕組み作りを計画している．詳細は後述する．

### 新規性

このツールは，多くの信頼できるWebサイトを効率的に横断し調査できるという点で新規性がある．
取り上げる問題自体は，多くの対策が行われている問題であるが，各個人が調査をすることで自衛をするという対策が容易にできるツールは類似するものが見つからなかった．また，構成技術は一般的なものではあるが，長い文章そのものをベースに適切な情報を検索できるツールは一般的ではなく，COVID-19というターゲットを絞ることで，より現在のニーズにフィットしたツールに仕上げたため，その点でも既成の検索ツール・デモ情報まとめサイトとの差別化に成功している．

### 実用性

ツールの機能，UIは今回の問題を解決するうえで必要最小限なシンプルな構成にし，使用方法を優先的に追記した．
このツールはニーズベースで開発したため，有効性は高いと考える．

### チームワーク

コーディングに関しては，適切に分担しコミットはコードを作成したメンバーが行った．
コーディングタスクが存在しないメンバーもツールの開発・発表に必要なタスクを適切に分担した．
具体的なタスクの分担はプライバシーの関係でここでは省略する．
