
const history = [];

document.getElementById('darkModeToggle').addEventListener('change', () => {
  document.body.classList.toggle('dark');
});

function clearFields() {
  document.getElementById('odd1').value = '';
  document.getElementById('odd2').value = '';
  document.getElementById('stake').value = '';
  document.getElementById('result').innerHTML = '';
  document.getElementById('surebetCheck').innerHTML = '';
}

function autoCheck() {
  const odd1 = parseFloat(document.getElementById('odd1').value);
  const odd2 = parseFloat(document.getElementById('odd2').value);
  const display = document.getElementById('surebetCheck');

  if (!odd1 || !odd2) {
    display.innerHTML = '';
    return;
  }

  const inv1 = 1 / odd1;
  const inv2 = 1 / odd2;
  const total = inv1 + inv2;

  if (total < 1) {
    display.innerHTML = '<span style="color:green; font-weight:bold">Има арбитражна възможност ✅</span>';
  } else {
    display.innerHTML = '<span style="color:red; font-weight:bold">Няма арбитражна възможност ❌</span>';
  }
}

function calculate() {
  const odd1 = parseFloat(document.getElementById('odd1').value);
  const odd2 = parseFloat(document.getElementById('odd2').value);
  const stake = parseFloat(document.getElementById('stake').value);
  const event = document.getElementById('eventSelect').value;

  if (!odd1 || !odd2 || !stake) {
    document.getElementById('result').innerText = 'Моля, попълнете всички полета.';
    return;
  }

  const inv1 = 1 / odd1;
  const inv2 = 1 / odd2;
  const totalInv = inv1 + inv2;

  if (totalInv >= 1) {
    document.getElementById('result').innerText = 'Няма сигурна възможност (сума ≥ 1).';
    return;
  }

  const bet1 = (stake * inv1) / totalInv;
  const bet2 = (stake * inv2) / totalInv;
  const profit = ((stake / totalInv) - stake).toFixed(2);

  const html = `
    <p>Залог на 1: ${bet1.toFixed(2)} лв</p>
    <p>Залог на 2: ${bet2.toFixed(2)} лв</p>
    <p>Очаквана печалба: <strong>${profit} лв</strong></p>
  `;
  document.getElementById('result').innerHTML = html;

  history.push(`${event}: ${profit} лв`);
  updateHistory();
}

function updateHistory() {
  const list = document.getElementById('historyList');
  list.innerHTML = '';
  history.forEach(item => {
    const li = document.createElement('li');
    li.innerText = item;
    list.appendChild(li);
  });
}

function exportToCSV() {
  if (!history.length) return alert('Няма данни за експортиране.');
  const csv = history.join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'surebet-history.csv';
  link.click();
}

// Описание за 2/3 опции и кога са подходящи
const description = `
  <div class="arbitrage-info">
    <h3>📘 Кога да използваш 2 или 3 опции</h3>
    <p>✅ <strong>Две опции (1 и 2)</strong> са подходящи за спортове без равенство: <em>тенис, волейбол, бойни спортове</em>.</p>
    <p>✅ <strong>Три опции (1, X, 2)</strong> се ползват при спортове с възможно равенство: <em>футбол, хокей</em>.</p>
    <p>➡️ Търси коефициенти с общ сбор <strong>под 1</strong> при обръщане (1/коеф.) – това означава, че имаш арбитраж!</p>
    <p>💡 Най-подходящи са коефициенти между <strong>2.00 и 3.50</strong>, но арбитражът зависи от комбинацията.</p>
  </div>`;

window.addEventListener('DOMContentLoaded', () => {
  const footer = document.createElement('div');
  footer.innerHTML = description;
  document.body.appendChild(footer);
});
