const fetchBtn = document.querySelector('.search');
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

// 試しに作成: ボタンをクリックしたときにapiにアクセスする処理
fetchBtn.addEventListener('click', () => {
  fetch('https://postcode.teraren.com/postcodes/0600001.json')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
});

// 詳細のapiを叩く + 詳細ページに移動する
// detailBtn.addEventListener('click', () => {
//   fetch('https://postcode.teraren.com/postcodes/0600001.json')
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       window.location.href = './detail.html';
//     });
// });

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

// 作成されるtr要素の中身

// <tr>
//  <th scope="row">1</th>
//  <td>111-2222</td>
//  <td>dummy</td>
//  <td>New York</td>
//  <td>Brooklyn</td>
//  <td><button id="detail" class="search text-primary">詳細</button></td>
// </tr>

function make_list(list) {
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
    button.classList.add('detail', 'btn', 'btn-dark');

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
