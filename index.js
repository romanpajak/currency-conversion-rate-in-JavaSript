const alertBox = document.getElementById("equal");
const currencyBox = document.getElementById("sum");
const mainBtn = document.querySelector("#btn-calc");
function showAlert(text) {
  document.getElementById("sum").innerHTML = "";
  alertBox.innerHTML = text;
  alertBox.style.color = "red";
  currencyBox.style.display = "none";
}
function restoreFormToDefaultStyle() {
  alertBox.style.color = "black";
  currencyBox.style.display = "block";
}
function loadSpinner() {
  mainBtn.style.color = "white";
  mainBtn.classList.add("button-loading");
}
function unloadSpinner() {
  mainBtn.classList.remove("button-loading");
  mainBtn.style.color = "black";
}
function getCurrencyVal() {
  restoreFormToDefaultStyle();
  const currencyKind = document.getElementById("currencyKind").value;
  const currencyAmount = document.getElementById("currAmount").value;
  if (currencyAmount === "" || currencyAmount <= 0) {
    showAlert("wpisz wartość liczbową powyżej zera");
    document.getElementById("calculator").reset();
    return;
  }
  loadSpinner();
  const url = `https://api.nbp.pl/api/exchangerates/rates/c/${currencyKind.toLocaleLowerCase()}/today/?format=json`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const currencyBid = data.rates[0].bid;
      document.getElementById("sum").innerHTML = (
        Math.round(currencyBid * currencyAmount * 100) / 100
      ).toFixed(2);
      document.getElementById("calculator").reset();
      document.querySelector(
        "#equal"
      ).textContent = `${currencyAmount} ${currencyKind.toLocaleUpperCase()} to`;
      unloadSpinner();
    })
    .catch((err) => showAlert(err));
}
