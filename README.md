## 制作物

* 郵便番号データ取得API
* APIのデモアプリ

### アクセス方法

1. リポジトリーをgit cloneする
   `git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY`

2. 絶対パスをブラウザで入力し、top.htｍlを開く
   `file:///home/hoge/golang_zipcode_api/frontend/html/top.html`

---

## 郵便番号データ取得API

3つの機能があります

1. リスト取得
2. 検索
3. 詳細取得

---

### エンドポイント

#### 1. リスト取得

   郵便番号データのリストを取得できます

| エンドポイント |  |  | 内容 |
|---------|---------|---------|---------|
| `api/list` |  |  | ・最大100件を返す |
| **クエリパラメータ** | 必須 or 任意 | 受け付ける値 |   |
| `page={ページ番号}` | 任意 | 整数（〜1209） | ・全郵便番号のリストから、指定された番号のページのものを返す<br>・例えば、`5`を指定した場合は5ページ目、つまり401-500番目の郵便番号のデータを返す<br>・最大ページ数は1209。それ以上の数字を入力すると空の結果が返ってくる（エラーメッセージが返るように変更する予定）<br>・ページ番号を指定しない場合は1-100番目を返す |
| `sort={文字列}` | 任意 | "asc", "desc" | ・昇順もしくは降順で、そのページ内の郵便番号をソートする |

#### 2. 検索

   キーワードを指定すると、郵便番号もしくは住所情報を検索し、検索結果を取得できます

| エンドポイント |  |  | 内容 |
|---------|---------|---------|---------|
| `api/search` |  |  | ・最大100件を返す |
| **クエリパラメータ** | 必須 or 任意 | 受け付ける値 |   |
| `keyword={検索ワード}` | 必須 | 文字列（漢字、カナ、ローマ字）、数字 | - |

> [!WARNING]
> 検索機能にはページ分け機能がありません<br>
> 100件以上の検索結果がある場合でも、最初の100件のみが返されます

#### 3. 詳細取得

   郵便番号を指定すると、その詳細情報を取得できます

| エンドポイント |  |  | 内容 |
|---------|---------|---------|---------|
| `api/detail` |  |  | ・入力値と一致する郵便番号を返す |
| **クエリパラメータ** | 必須 or 任意 | 受け付ける値 |   |
| `postcode={郵便番号}` | 必須 | 7桁の数字 | ・入力値が7桁の数字でない場合、エラーメッセージが返る |

---

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

```
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

```
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

