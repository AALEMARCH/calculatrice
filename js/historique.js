// fonctionnalité: historique de calcul

// ciblage du boutons de changement de page et redirection
const btnlocationCalculatrice =
  document.getElementsByClassName("btnCalculatrice");

btnlocationCalculatrice[0].addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "index.html";
});

// fonctionnalité dark/light mode
const darkAndLight = () => {
  const date = new Date();
  const hour = date.getHours();

  if (hour > 6 && hour < 20) {
    document.documentElement.style.setProperty("--color-1", "#D1D9E2");
    document.documentElement.style.setProperty("--color-2", "#6F7476");
    document.documentElement.style.setProperty("--color-3", "#D6D6D6");
    document.documentElement.style.setProperty("--color-4", "#313B47");
    document.documentElement.style.setProperty("--color-5", "#F1F1F3");
    document.documentElement.style.setProperty("--color-6", "#F5F5F5");
    document.documentElement.style.setProperty("--color-7", "#000000");
    document.documentElement.style.setProperty("--border", "none");
  } else {
    document.documentElement.style.setProperty("--color-1", "white");
    document.documentElement.style.setProperty("--color-2", "white");
    document.documentElement.style.setProperty("--color-3", "#313B47");
    document.documentElement.style.setProperty("--color-4", "#000000");
    document.documentElement.style.setProperty("--color-5", "#114274");
    document.documentElement.style.setProperty("--color-6", "#313B47");
    document.documentElement.style.setProperty("--color-7", "#000000");
    document.documentElement.style.setProperty("--border", "1px solid #000000");
  }
};
darkAndLight();

// suppression de l'historique de calcul
const btnBottom = document.getElementsByClassName("btnBottom");

btnBottom[0].addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.clear();
  lsHistori.innerHTML = "";
});

// Récupération des donnée du local storage et création d'une div pour chaque résultats
let calculRecovery = JSON.parse(localStorage.getItem("operation"));

let lsHistori = document.querySelector(".lsHistori");
if (calculRecovery != null) {
  let n = 1;
  calculRecovery.forEach((element) => {
    const lsHistori = document.getElementsByClassName("lsHistori");

    let calculItem = document.createElement("div");
    calculItem.setAttribute("class", "lsHistori__divCalcul");

    calculItem.innerHTML = `Calcul n°${n++} : ${element.operation} = ${
      element.resultat
    } `;
    lsHistori[0].appendChild(calculItem);
  });
} else {
  lsHistori.innerHTML = "";
}
