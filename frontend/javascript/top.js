const tbody = document.querySelector('#tbody');

async function postCodeList(pageNumber) {
  const serverUrl = 'http://localhost:8000/api';
  try {
    console.log(`${serverUrl}/list`);
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
