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
    if (data.results) {
      sessionStorage.setItem('searchResult', JSON.stringify(data.results));
    } else {
      sessionStorage.setItem('searchResult', JSON.stringify(data));
    }
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

// TODO: pageNumberが存在する場合はそれを引数にする
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
    td1.textContent = convertPostcode(list[i].postcode);
    td2.textContent = list[i].prefecture;
    td3.textContent = list[i].city;
    td4.textContent = list[i].suburb;
    button.textContent = '詳細';
    button.classList.add('detail', 'btn', 'btn-success');
    button.value = list[i].postcode;

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
