const searchResult = JSON.parse(sessionStorage.getItem('searchResult'));
const searchKeyword = sessionStorage.getItem('searchKeyword');

// === 検索ワードが未入力の場合の処理 ===
function messageEmptyKeyword() {
  console.log(searchResult);
  if (searchResult.status_code === 400) {
    const tr = document.createElement('tr');
    tr.textContent = '検索ワードを入力してください';
    tbody.appendChild(tr);
    return;
  }
}

// === 検索結果が0件の場合の処理 ===
function messageEmptyResult() {
  if (searchResult.results === null) {
    const tr = document.createElement('tr');
    tr.textContent = '検索結果がありません';
    tbody.appendChild(tr);
    return;
  }
}

// === テーブルに最大100列の検索結果を表示する ===
const tbody = document.querySelector('#tbody');

make_list(searchResult);
messageEmptyKeyword();
messageEmptyResult();

// === 検索ボタンを押した時の処理 ===

const searchButton = document.querySelector('#search');
const searchInput = document.querySelector('#search-input');

searchButton.addEventListener('click', () => {
  fetchSearch();
});

// === 検索ワードをフォームに表示する処理 ===
searchInput.value = searchKeyword;

// === すべての詳細ボタンに クリック時のfetchDetail実行を追加 ===

const detailButtons = document.querySelectorAll('.detail');

detailButtons.forEach((button) => {
  button.addEventListener('click', () => {
    fetchDetail(button.value);
  });
});
