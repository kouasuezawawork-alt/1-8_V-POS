window.addEventListener("load", () => {
  const root = document.getElementById("root");
  if (!root) {
    console.error("root要素が見つかりません。index.htmlを確認してください。");
    return;
  }

  root.innerHTML = `
    <div style="
      background-color: #0d0d0d;
      color: #e6c14d;
      font-family: 'Times New Roman', serif;
      text-align: center;
      padding: 40px;
    ">
      <h1 style="font-size: 32px;">魔法省端末 - VPOS</h1>
      <p style="font-size: 18px;">レジ端末を選択してください</p>
      <div style="
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
        margin-top: 30px;
      ">
        ${[1,2,3,4,5,6,7].map(num => `
          <button style="
            background: #1a1a1a;
            border: 2px solid #e6c14d;
            color: #e6c14d;
            padding: 15px;
            font-size: 20px;
            border-radius: 10px;
            cursor: pointer;
          ">
            ルーン${num}
          </button>
        `).join("")}
      </div>
    </div>
  `;
});
