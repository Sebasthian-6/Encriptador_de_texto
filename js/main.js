let textArea = document.querySelector("#text");
let buttonEncrypt = document.querySelector(".btn-encrypt");
let buttonDecrypt = document.querySelector(".btn-decrypt");
let buttonReset = document.querySelector(".btn-reset");
let viewDescription = document.querySelector(".content-view");
let textView = document.querySelector(".textResult");
let percentNumber = document.querySelector(".modal-percent");
let modalBtn = document.querySelector("#modal-btn");
let modal = document.querySelector(".modal");
let load = document.querySelector(".load-text");
let btnCopy = document.querySelector(".copy");

btnCopy.style.display = "none";

modalBtn.addEventListener("click", () => {
    let percent = 1;
    modalBtn.style.display = "none";
    load.style.display = "block";
    let countPercent = setInterval(() => {
    percentNumber.textContent = percent + "%";
    percent++;
    if (percent === 102) {
        clearInterval(countPercent);
        modal.style.display = "none";
    }
    }, 50);
    percentNumber.innerHTML = countPercent;
});

buttonDecrypt.addEventListener("click", () => {
    if (validation()) {
}
});

buttonEncrypt.addEventListener("click", () => {
    if (validation()) {
    encryptText(textArea.value);
}
});

const encryptText = (text) => {
    btnCopy.style.display = "block";
        decryptText(textArea.value);
viewDescription.style.display = "none";
    let encryptedText = "";
    for (let i = 0; i <= text.length; i++) {
    switch (text[i]) {
    case "e":
        encryptedText += "enter";
        break;
    case "i":
        encryptedText += "imes";
        break;
        case "a":
        encryptedText += "ai";
        break;
        case "o":
        encryptedText += "ober";
        break;
        case "u":
        encryptedText += "ufat";
        break;
        default:
        encryptedText += text.charAt(i);
    }
  }
  textView.innerHTML = encryptedText;
  textArea.value = "";
};

const decryptText = (text) => {
  let decryptText = "";
  viewDescription.style.display = "none";
  btnCopy.style.display = "block";
  decryptText = text
    .replace(/ai/g, "a")
    .replace(/enter/g, "e")
    .replace(/imes/g, "i")
    .replace(/ober/g, "o")
    .replace(/ufat/g, "u");

  textView.innerHTML = decryptText;
  textArea.value = "";
};

const validation = () => {
  let regex = /^[a-z\s]*$/;
  let textValue = textArea.value;

  if (textValue.trim() === "") {
    showPopup("El campo no puede estar vacío");
  } else if (!regex.test(textValue)) {
    showPopup("Solo puede contener letras minusculas sin acento y espacios");
  } else {
    return textValue;
  }
};

btnCopy.addEventListener("click", () => {
  copyText();
});

const copyText = () => {
  const textToCopy = textView.textContent;
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      showPopup("Texto copiado!");
    })
    .catch((err) => {
      console.error("Hubo un error al copiar el texto", err);
    });
};

function showPopup(message) {
  const popup = document.querySelector("#popup");
  const popupContent = document.querySelector("#popupContent");
  popupContent.textContent = message;
  popup.classList.add("show");
  setTimeout(() => {
    popup.classList.remove("show");
  }, 3000);
}