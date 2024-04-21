const tbody = document.querySelector('#tbody');
const detailBtn = document.querySelector('#api-detail');

// 表示されている郵便番号ごとに詳細ページに遷移するボタンを実装する

// クリック時に api取得関数を呼び出す+それが画面遷移も行う
async function fetchDetail() {
  const serverUrl = 'http://localhost:8000/api';
  try {
    const response = await fetch(`${serverUrl}/detail?postcode=1500012`, {
      mode: 'cors',
    });
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();
    // console.log(data);
    // データを詳細ページに渡す
    //   SessionStorageとは、ウェブブラウザに搭載されている機能の一つ
    //   参考: https://developer.mozilla.org/ja/docs/Web/API/Window/sessionStorage
    sessionStorage.setItem('detail', JSON.stringify(data));

    // 画面遷移
    window.location.href = './detail.html';
  } catch (error) {
    console.error('Error:', error);
  }
}

detailBtn.addEventListener('click', () => {
  fetchDetail();
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

// === ここまで: ダミーデータを100列表示する処理 ===
