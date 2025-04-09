const history = [];

document.getElementById('darkModeToggle').addEventListener('change', () => {
  document.body.classList.toggle('dark');
});

function addEvent() {
  const newEvent = document.getElementById('newEvent').value.trim();
  if (newEvent) {
    const option = document.createElement('option');
    option.text = newEvent;
    document.getElementById('eventSelect').add(option);
    document.getElementById('newEvent').value = '';
  }
}

function removeSelectedEvent() {
  const select = document.getElementById('eventSelect');
  select.remove(select.selectedIndex);
}

function clearFields() {
  document.getElementById('odd1').value = '';
  document.getElementById('odd2').value = '';
  document.getElementById('stake').value = '';
  document.getElementById('result').innerHTML = '';
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
