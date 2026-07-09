/* 属性選択（母機 → 子機） */
function selectRegister(type) {
  localStorage.setItem('selectedElement', type);
  window.location.href = type + ".html";
}

/* 子機：商品読み取り（カメラ起動） */
async function startCamera() {
  const video = document.getElementById("camera");
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
}

/* 子機：商品追加（羊皮紙に書き込む） */
function addItem(name, price) {
  const items = JSON.parse(localStorage.getItem('items') || "[]");
  items.push({ name, price });
  localStorage.setItem('items', JSON.stringify(items));
  renderItems();
}

/* 子機：羊皮紙に商品一覧を描画 */
function renderItems() {
  const items = JSON.parse(localStorage.getItem('items') || "[]");
  const list = document.getElementById("item-list");
  list.innerHTML = "";
  items.forEach(i => {
    const div = document.createElement("div");
    div.className = "gold-text";
    div.innerHTML = `${i.name} - ${i.price}G`;
    list.appendChild(div);
  });
}

/* 子機：会計処理 */
function checkout() {
  const items = JSON.parse(localStorage.getItem('items') || "[]");
  const total = items.reduce((sum, i) => sum + Number(i.price), 0);

  document.getElementById("total").innerHTML = total + " G";
  document.getElementById("checkout-screen").style.display = "block";
}

/* 子機：会計送信（魔法陣が反応） */
function sendCheckout() {
  const items = JSON.parse(localStorage.getItem('items') || "[]");
  const element = localStorage.getItem('selectedElement');

  const log = {
    element,
    items,
    time: new Date().toLocaleString()
  };

  const logs = JSON.parse(localStorage.getItem('logs') || "[]");
  logs.push(log);
  localStorage.setItem('logs', JSON.stringify(logs));

  const effect = document.getElementById("send-effect");
  effect.classList.add("active");

  setTimeout(() => {
    effect.classList.remove("active");
    window.location.href = "start.html";
  }, 2000);
}

/* 母機：トリプルタップでログイン画面 */
let tapCount = 0;
function centerTap() {
  tapCount++;
  if (tapCount >= 3) {
    window.location.href = "login.html";
  }
  setTimeout(() => tapCount = 0, 1000);
}

/* 母機：ログイン */
function login() {
  const pass = document.getElementById("pass").value;
  if (pass === "master123") {
    window.location.href = "master.html";
  }
}
