document.querySelectorAll('.element').forEach(el => {
  el.addEventListener('click', () => {
    const type = el.dataset.type;
    alert(type + " を選択しました");
  });
});
