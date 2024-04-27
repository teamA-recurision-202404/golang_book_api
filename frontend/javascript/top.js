const tbody = document.querySelector('#tbody');

async function postCodeList(pageNumber) {
  const serverUrl = 'http://localhost:8000/api';
  try {
    const response = await fetch(`${serverUrl}/list?page=${pageNumber}`, {
      mode: 'cors',
    });
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();
    make_list(data['results']);
    setDetailButtons();
  } catch (error) {
    console.error('Error:', error);
  }
}

postCodeList(1);

// === ページ移動する処理 ===

const topForm = document.getElementById('top-page-form');
topForm.addEventListener('submit', function (event) {
  event.preventDefault(); // フォームのデフォルトの動作をキャンセル

  pageNumber = document.getElementById('top-page').value;
  postCodeList(pageNumber);
});

const bottomForm = document.getElementById('bottom-page-form');
bottomForm.addEventListener('submit', function (event) {
  event.preventDefault(); // フォームのデフォルトの動作をキャンセル

  pageNumber = document.getElementById('bottom-page').value;
  postCodeList(pageNumber);
});

// === jsonデータを表示する処理 ===


// === 検索ボタンを押した時の処理（search.jsと重複しているので共通化できるかも） ===

const searchButton = document.querySelector('#search');
const searchInput = document.querySelector('#search-input');

searchButton.addEventListener('click', () => {
  fetchSearch();
});

// TODO: リファクタ (search.jsにも同様に適用する)
// === すべての詳細ボタンに クリック時のfetchDetail実行を追加 ===

function setDetailButtons() {
  const detailButtons = document.querySelectorAll('.detail');

  detailButtons.forEach((button) => {
    button.addEventListener('click', () => {
      fetchDetail(button.value);
    });
  });
}
