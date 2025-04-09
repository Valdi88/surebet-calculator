
const history = [];

// Тъмна тема
document.getElementById('darkModeToggle').addEventListener('change', () => {
  document.body.classList.toggle('dark');
});

// Изчистване на полетата
function clearFields() {
  document.getElementById('odd1').value = '';
  document.getElementById('oddX').value = '';
  document.getElementById('odd2').value = '';
  document.getElementById('stake').value = '';
  document.getElementById('result').innerHTML = '';
  document.getElementById('surebetCheck').innerHTML = '';
  document.getElementById('eventSelect').value = '';
}

// Автоматична проверка за арбитраж
function autoCheck() {
  const odd1 = parseFloat(document.getElementById('odd1').value);
  const oddX = parseFloat(document.getElementById('oddX').value);
  const odd2 = parseFloat(document.getElementById('odd2').value);
  const display = document.getElementById('surebetCheck');

  if (!odd1 || !oddX || !odd2) {
    display.innerHTML = '';
    return;
  }

  const inv1 = 1 / odd1;
  const invX = 1 / oddX;
  const inv2 = 1 / odd2;
  const total = inv1 + invX + inv2;

  if (total < 1) {
    display.innerHTML = '<span style="color:green; font-weight:bold; animation: fadeIn 0.5s">Има арбитражна възможност ✅</span>';
  } else {
    display.innerHTML = '<span style="color:red; font-weight:bold; animation: fadeIn 0.5s">Няма арбитражна възможност ❌</span>';
  }
}

// Изчисление на арбитраж
function calculate() {
  const odd1 = parseFloat(document.getElementById('odd1').value);
  const oddX = parseFloat(document.getElementById('oddX').value);
  const odd2 = parseFloat(document.getElementById('odd2').value);
  const stake = parseFloat(document.getElementById('stake').value);
  const event = document.getElementById('eventSelect').value || 'Без име';

  if (!odd1 || !oddX || !odd2 || !stake) {
    document.getElementById('result').innerText = 'Моля, попълнете всички полета.';
    return;
  }

  const inv1 = 1 / odd1;
  const invX = 1 / oddX;
  const inv2 = 1 / odd2;
  const totalInv = inv1 + invX + inv2;

  if (totalInv >= 1) {
    document.getElementById('result').innerText = 'Няма сигурна възможност (сума ≥ 1).';
    return;
  }

  const bet1 = (stake * inv1) / totalInv;
  const betX = (stake * invX) / totalInv;
  const bet2 = (stake * inv2) / totalInv;
  const profit = ((stake / totalInv) - stake).toFixed(2);

  const html = `
    <div style="animation: slideIn 0.5s ease-out">
      <p>Залог на 1: ${bet1.toFixed(2)} лв</p>
      <p>Залог на X: ${betX.toFixed(2)} лв</p>
      <p>Залог на 2: ${bet2.toFixed(2)} лв</p>
      <p>Очаквана печалба: <strong>${profit} лв</strong></p>
    </div>
  `;
  document.getElementById('result').innerHTML = html;

  history.push(`${event}: ${profit} лв`);
}

// Експорт на история
function exportToCSV() {
  if (!history.length) return alert('Няма данни за експортиране.');
  const csv = history.join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'surebet-history.csv';
  link.click();
}

// Зареждане на реални коефициенти от избран букмейкър (примерни стойности)
async function loadOddsByBookmaker() {
  const bookmaker = document.getElementById('bookmakerSelect').value;
  const odds = {
    'Bet365': { odd1: 2.10, oddX: 3.30, odd2: 3.20 },
    'Pinnacle': { odd1: 2.15, oddX: 3.40, odd2: 3.05 },
    'Bwin': { odd1: 2.05, oddX: 3.20, odd2: 3.10 },
    'Unibet': { odd1: 2.08, oddX: 3.25, odd2: 3.15 },
    'Efbet': { odd1: 2.00, oddX: 3.10, odd2: 3.00 },
    'Palms Bet': { odd1: 2.12, oddX: 3.28, odd2: 3.18 },
    'Winbet': { odd1: 2.09, oddX: 3.27, odd2: 3.11 },
    'Sesame': { odd1: 2.11, oddX: 3.30, odd2: 3.14 },
    'Inbet': { odd1: 2.14, oddX: 3.32, odd2: 3.16 }
  };

  if (odds[bookmaker]) {
    document.getElementById('odd1').value = odds[bookmaker].odd1;
    document.getElementById('oddX').value = odds[bookmaker].oddX;
    document.getElementById('odd2').value = odds[bookmaker].odd2;
    autoCheck();
  } else {
    alert('Няма налични коефициенти за избрания букмейкър.');
  }
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
