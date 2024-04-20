package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

type PostcodeDetail struct {
    Postcode        string `json:"new"`
    Prefecture      string `json:"prefecture"`
    PrefectureKana  string `json:"prefecture_kana"`
    PrefectureRoman string `json:"prefecture_roman"`
    City            string `json:"city"`
    CityKana        string `json:"city_kana"`
    CityRoman       string `json:"city_roman"`
    Suburb          string `json:"suburb"`
    SuburbKana      string `json:"suburb_kana"`
    SuburbRoman     string `json:"suburb_roman"`
    StreetAddress   string `json:"street_address"` // 1008066 のとき"１丁目３−７"が入る
}

func DetailHandler(w http.ResponseWriter, r *http.Request) {
	// "*" はワイルドカードで、どのドメインからのリクエストも許可する
	// 本番環境ではセキュリティ上の理由から設定しないことが推奨される
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// パラメータを取得
	query := r.URL.Query()
    postcode := query.Get("postcode")
	// TODO: パラメータのバリデーション追加(7桁の数字のみ許可)

	// postcodeを使ってAPIを叩く
	url := fmt.Sprintf("https://postcode.teraren.com/postcodes/%s.json", postcode)
	res, err := http.Get(url)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	defer res.Body.Close()

	if res.StatusCode != 200 {
		fmt.Println("Error:", postcode, "という郵便番号は存在しません | status code", res.StatusCode)
		return
	}
	body, _ := io.ReadAll(res.Body)

	// レスポンスを構造体に変換
	var postcodeDetail PostcodeDetail

	if err := json.Unmarshal(body, &postcodeDetail); err != nil {
		fmt.Println(err)
		return
	}

	// 構造体をjsonに変換
	p, err := json.Marshal(postcodeDetail)
	if err != nil {
		fmt.Println(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, "%s", p)
}
