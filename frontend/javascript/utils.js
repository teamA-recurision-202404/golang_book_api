// === 9999999 を 999-9999 に変換する関数 ===
function convertPostcode(postcode) {
  return postcode.slice(0, 3) + '-' + postcode.slice(3);
}

