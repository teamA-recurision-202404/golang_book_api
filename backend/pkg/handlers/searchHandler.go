package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/teamA-recursion-202404/golang_postcode_api/pkg/structs"
)

type postcode struct {
	Jis        string `json:"jis"`
	OldZip     string `json:"old"`
	Zip        string `json:"new"`
	Prefecture string `json:"prefecture"`
	City       string `json:"city"`
	Suburb     string `json:"suburb"`
}


func SearchHandler(w http.ResponseWriter, r *http.Request) {
	// "*" はワイルドカードで、どのドメインからのリクエストも許可する
	// 本番環境ではセキュリティ上の理由から設定しないことが推奨される
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	query := r.URL.Query()
	keyword := query.Get("keyword")

	// keywordが空文字の場合、エラーメッセージを返す
	if keyword == "" {
		json.NewEncoder(w).Encode(
			structs.ErrorMessage{Message: "keywordを入力してください", StatusCode: 400},
		)
		return
	}

	// keywordが複数の場合、それを検索できるように整える
	//   ポストくんが受け付ける複数検索の形式は以下の通り
	//   ?keyword=東京+渋谷+恵比寿ガーデンプレイス

	response, err := http.Get("https://postcode.teraren.com/postcodes.json?s=" + keyword)

	if err != nil {
		fmt.Println("Error fetching data:", err)
		return
	}

	defer response.Body.Close()

	body, err := io.ReadAll(response.Body)
	if err != nil {
		return
	}

	var postcodes []postcode
	err = json.Unmarshal(body, &postcodes)
	if err != nil {
		return
	}

	json.NewEncoder(w).Encode(postcodes)
}
