package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strconv"

	"github.com/teamA-recursion-202404/golang_postcode_api/pkg/structs"
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

func isNumericString(s string) bool {
    _, err := strconv.Atoi(s)
    return err == nil
}

func DetailHandler(w http.ResponseWriter, r *http.Request) {
	// "*" はワイルドカードで、どのドメインからのリクエストも許可する
	// 本番環境ではセキュリティ上の理由から設定しないことが推奨される
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	// パラメータを取得
	query := r.URL.Query()
    postcode := query.Get("postcode")

	// postcode が7桁の数字でない場合、エラーメッセージを返す
	if len(postcode) != 7 || !isNumericString(postcode) {
		json.NewEncoder(w).Encode(
			structs.ErrorMessage{Message: "7桁の数字を入力してください", StatusCode: 400},
		)
		return
	}

	// postcodeを使ってAPIを叩く
	url := fmt.Sprintf("https://postcode.teraren.com/postcodes/%s.json", postcode)
	res, err := http.Get(url)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	defer res.Body.Close()

	// 不正な郵便番号の場合、その旨を返す
	if res.StatusCode == 404 {
		json.NewEncoder(w).Encode(
			structs.ErrorMessage{Message:  postcode + " という郵便番号は存在しません。正しい郵便番号を入力してください", StatusCode: 404},
		)
		return
	// それ以外のエラーの場合、単純なエラーメッセージを返す
	} else if res.StatusCode != 200 {
		json.NewEncoder(w).Encode(
			structs.ErrorMessage{Message: "エラーが発生しました", StatusCode: res.StatusCode},
		)
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
	json.NewEncoder(w).Encode(postcodeDetail)
}
