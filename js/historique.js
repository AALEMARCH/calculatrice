const btnlocationCalculatrice =
  document.getElementsByClassName("btnCalculatrice");

btnlocationCalculatrice[0].addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "index.html";
});

const btnBottom = document.getElementsByClassName("btnBottom");

btnBottom[0].addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.clear();
  lsHistori.innerHTML = "";
});

let calculRecovery = JSON.parse(localStorage.getItem("operation"));

let lsHistori = document.querySelector(".lsHistori");
if (calculRecovery != null) {
  let n = 1;
  calculRecovery.forEach((element) => {
    const lsHistori = document.getElementsByClassName("lsHistori");

    let calculItem = document.createElement("div");

    calculItem.innerHTML = `Calcul n°${n++} : ${element.operation} = ${
      element.resultat
    } `;
    lsHistori[0].appendChild(calculItem);
  });
} else {
  lsHistori.innerHTML = "";
}
