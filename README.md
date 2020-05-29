# Twitterハッシュタグ速報（OBS対応）

### これは何か
![output](https://user-images.githubusercontent.com/41167277/83230159-3c90b580-a1c4-11ea-8564-c69cb0d0ddcd.gif)  
Twitterを自動で巡回し、指定のハッシュタグでのつぶやきを速報で画面に表示します。  
OBSにブラウザソースとして追加することで、生放送の画面に表示することもできます。  

### 設定方法
* TwitterのAPIを使用するので、Twitter Developerに登録しAPIを取得しておく。
* setting.jsを開き、APIキーとハッシュタグを入力する。

### 仕様
* index.htmlを開くと自動で巡回する。?demo=trueを付けるとデモモードになる。
* APIの制限があるので、巡回は7秒に1回。プレビューウィンドウなどで二重にアクセスしてしまうと制限がかかる可能性あるので注意。

### 問い合わせ
[Twitter](https://twitter.com/jintokai)までお願いします。