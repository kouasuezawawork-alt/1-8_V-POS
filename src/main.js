// 属性選択を保存（母機 → 子機）
document.querySelectorAll('.symbol').forEach(el => {
  el.addEventListener('click', () => {
    const type = el.dataset.type;
    localStorage.setItem('selectedElement', type);
  });
});

// 子機 → 母機へデータ送信
function sendToMother(data) {
  const logs = JSON.parse(localStorage.getItem('registerLogs') || "[]");
  logs.push(data);
  localStorage.setItem('registerLogs', JSON.stringify(logs));
}

// 母機で子機のデータを取得
function getLogs() {
  return JSON.parse(localStorage.getItem('registerLogs') || "[]");
}
