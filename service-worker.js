// app.js
document.addEventListener("DOMContentLoaded", function() {
  const calcBtn = document.getElementById("calcBtn");
  const clearBtn = document.getElementById("clearBtn");
  const resultDiv = document.getElementById("result");

  // Функция за калкулиране на арбитражната възможност при 3 изхода (1, X, 2)
  function calculateSurebet() {
    // Извличане на стойностите
    const stake = parseFloat(document.getElementById("stake").value);
    const odd1 = parseFloat(document.getElementById("odd1").value);
    const oddX = parseFloat(document.getElementById("oddX").value);
    const odd2 = parseFloat(document.getElementById("odd2").value);

    // Проверка, дали всички полета са попълнени
    if (isNaN(stake) || isNaN(odd1) || isNaN(oddX) || isNaN(odd2)) {
      resultDiv.innerHTML = "<p style='color:red;'>Моля, попълнете всички полета.</p>";
      return;
    }

    // Изчисляване на сбора от обратните стойности
    const inv1 = 1 / odd1;
    const invX = 1 / oddX;
    const inv2 = 1 / odd2;
    const total = inv1 + invX + inv2;

    // Ако има арбитраж (total < 1), изчисляваме нужните залози
    if (total < 1) {
      const bet1 = (stake * inv1) / total;
      const betX = (stake * invX) / total;
      const bet2 = (stake * inv2) / total;
      // Изчисляваме печалбата от първия залог (очакваният резултат)
      const ret = bet1 * odd1;
      const profit = ret - stake;
      
      resultDiv.innerHTML = `
        <p style="color:green;">Сигурен залог! Арбитражна възможност съществува.</p>
        <p>Залажи <strong>${bet1.toFixed(2)} лв</strong> на 1</p>
        <p>Залажи <strong>${betX.toFixed(2)} лв</strong> на X</p>
        <p>Залажи <strong>${bet2.toFixed(2)} лв</strong> на 2</p>
        <p>Очаквана печалба: <strong>${profit.toFixed(2)} лв</strong></p>
      `;
    } else {
      resultDiv.innerHTML = `<p style="color:red;">Няма арбитражна възможност при тези коефициенти.</p>`;
    }
  }

  // Добавяне на слушател за бутона "Изчисли"
  calcBtn.addEventListener("click", calculateSurebet);

  // Функция за изчистване на полетата
  function clearFields() {
    document.getElementById("stake").value = "";
    document.getElementById("odd1").value = "";
    document.getElementById("oddX").value = "";
    document.getElementById("odd2").value = "";
    resultDiv.innerHTML = "";
  }

  // Добавяне на слушател за бутона "Изчисти"
  clearBtn.addEventListener("click", clearFields);
});
