let CoinInput = document.querySelector(".coin-input");
let Btn = document.querySelector(".main__content-btn");
let Result = document.querySelector(".main__content-result");
let ErrorText = document.querySelector(".main__content-error");
let Footer = document.querySelector(".footer");
let Modal = document.querySelector(".modal");
let CloseModal = document.querySelector(".close");

let title_elem = document.querySelector(".modal__content-title");
let text_elem = document.querySelector(".modal__content-text");
let contact_phone_elem = document.querySelector(".contact__phone");
let contact_tg_elem = document.querySelector(".contact__tg");

let title = "Hi friend!";
let text =
  "My name is Rashid and I am the author and developer of this site :) I'm studying at the Sergeli branch in ENG447, come on over and visit, haha xD If you have any ideas for improving the site, I look forward to hearing from you, or if you just want to chat, I'll leave ways to contact me below!";
let contact_phone = "+998 90 998 27 64";
let contact_tg = "t.me/rashaprogramming";
let delay = 100;

var timerIDs = [];
var originalSetTimeout = window.setTimeout;

window.setTimeout = function (callback, delay) {
  var timerID = originalSetTimeout(callback, delay);
  timerIDs.push(timerID);
  return timerID;
};

function stopAllTimers() {
  for (var i = 0; i < timerIDs.length; i++) {
    clearTimeout(timerIDs[i]);
  }
  timerIDs = [];
}

let resultUSD = 0;
let resultUZS = 0;

Btn.addEventListener("click", async function () {
  var inputValue = CoinInput.value;

  if (!isNaN(inputValue) && inputValue !== "") {
    await fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => response.json())
      .then((data) => {
        const usdRate = data.rates.UZS;
        myCalc(inputValue, usdRate);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    Result.innerHTML = `<b>${formatNumber(
      inputValue
    )} INSE-coins will be equal to ${resultUSD.toLocaleString(
      "en-US"
    )} USD or ${formatNumber(
      resultUZS
    )} UZS</b><br><p style="opacity: 30%;">This calculation is an approximation, so do not take it seriously. Thank you!</p>`;
    ErrorText.textContent = "";
  } else {
    Result.textContent = "";
    ErrorText.innerHTML = "<b>Invalid input!</b>";
  }
});

Footer.addEventListener("click", function () {
  Modal.classList.add("active");

  let print_text = function (text, elem, delay) {
    if (text.length > 0) {
      elem.innerHTML += text[0];
      setTimeout(function () {
        print_text(text.slice(1), elem, delay);
      }, delay);
    }
  };

  print_text(title, title_elem, delay);
  setTimeout(() => {
    print_text(text, text_elem, delay - 50);
  }, 1000);
  setTimeout(() => {
    print_text(contact_phone, contact_phone_elem, delay);
    print_text(contact_tg, contact_tg_elem, delay);
  }, 19000);
});

CloseModal.addEventListener("click", function () {
  Modal.classList.remove("active");
  title_elem.innerHTML = "";
  text_elem.innerHTML = "";
  contact_phone_elem.innerHTML = "";
  contact_tg_elem.innerHTML = "";

  setTimeout(stopAllTimers, 1);
});

function myCalc(inpv, usdRate) {
  resultUZS = (inpv * 440).toFixed(0);
  resultUSD = (resultUZS / usdRate).toFixed(2);
}

function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
