package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/teamA-recursion-202404/golang_postcode_api/pkg/structs"
)

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

	// 備考: keywordが複数の場合でも自動的に複数語句で検索される
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

	var postcodes []structs.Postcode
	err = json.Unmarshal(body, &postcodes)
	if err != nil {
		return
	}

	json.NewEncoder(w).Encode(structs.ResponseList{Results: postcodes})
}
