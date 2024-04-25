package structs

type ErrorMessage struct {
	StatusCode  int    `json:"status_code"`
	Message     string `json:"message"`
}

type PostcodeList struct {
    Postcode        string `json:"new"`
    Prefecture      string `json:"prefecture"`
    City            string `json:"city"`
    Suburb          string `json:"suburb"`
}

type PostcodeListOutput struct {
    Postcode        string `json:"postcode"`
    Prefecture      string `json:"prefecture"`
    City            string `json:"city"`
    Suburb          string `json:"suburb"`
}

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

type PostcodeDetailOutput struct {
    Postcode        string `json:"postcode"`
    Prefecture      string `json:"prefecture"`
    PrefectureKana  string `json:"prefecture_kana"`
    PrefectureRoman string `json:"prefecture_roman"`
    City            string `json:"city"`
    CityKana        string `json:"city_kana"`
    CityRoman       string `json:"city_roman"`
    Suburb          string `json:"suburb"`
    SuburbKana      string `json:"suburb_kana"`
    SuburbRoman     string `json:"suburb_roman"`
    StreetAddress   string `json:"street_address"`
}

// レスポンスをjsonに変換するための構造体
// 参考: https://randomuser.me/documentation#results
type ResponseList struct {
	Results []PostcodeListOutput `json:"results"`
}
