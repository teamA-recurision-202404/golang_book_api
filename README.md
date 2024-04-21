# 概要
郵便番号を検索するAPIです
郵便番号から住所を検索することも、キーワードから郵便番号を検索することも可能です

# アクセス方法

1. リポジトリーをgit cloneする
   `git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY`

2. 絶対パスをブラウザで入力し、top.htｍlを開く
   `file:///home/hoge/golang_zipcode_api/frontend/html/top.html`

## APIについて

### エンドポイント

1. 郵便番号一覧表示 API のエンドポイント
   `api/list`　
   トップに、全ての郵便番号情報をリスト取得するエンドポイント。一回の実行あたり100件取得可能。
2. 検索 API のエンドポイント
   `api/search`　
   キーワードを指定すると、郵便番号もしくは住所情報を検索し、検索結果を取得するエンドポイント。
3. 詳細情報表示 API のエンドポイント
   `api/detail`
   郵便番号を指定すると、その詳細情報を取得するエンドポイント。

### リクエストとレスポンス

#### リスト取得

##### リクエスト

```
curl 'http://localhost:8000/api/list?page={ページ番号}'
```

##### 使用例

```
curl 'http://localhost:8000/api/list?page=1'
```

##### レスポンス

```json
{
  "results":[
    {"new":"0600000","prefecture":"北海道","prefecture_kana":"ホッカイドウ","prefecture_roman":"Hokkaidou","city":"札幌市中央区","city_kana":"サッポロシチュウオウク","city_roman":"Sapporoshichuuouku","suburb":"","suburb_kana":"","suburb_roman":"","street_address":""},
    {"new":"0640941","prefecture":"北海道","prefecture_kana":"ホッカイドウ","prefecture_roman":"Hokkaidou","city":"札幌市中央区","city_kana":"サッポロシチュウオウク","city_roman":"Sapporoshichuuouku","suburb":"旭ケ丘","suburb_kana":"アサヒガオカ","suburb_roman":"Asahigaoka","street_address":""},
    ...
  ]
}
```

#### 検索

##### リクエスト

```
curl 'http://localhost:8000/api/search?keyword={検索ワード}'
```

##### 使用例

```
curl 'http://localhost:8000/api/search?keyword=富士山'
```

##### レスポンス

```json
{
  "results":[
    {"new":"3580017","prefecture":"埼玉県","prefecture_kana":"サイタマケン","prefecture_roman":"Saitamaken","city":"入間市","city_kana":"イルマシ","city_roman":"Irumashi","suburb":"駒形富士山","suburb_kana":"コマガタフジヤマ","suburb_roman":"Komagatafujiyama","street_address":""},
    {"new":"1901202","prefecture":"東京都","prefecture_kana":"トウキョウト","prefecture_roman":"Toukyouto","city":"西多摩郡瑞穂町","city_kana":"ニシタマグンミズホマチ","city_roman":"Nishitamagummizuhomachi","suburb":"駒形富士山","suburb_kana":"コマガタフジヤマ","suburb_roman":"Komagatafujiyama","street_address":""},
    ...
  ]
}
```

#### 詳細

##### リクエスト

```
curl 'http://localhost:8000/api/detail?postcode={郵便番号}'
```

##### 使用例

```
curl 'http://localhost:8000/api/detail?postcode=1901202'
```

##### レスポンス

```json
{
  "new":"1901202",
   "prefecture":"東京都",
   "prefecture_kana":"トウキョウト",
   "prefecture_roman":"Toukyouto",
   "city":"西多摩郡瑞穂町",
   "city_kana":"ニシタマグンミズホマチ",
   "city_roman":"Nishitamagummizuhomachi",
   "suburb":"駒形富士山",
   "suburb_kana":"コマガタフジヤマ",
   "suburb_roman":"Komagatafujiyama",
   "street_address":""
}
```

