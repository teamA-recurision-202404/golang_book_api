// === 9999999 を 999-9999 に変換する関数 ===
function convertPostcode(postcode) {
  return postcode.slice(0, 3) + '-' + postcode.slice(3);
}

// === 検索ボタンを押した時の処理 ===

async function fetchSearch() {
  const serverUrl = 'http://localhost:8000/api';
  try {
    const response = await fetch(
      `${serverUrl}/search?keyword=${searchInput.value}`,
      {
        mode: 'cors',
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();
    // console.log(data);
    sessionStorage.setItem('searchResult', JSON.stringify(data));
    sessionStorage.setItem('searchKeyword', searchInput.value);

    // 画面遷移
    window.location.href = './searchResult.html';
  } catch (error) {
    console.error('Error:', error);
  }
}

// === 詳細データ取得 + 詳細ページ遷移 ===

async function fetchDetail(value) {
  const serverUrl = 'http://localhost:8000/api';

  try {
    const response = await fetch(`${serverUrl}/detail?postcode=${value}`, {
      mode: 'cors',
    });
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();
    sessionStorage.setItem('detail', JSON.stringify(data));

    // 画面遷移
    window.location.href = './detail.html';
  } catch (error) {
    console.error('Error:', error);
  }
}
