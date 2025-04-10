// app.js
document.addEventListener("DOMContentLoaded", function() {
  // Елементи от DOM
  const modeRadios = document.getElementsByName("mode");
  const threeOddsContainer = document.getElementById("threeOdds");
  const calcBtn = document.getElementById("calcBtn");
  const clearBtn = document.getElementById("clearBtn");
  const loadBtn = document.getElementById("loadBtn");
  const resultDiv = document.getElementById("result");

  // Обект със статични (примерни) коефициенти по букмейкър
  const bookmakerCoefficients = {
    // За 2-изходен режим (1 и 2) и 3-изходен режим (1, X, 2)
    "Winbet": { two: { odd1: 2.10, odd2: 2.10 }, three: { odd1: 2.10, oddX: 3.30, odd2: 2.10 } },
    "PalmsBet": { two: { odd1: 2.05, odd2: 2.15 }, three: { odd1: 2.05, oddX: 3.40, odd2: 2.15 } },
    "Efbet": { two: { odd1: 2.00, odd2: 2.00 }, three: { odd1: 2.00, oddX: 3.20, odd2: 2.00 } },
    "Sesame": { two: { odd1: 2.15, odd2: 2.05 }, three: { odd1: 2.15, oddX: 3.50, odd2: 2.05 } },
    "Inbet": { two: { odd1: 2.10, odd2: 2.10 }, three: { odd1: 2.10, oddX: 3.30, odd2: 2.10 } },
    "Bet365": { two: { odd1: 2.20, odd2: 2.00 }, three: { odd1: 2.20, oddX: 3.40, odd2: 2.00 } },
    "Pinnacle": { two: { odd1: 2.25, odd2: 2.05 }, three: { odd1: 2.25, oddX: 3.50, odd2: 2.05 } },
    "Bwin": { two: { odd1: 2.10, odd2: 2.10 }, three: { odd1: 2.10, oddX: 3.30, odd2: 2.10 } },
    "Unibet": { two: { odd1: 2.15, odd2: 2.00 }, three: { odd1: 2.15, oddX: 3.40, odd2: 2.00 } }
  };

  // Функция за обновяване на режима (2 или 3 изхода)
  function updateMode() {
    const selectedMode = document.querySelector('input[name="mode"]:checked').value;
    if (selectedMode === "3") {
      threeOddsContainer.style.display = "block";
    } else {
      threeOddsContainer.style.display = "none";
    }
    resultDiv.innerHTML = "";
  }

  // Слушане за смяна на режима
  modeRadios.forEach(radio => {
    radio.addEventListener("change", updateMode);
  });

  // Функция за "зареждане" на примерни коефициенти от избрания букмейкър
  function loadCoefficients() {
    const bookmaker = document.getElementById("bookmaker").value;
    if (!bookmaker || !(bookmaker in bookmakerCoefficients)) {
      alert("Моля, избери валиден букмейкър.");
      return;
    }
    const selectedMode = document.querySelector('input[name="mode"]:checked').value;
    const coeffs = bookmakerCoefficients[bookmaker];
    if (selectedMode === "2") {
      document.getElementById("odd1").value = coeffs.two.odd1;
      document.getElementById("odd2").value = coeffs.two.odd2;
    } else { // 3-изходен режим
      document.getElementById("odd1").value = coeffs.three.odd1;
      document.getElementById("oddX").value = coeffs.three.oddX;
      document.getElementById("odd2").value = coeffs.three.odd2;
    }
  }

  loadBtn.addEventListener("click", loadCoefficients);

  // Функция за калкулиране на арбитража (surebet)
  function calculateSurebet() {
    const stake = parseFloat(document.getElementById("stake").value);
    const odd1 = parseFloat(document.getElementById("odd1").value);
    const odd2 = parseFloat(document.getElementById("odd2").value);
    const selectedMode = document.querySelector('input[name="mode"]:checked').value;

    if (isNaN(stake) || isNaN(odd1) || isNaN(odd2)) {
      resultDiv.innerHTML = "<p>Моля, попълнете всички задължителни полета.</p>";
      return;
    }
    
    let total, bet1, bet2, profit, details = "";

    if (selectedMode === "2") {
      total = (1 / odd1) + (1 / odd2);
      if (total < 1) {
        bet1 = (stake * (1 / odd1)) / total;
        bet2 = (stake * (1 / odd2)) / total;
        // Изчисляваме печалбата от първия залог (резултатът трябва да е еднакъв и за двата залога)
        let ret = bet1 * odd1;
        profit = ret - stake;
        details += `<p style="color: green;">Сигурен залог!</p>`;
        details += `<p>Залажи <strong>${bet1.toFixed(2)} лв</strong> на 1</p>`;
        details += `<p>Залажи <strong>${bet2.toFixed(2)} лв</strong> на 2</p>`;
        details += `<p>Очаквана печалба: <strong>${profit.toFixed(2)} лв</strong></p>`;
      } else {
        details = `<p style="color: red;">Няма арбитражна възможност при тези коефициенти.</p>`;
      }
    } else { 
      // 3-изходен режим
      const oddX = parseFloat(document.getElementById("oddX").value);
      if (isNaN(oddX)) {
        resultDiv.innerHTML = "<p>Моля, попълнете коефициент за X.</p>";
        return;
      }
      total = (1 / odd1) + (1 / oddX) + (1 / odd2);
      if (total < 1) {
        let betX;
        bet1 = (stake * (1 / odd1)) / total;
        betX = (stake * (1 / oddX)) / total;
        bet2 = (stake * (1 / odd2)) / total;
        let ret = bet1 * odd1;
        profit = ret - stake;
        details += `<p style="color: green;">Сигурен залог!</p>`;
        details += `<p>Залажи <strong>${bet1.toFixed(2)} лв</strong> на 1</p>`;
        details += `<p>Залажи <strong>${betX.toFixed(2)} лв</strong> на X</p>`;
        details += `<p>Залажи <strong>${bet2.toFixed(2)} лв</strong> на 2</p>`;
        details += `<p>Очаквана печалба: <strong>${profit.toFixed(2)} лв</strong></p>`;
      } else {
        details = `<p style="color: red;">Няма арбитражна възможност при тези коефициенти.</p>`;
      }
    }
    resultDiv.innerHTML = details;
  }

  calcBtn.addEventListener("click", calculateSurebet);

  // Функция за изчистване на всички входни полета и резултати
  function clearFields() {
    document.getElementById("event").value = "";
    document.getElementById("stake").value = "";
    document.getElementById("odd1").value = "";
    document.getElementById("odd2").value = "";
    document.getElementById("oddX").value = "";
    document.getElementById("bookmaker").value = "";
    resultDiv.innerHTML = "";
  }

  clearBtn.addEventListener("click", clearFields);

  // Инициализация – настройка на началния режим
  updateMode();
});
