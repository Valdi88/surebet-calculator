// app.js
document.addEventListener("DOMContentLoaded", function() {
  const modeRadios = document.getElementsByName("mode");
  const oddXContainer = document.getElementById("threeOdds");
  const calcBtn = document.getElementById("calcBtn");
  const clearBtn = document.getElementById("clearBtn");
  const resultDiv = document.getElementById("result");

  // Функция за обновяване на показването според избрания режим
  function updateMode() {
    const selectedMode = document.querySelector('input[name="mode"]:checked').value;
    // В 3-изходен режим показваме коефициента за X, иначе го скриваме
    if (selectedMode === "3") {
      oddXContainer.style.display = "block";
    } else {
      oddXContainer.style.display = "none";
    }
    // Изчистваме резултата при смяна на режим
    resultDiv.innerHTML = "";
  }

  // Слушане за промяна на радио бутоните
  modeRadios.forEach(radio => {
    radio.addEventListener("change", updateMode);
  });

  // Функция за калкулация на шуарбет (surebet)
  function calculateSurebet() {
    const stake = parseFloat(document.getElementById("stake").value);
    const odd1 = parseFloat(document.getElementById("odd1").value);
    const odd2 = parseFloat(document.getElementById("odd2").value);
    const selectedMode = document.querySelector('input[name="mode"]:checked').value;
    
    if (isNaN(stake) || isNaN(odd1) || isNaN(odd2)) {
      resultDiv.innerHTML = "Моля, попълнете всички задължителни полета.";
      return;
    }
    
    let total, bet1, bet2, profit, details = "";

    if (selectedMode === "2") {
      total = (1 / odd1) + (1 / odd2);
      if (total < 1) {
        bet1 = (stake * (1 / odd1)) / total;
        bet2 = (stake * (1 / odd2)) / total;
        // Очакваното връщане от всеки залог (те трябва да са приблизително еднакви)
        let ret1 = bet1 * odd1;
        profit = ret1 - stake; 
        details += `<p>Сигурен залог!</p>`;
        details += `<p>Залажи <strong>${bet1.toFixed(2)} лв</strong> на 1</p>`;
        details += `<p>Залажи <strong>${bet2.toFixed(2)} лв</strong> на 2</p>`;
        details += `<p>Очаквана печалба: <strong>${profit.toFixed(2)} лв</strong></p>`;
      } else {
        details = `<p>Няма арбитражна възможност при тези коефициенти.</p>`;
      }
    } else { // Режим 3-изходен (1, X, 2)
      const oddX = parseFloat(document.getElementById("oddX").value);
      if (isNaN(oddX)) {
        resultDiv.innerHTML = "Моля, попълнете коефициент за X.";
        return;
      }
      total = (1 / odd1) + (1 / oddX) + (1 / odd2);
      if (total < 1) {
        let betX;
        bet1 = (stake * (1 / odd1)) / total;
        betX = (stake * (1 / oddX)) / total;
        bet2 = (stake * (1 / odd2)) / total;
        let ret1 = bet1 * odd1;
        profit = ret1 - stake; // Очакваното връщане трябва да е приблизително еднакво
        details += `<p>Сигурен залог!</p>`;
        details += `<p>Залажи <strong>${bet1.toFixed(2)} лв</strong> на 1</p>`;
        details += `<p>Залажи <strong>${betX.toFixed(2)} лв</strong> на X</p>`;
        details += `<p>Залажи <strong>${bet2.toFixed(2)} лв</strong> на 2</p>`;
        details += `<p>Очаквана печалба: <strong>${profit.toFixed(2)} лв</strong></p>`;
      } else {
        details = `<p>Няма арбитражна възможност при тези коефициенти.</p>`;
      }
    }
    resultDiv.innerHTML = details;
  }

  // Слушател за бутона "Изчисли"
  calcBtn.addEventListener("click", calculateSurebet);

  // Функция за изчистване на всички полета
  function clearFields() {
    document.getElementById("stake").value = "";
    document.getElementById("odd1").value = "";
    document.getElementById("odd2").value = "";
    document.getElementById("oddX").value = "";
    resultDiv.innerHTML = "";
  }

  clearBtn.addEventListener("click", clearFields);

  // Инициализация на режима при зареждане
  updateMode();
});
