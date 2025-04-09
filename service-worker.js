function calculate() {
  const odd1 = parseFloat(document.getElementById("odd1").value);
  const odd2 = parseFloat(document.getElementById("odd2").value);
  const stake = parseFloat(document.getElementById("stake").value);

  if (!odd1 || !odd2 || !stake) {
    document.getElementById("result").innerText = "Моля, попълнете всички полета.";
    return;
  }

  const inv1 = 1 / odd1;
  const inv2 = 1 / odd2;
  const surebet = inv1 + inv2;

  if (surebet < 1) {
    const profitPercent = (1 - surebet) * 100;
    const bet1 = (stake * inv1) / surebet;
    const bet2 = (stake * inv2) / surebet;
    const profit = stake - (bet1 + bet2);

    document.getElementById("result").innerHTML = `
      <p>Сигурен залог! Очаквана печалба: <strong>${profit.toFixed(2)} лв</strong> (${profitPercent.toFixed(2)}%)</p>
      <p>Заложи <strong>${bet1.toFixed(2)} лв</strong> на Коеф. 1</p>
      <p>Заложи <strong>${bet2.toFixed(2)} лв</strong> на Коеф. 2</p>
    `;
  } else {
    document.getElementById("result").innerText = "Не е сигурен залог. Общата възвръщаемост е над 100%.";
  }
}
