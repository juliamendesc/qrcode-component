/*
 ** QRCode.js
 ** http://davidshimjs.github.io/qrcodejs/
 ** Imported the min version in my HTML scripts section.
 */

/* https://stackoverflow.com/questions/161738/what-is-the-best-regular-expression-to-check-if-a-string-is-a-valid-url */

const urlValidationRegex =
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

const qrElement = document.getElementById("qrcode");
const customQrCodeElement = document.getElementById("customQrCode");
const textContainerInput = document.getElementById("textContainerInput");

let qrUrl = "";

// const addClickListener = document.addEventListener("click", clickListener);

const qrCode = new QRCode(qrElement, {
  text: qrUrl,
  width: 150,
  height: 100,
  colorDark: "#2979ff",
  colorLight: "#ffffff",
  correctLevel: QRCode.CorrectLevel.H,
});

function createNewQrCode(url) {
  qrCode.clear(); // Clear the previous QR code
  qrCode.makeCode(url); // Generate a new QR code with the new URL
}

function handleBadUrl() {
  errorMessage.innerHTML = "Please enter a valid URL";
  errorMessage.style.display = "block";
  setTimeout(() => {
    errorMessage.style.display = "none";
  }, 3000);
}

const clickListener = document.addEventListener("click", (event) => {
  if (event.target.id !== "generateBtn") return;

  if (
    !urlValidationRegex.test(textContainerInput.value) ||
    (textContainerInput.value === "" &&
      event.target.id === textContainerInput.id)
  ) {
    handleBadUrl();
    return;
  }

  qrUrl = textContainerInput.value;

  createNewQrCode(qrUrl);
  resetInput();
});

const enterListener = document.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  if (event.target.id !== textContainerInput.id) return;

  if (
    !urlValidationRegex.test(qrUrl) ||
    (textContainerInput.value === "" &&
      event.target.id === textContainerInput.id)
  ) {
    handleBadUrl();
    return;
  }

  qrUrl = textContainerInput.value;
  createNewQrCode(qrUrl);
  resetInput();
});

function resetInput() {
  textContainerInput.value = "";
}
