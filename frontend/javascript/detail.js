const sessionData = JSON.parse(sessionStorage.getItem('detail'));

// === 取得した詳細データを表示する処理 ===

// new
// city
// city_kana
// city_roman
// prefecture
// prefecture_kana
// prefecture_roman
// suburb
// suburb_kana
// suburb_roman

const postcode = document.getElementById('postcode');
const prefecture = document.getElementById('prefecture');
const prefecture_kana = document.getElementById('prefecture_kana');
const prefecture_roman = document.getElementById('prefecture_roman');
const city = document.getElementById('city');
const city_kana = document.getElementById('city_kana');
const city_roman = document.getElementById('city_roman');
const suburb = document.getElementById('suburb');
const suburb_kana = document.getElementById('suburb_kana');
const suburb_roman = document.getElementById('suburb_roman');

postcode.textContent += convertPostcode(sessionData.new);
prefecture.textContent = sessionData.prefecture;
prefecture_kana.textContent = sessionData.prefecture_kana;
prefecture_roman.textContent = sessionData.prefecture_roman;
city.textContent = sessionData.city;
city_kana.textContent = sessionData.city_kana;
city_roman.textContent = sessionData.city_roman;
suburb.textContent = sessionData.suburb;
suburb_kana.textContent = sessionData.suburb_kana;
suburb_roman.textContent = sessionData.suburb_roman;

// === ここまで: 取得した詳細データを表示する処理 ===
