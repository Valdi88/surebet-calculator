
const history = [];

// Тъмна тема
document.getElementById('darkModeToggle').addEventListener('change', () => {
  document.body.classList.toggle('dark');
});

// Показване/скриване на поле Х
function toggleMode(mode) {
  const oddXField = document.getElementById('oddXField');
  if (mode === 'three') {
    oddXField.style.display = 'block';
  } else {
    oddXField.style.display = 'none';
    document.getElementById('oddX').value = '';
  }
  clearFields();
}

// Изчистване на полетата
function clearFields() {
  document.getElementById('odd1').value = '';
  document.getElementById('oddX').value = '';
  document.getElementById('odd2').value = '';
  document.getElementById('stake').value = '';
  document.getElementById('result').innerHTML = '';
  document.getElementById('surebetCheck').innerHTML = '';
}

// Автоматична проверка за арбитраж
function autoCheck() {
  const odd1 = parseFloat(document.getElementById('odd1').value);
  const oddX = parseFloat(document.getElementById('oddX').value);
  const odd2 = parseFloat(document.getElementById('odd2').value);
  const display = document.getElementById('surebetCheck');

  if (!odd1 || !odd2 || (document.getElementById('oddXField').style.display === 'block' && !oddX)) {
    display.innerHTML = '';
    return;
  }

  const inv1 = 1 / odd1;
  const inv2 = 1 / odd2;
  const invX = document.getElementById('oddXField').style.display === 'block' ? 1 / oddX : 0;
  const total = inv1 + invX + inv2;

  if (total < 1) {
    display.innerHTML = '<p style="color:green; font-weight:bold">✅ Има арбитражна възможност</p>';
  } else {
    display.innerHTML = '<p style="color:red; font-weight:bold">❌ Няма арбитражна възможност</p>';
  }
}

// Изчисление на арбитраж
function calculate() {
  const odd1 = parseFloat(document.getElementById('odd1').value);
  const oddX = parseFloat(document.getElementById('oddX').value);
  const odd2 = parseFloat(document.getElementById('odd2').value);
  const stake = parseFloat(document.getElementById('stake').value);

  const usingThree = document.getElementById('oddXField').style.display === 'block';
  const inv1 = 1 / odd1;
  const inv2 = 1 / odd2;
  const invX = usingThree ? 1 / oddX : 0;

  const totalInv = inv1 + invX + inv2;

  if (!odd1 || !odd2 || (usingThree && !oddX) || !stake) {
    document.getElementById('result').innerText = 'Моля, попълнете всички полета.';
    return;
  }

  if (totalInv >= 1) {
    document.getElementById('result').innerText = 'Няма сигурна възможност (сума ≥ 1).';
    return;
  }

  const bet1 = (stake * inv1) / totalInv;
  const bet2 = (stake * inv2) / totalInv;
  const betX = usingThree ? (stake * invX) / totalInv : 0;
  const profit = ((stake / totalInv) - stake).toFixed(2);

  let html = `<div style="animation: slideIn 0.5s ease-out">
      <p>Залог на 1: ${bet1.toFixed(2)} лв</p>`;
  if (usingThree) {
    html += `<p>Залог на X: ${betX.toFixed(2)} лв</p>`;
  }
  html += `<p>Залог на 2: ${bet2.toFixed(2)} лв</p>
      <p>Очаквана печалба: <strong>${profit} лв</strong></p>
    </div>`;

  document.getElementById('result').innerHTML = html;
}

// CSS за анимации
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes slideIn {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}`;
document.head.appendChild(style);
