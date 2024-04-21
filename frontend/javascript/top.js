const fetchBtn = document.querySelector('.search');
const tbody = document.querySelector('#tbody');
const detailBtn = document.querySelector('#api-detail');

async function postCodeList() {
  const serverUrl = "http://localhost:8000/api";
  try {
      console.log(`${serverUrl}/list`)
      const response = await fetch(`${serverUrl}/list`,{ mode: "cors" });
      if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data["results"]);
      make_list(data["results"])
  } catch (error) {
      console.error("Error:", error);
  }
}

console.log(postCodeList())

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

function make_list(list) {
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
}

// === 以下、ダミーデータを100列表示する処理 ===
// ===   apiのレスポンスを受け取ったら、この処理を書き換える ===

// ダミーデータ 項目: postcode, pref, city, town
dummyData = [
  { postcode: '9999999', pref: 'dummy', city: 'New York', town: 'Brooklyn' },
];

// === 9999999 を 999-9999 に変換する関数 ===
function convertPostcode(postcode) {
  return postcode.slice(0, 3) + '-' + postcode.slice(3);
}
