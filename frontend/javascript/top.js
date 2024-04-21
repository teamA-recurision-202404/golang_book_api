const tbody = document.querySelector('#tbody');
const detailBtn = document.querySelector('#api-detail');

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

function make_list(list) {
  // 作成されるtr要素の中身
  // <tr>
  //  <th scope="row">1</th>
  //  <td>111-2222</td>
  //  <td>dummy</td>
  //  <td>New York</td>
  //  <td>Brooklyn</td>
  //  <td><button id="detail" class="search btn btn-success">詳細</button></td>
  // </tr>

  tbody.innerHTML = '';
  for (let i = 0; i < list.length; ++i) {
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');
    const td5 = document.createElement('td');
    const button = document.createElement('button');

    th.textContent = i + 1;
    th.scope = 'row';
    td1.textContent = convertPostcode(list[i].new);
    td2.textContent = list[i].prefecture;
    td3.textContent = list[i].city;
    td4.textContent = list[i].suburb;
    button.textContent = '詳細';
    button.classList.add('detail', 'btn', 'btn-success');

    tr.appendChild(th);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    td5.appendChild(button);
    tbody.appendChild(tr);
  }
}

// === 検索ボタンを押した時の処理（search.jsと重複しているので共通化できるかも） ===

const searchButton = document.querySelector('#search');
const searchInput = document.querySelector('#search-input');

searchButton.addEventListener('click', () => {
  fetchSearch();
});

// === 検索ワードをフォームに表示する処理 ===
searchInput.value = searchKeyword;
