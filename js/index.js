const buttons = [...document.querySelectorAll(".button")];

const listCode = buttons.map((touche) => touche.dataset.key);

const screen = document.querySelector(".screen_calcul");

const result = document.querySelector(".screen_resultat");

const btnLocationHistorique = document.getElementsByClassName("btnHistorique");

// évenement au clic: chemin vers l'historique de calcul
btnLocationHistorique[0].addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "historique.html";
});

// évenements pour le clavier et au click
document.addEventListener("keydown", (e) => {
  e.preventDefault();
  const valeur = e.keyCode.toString();
  calculatrice(valeur);
});

document.addEventListener("click", (e) => {
  e.preventDefault();
  const valeur = e.target.dataset.key;
  calculatrice(valeur);
});

// fonction de vérification du dernier caractère de l'operation
const verifLastCaract = (valeur) => {
  const str = screen.textContent;
  let lastC = str.charAt(str.length - 1);
  if (
    lastC != "*" &&
    lastC != "+" &&
    lastC != "-" &&
    lastC != "/" &&
    lastC != "." &&
    lastC != "(" &&
    lastC != ""
  ) {
    indexKeyCode = listCode.indexOf(valeur);
    touche = buttons[indexKeyCode];
    screen.textContent += touche.innerHTML;
  }
};

// fonction de gestion des parentheses ouvrantes et fermantes
const gestionParenthese = () => {
  let screenContent = screen.textContent;
  screenContent = [...screenContent];

  let findOpenP = screenContent.filter(
    (screenContent) => screenContent === "("
  );

  let findCloseP = screenContent.filter(
    (screenContent) => screenContent === ")"
  );

  for (let i = findCloseP.length; i < findOpenP.length; i++) {
    if (findCloseP.length < findOpenP.length) {
      screen.textContent += ")";
    }
  }
};

// fonction d'évaluation des opérations
const calculatrice = (valeur) => {
  const str = screen.textContent;
  let lastC = str.charAt(str.length - 1);

  if (listCode.includes(valeur)) {
    switch (valeur) {
      case "8":
        let textScreen = screen.textContent;
        let newScreen = textScreen.substring(0, textScreen.length - 1);
        screen.textContent = newScreen;
        break;
      case "46":
        screen.textContent = "";
        result.textContent = "";
        break;
      case "53":
        if (lastC != ".") {
          if (
            lastC === "" ||
            lastC === "(" ||
            lastC === "/" ||
            lastC === "*" ||
            lastC === "-" ||
            lastC === "+"
          ) {
            indexKeyCode = listCode.indexOf(valeur);
            touche = buttons[indexKeyCode];
            screen.textContent += touche.innerHTML;
          } else if (lastC != "/" || lastC != "-" || lastC != "+") {
            indexKeyCode = listCode.indexOf(valeur);
            touche = buttons[indexKeyCode];
            screen.textContent += `*${touche.innerHTML}`;
          }
        }
        break;
      case "106":
        verifLastCaract(valeur);
        break;
      case "107":
        verifLastCaract(valeur);
        break;
      case "109":
        verifLastCaract(valeur);
        break;
      case "110":
        if (
          lastC === "0" ||
          lastC === "1" ||
          lastC === "2" ||
          lastC === "3" ||
          lastC === "4" ||
          lastC === "5" ||
          lastC === "6" ||
          lastC === "7" ||
          lastC === "8" ||
          lastC === "9"
        ) {
          indexKeyCode = listCode.indexOf(valeur);
          touche = buttons[indexKeyCode];
          screen.textContent += touche.innerHTML;
        }
        break;
      case "111":
        verifLastCaract(valeur);
        break;
      case "187":
        if (
          lastC != "/" &&
          lastC != "*" &&
          lastC != "-" &&
          lastC != "+" &&
          lastC != "." &&
          lastC != ""
        ) {
          gestionParenthese();

          const calcul = eval(screen.textContent);
          result.textContent = calcul.toLocaleString();
          screen.textContent = `(${screen.textContent})`;

          let tabl = {
            operation: screen.textContent,
            resultat: calcul,
          };

          let operationLocalStorage = JSON.parse(
            localStorage.getItem("operation")
          );

          if (operationLocalStorage) {
            operationLocalStorage.push(tabl);
            localStorage.setItem(
              "operation",
              JSON.stringify(operationLocalStorage)
            );
          } else {
            operationLocalStorage = [];
            operationLocalStorage.push(tabl);
            localStorage.setItem(
              "operation",
              JSON.stringify(operationLocalStorage)
            );
          }
        }
        break;
      case "219":
        if (
          lastC === ")" ||
          (lastC != "*" &&
            lastC != "+" &&
            lastC != "-" &&
            lastC != "/" &&
            lastC != ".")
        ) {
          indexKeyCode = listCode.indexOf(valeur);
          touche = buttons[indexKeyCode];
          screen.textContent += touche.innerHTML;
        }
        break;
      default:
        if (lastC === ")") {
          indexKeyCode = listCode.indexOf(valeur);
          touche = buttons[indexKeyCode];
          screen.textContent += `*${touche.innerHTML}`;
        } else {
          indexKeyCode = listCode.indexOf(valeur);
          touche = buttons[indexKeyCode];
          screen.textContent += touche.innerHTML;
        }
    }
  } else if (valeur === "13") {
    if (
      lastC != "/" &&
      lastC != "*" &&
      lastC != "-" &&
      lastC != "+" &&
      lastC != "." &&
      lastC != ""
    ) {
      gestionParenthese();

      const calcul = eval(screen.textContent);
      result.textContent = calcul.toLocaleString();
      screen.textContent = `(${screen.textContent})`;

      let tabl = {
        operation: screen.textContent,
        resultat: calcul,
      };

      let operationLocalStorage = JSON.parse(localStorage.getItem("operation"));

      if (operationLocalStorage) {
        operationLocalStorage.push(tabl);
        localStorage.setItem(
          "operation",
          JSON.stringify(operationLocalStorage)
        );
      } else {
        operationLocalStorage = [];
        operationLocalStorage.push(tabl);
        localStorage.setItem(
          "operation",
          JSON.stringify(operationLocalStorage)
        );
      }
    }
  }
};

// Affichage des erreurs
window.addEventListener("error", (e) => {
  alert("Une erreur est survenue dans votre calcul : " + e.message);
});

// faire une fonction pour les different boutton egal. Optiumisation du code

// Revoir css pour ameliorer la lisibilité de l'historique

// Commenter mon historique.js

// Implémenter une fonctionnalité de calcul de devise avec une API
