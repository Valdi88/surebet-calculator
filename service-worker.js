document.addEventListener("DOMContentLoaded", function() {
  // Режим: по подразбиране 2-изходен (1 и 2)
  let mode = 2;
  const toggleModeBtn = document.getElementById("toggleModeBtn");
  const oddXContainer = document.getElementById("oddXContainer");
  const calcBtn = document.getElementById("calcBtn");
  const clearBtn = document.getElementById("clearBtn");
  const resultDiv = document.getElementById("result");

  // Превключване между 2-изходен и 3-изходен режим
  toggleModeBtn.addEventListener("click", function() {
    if (mode === 2) {
      mode = 3;
      oddXContainer.style.display = "block";
      toggleModeBtn.textContent = "Показване на 2-изходен режим";
    } else {
      mode = 2;
      oddXContainer.style.display = "none";
      toggleModeBtn.textContent = "Показване на 3-изходен режим";
    }
    resultDiv.innerHTML = "";
  });

  // Функция за калкулация на арбитражната възможност
  function calculateSurebet() {
    const stake = parseFloat(document.getElementById("stake").value);
    const odd1 = parseFloat(document.getElementById("odd1").value);
    const odd2 = parseFloat(document.getElementById("odd2").value);

    if (isNaN(stake) || isNaN(odd1) || isNaN(odd2)) {
      resultDiv.innerHTML = "<p style='color:red;'>Моля, попълнете всички задължителни полета.</p>";
      return;
    }
    
    let total, details = "";
    
    // Режим с 2 възможности (1 и 2)
    if (mode === 2) {
      total = (1/odd1) + (1/odd2);
      if (total < 1) {
        const bet1 = (stake * (1/odd1)) / total;
        const bet2 = (stake * (1/odd2)) / total;
        const ret = bet1 * odd1;  // очакваното връщане (приема се, че и двата изхода дават същия резултат)
        const profit = ret - stake;
        
        details += `<p style="color:green;">Сигурен залог! Арбитражна възможност е налична.</p>`;
        details += `<p>Залажи <strong>${bet1.toFixed(2)} лв</strong> на 1</p>`;
        details += `<p>Залажи <strong>${bet2.toFixed(2)} лв</strong> на 2</p>`;
        details += `<p>Очаквана печалба: <strong>${profit.toFixed(2)} лв</strong></p>`;
      } else {
        details = `<p style="color:red;">Няма арбитражна възможност при тези коефициенти.</p>`;
      }
    } else { 
      // Режим с 3 възможности (1, X, 2)
      const oddX = parseFloat(document.getElementById("oddX").value);
      if (isNaN(oddX)) {
        resultDiv.innerHTML = "<p style='color:red;'>Моля, попълнете коефициент за X.</p>";
        return;
      }
      total = (1/odd1) + (1/oddX) + (1/odd2);
      if (total < 1) {
        const bet1 = (stake * (1/odd1)) / total;
        const betX = (stake * (1/oddX)) / total;
        const bet2 = (stake * (1/odd2)) / total;
        const ret = bet1 * odd1;
        const profit = ret - stake;
        
        details += `<p style="color:green;">Сигурен залог! Арбитражна възможност е налична.</p>`;
        details += `<p>Залажи <strong>${bet1.toFixed(2)} лв</strong> на 1</p>`;
        details += `<p>Залажи <strong>${betX.toFixed(2)} лв</strong> на X</p>`;
        details += `<p>Залажи <strong>${bet2.toFixed(2)} лв</strong> на 2</p>`;
        details += `<p>Очаквана печалба: <strong>${profit.toFixed(2)} лв</strong></p>`;
      } else {
        details = `<p style="color:red;">Няма арбитражна възможност при тези коефициенти.</p>`;
      }
    }
    resultDiv.innerHTML = details;
  }

  calcBtn.addEventListener("click", calculateSurebet);

  // Функция за изчистване на полетата
  function clearFields() {
    document.getElementById("stake").value = "";
    document.getElementById("odd1").value = "";
    document.getElementById("odd2").value = "";
    if (mode === 3) {
      document.getElementById("oddX").value = "";
    }
    resultDiv.innerHTML = "";
  }

  clearBtn.addEventListener("click", clearFields);
});
