export {};

const currencyEle_one = <HTMLSelectElement>(
  document.getElementById("currency-one")
);
const amountEle_one = <HTMLInputElement>document.getElementById("amount-one");

const currencyEle_two = <HTMLSelectElement>(
  document.getElementById("currency-two")
);
const amountEle_two = <HTMLInputElement>document.getElementById("amount-two");

const rateEle = document.getElementById("rate");
const swapBth = document.getElementById("swap-btn");

/**
 *
 * Fetch exchange rates and updates the DOM
 */
const calculate = () => {
  const currency_one = currencyEle_one.value;
  const currency_two = currencyEle_two.value;

  interface responseType {
    site: string;
    docs: string;
    terms: string;
    base: string;
    date: string;
    time_last_updated: number;
    rates: {};
  }
  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then((res) => res.json())
    .then((data: responseType) => {
      const rate = data.rates[currency_two];

      rateEle.innerHTML = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountEle_two.value = (+amountEle_one.value * rate).toFixed(2);
    });
};

//Event Listners
currencyEle_one.addEventListener("change", calculate);
amountEle_one.addEventListener("input", calculate);
currencyEle_two.addEventListener("change", calculate);
amountEle_two.addEventListener("input", calculate);

swapBth.addEventListener("click", () => {
  const temp = currencyEle_one.value;
  currencyEle_one.value = currencyEle_two.value;
  currencyEle_two.value = temp;
  calculate();
});

calculate();
