"use strict";
exports.__esModule = true;
var currencyEle_one = (document.getElementById("currency-one"));
var amountEle_one = document.getElementById("amount-one");
var currencyEle_two = (document.getElementById("currency-two"));
var amountEle_two = document.getElementById("amount-two");
var rateEle = document.getElementById("rate");
var swapBth = document.getElementById("swap-btn");
/**
 *
 * Fetch exchange rates and updates the DOM
 */
var calculate = function () {
    var currency_one = currencyEle_one.value;
    var currency_two = currencyEle_two.value;
    fetch("https://api.exchangerate-api.com/v4/latest/" + currency_one)
        .then(function (res) { return res.json(); })
        .then(function (data) {
        var rate = data.rates[currency_two];
        rateEle.innerHTML = "1 " + currency_one + " = " + rate + " " + currency_two;
        amountEle_two.value = (+amountEle_one.value * rate).toFixed(2);
    });
};
//Event Listners
currencyEle_one.addEventListener("change", calculate);
amountEle_one.addEventListener("input", calculate);
currencyEle_two.addEventListener("change", calculate);
amountEle_two.addEventListener("input", calculate);
swapBth.addEventListener("click", function () {
    var temp = currencyEle_one.value;
    currencyEle_one.value = currencyEle_two.value;
    currencyEle_two.value = temp;
    calculate();
});
calculate();
