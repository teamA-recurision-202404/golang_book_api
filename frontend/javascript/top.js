const tbody = document.querySelector('#tbody');
const detailBtn = document.querySelector('#api-detail');

// 試しに作成: ボタンをクリックしたときにapiにアクセスする処理
fetchBtn.addEventListener('click', () => {
  fetch('https://postcode.teraren.com/postcodes/0600001.json')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
});

// 詳細のapiを叩く + 詳細ページに移動する
detailBtn.addEventListener('click', () => {
  fetch('https://postcode.teraren.com/postcodes/0600001.json')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      window.location.href = './detail.html';
    });
});

// === ダミーデータを100列表示する処理 ===
// ===   apiのレスポンスを受け取ったら、この処理を書き換える ===

// ダミーデータ 項目: postcode, pref, city, town
dummyData = [
  { postcode: '9999999', pref: 'dummy', city: 'New York', town: 'Brooklyn' },
];

// 作成されるtr要素の中身

// <tr>
//  <th scope="row">1</th>
//  <td>111-2222</td>
//  <td>dummy</td>
//  <td>New York</td>
//  <td>Brooklyn</td>
//  <td><button id="detail" class="search text-primary">詳細</button></td>
// </tr>

// テーブルに100列までダミーデータを表示する
for (let i = 0; i < 100; i++) {
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
  td1.textContent = convertPostcode(dummyData[0].postcode);
  td2.textContent = dummyData[0].pref;
  td3.textContent = dummyData[0].city;
  td4.textContent = dummyData[0].town;
  button.textContent = '詳細';
  button.classList.add('detail');

  tr.appendChild(th);
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  td5.appendChild(button);

  tbody.appendChild(tr);
}

// === ここまで: ダミーデータを100列表示する処理 ===
