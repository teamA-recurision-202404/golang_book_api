const tbody = document.querySelector('#tbody');
const detailBtn = document.querySelector('#api-detail');

const searchResult = JSON.parse(sessionStorage.getItem('searchResult'));
const searchKeyword = sessionStorage.getItem('searchKeyword');

// === 検索ワードをフォームに表示する処理 ===
const searchInput = document.querySelector('#search-input');
searchInput.value = searchKeyword;

//

console.log(searchResult);
console.log(searchKeyword);
// 作成されるtr要素の中身

// <tr>
//  <th scope="row">1</th>
//  <td>111-2222</td>
//  <td>dummy</td>
//  <td>New York</td>
//  <td>Brooklyn</td>
//  <td><button id="detail" class="search text-primary">詳細</button></td>
// </tr>

// テーブルに最大100列の検索結果を表示する
for (let i = 0; i < searchResult.length; i++) {
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
  td1.textContent = convertPostcode(searchResult[i].new);
  td2.textContent = searchResult[i].prefecture;
  td3.textContent = searchResult[i].city;
  td4.textContent = searchResult[i].suburb;
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

// === ここまで: 検索結果を最大100列表示する処理 ===
