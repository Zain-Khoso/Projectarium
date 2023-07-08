"use strict";

// DOM Selections
const InitialCurrency = document.getElementById("initial-currency");
const ChangoToCurrency = document.getElementById("change-to-currency");
const InputAmount = document.getElementById("input-amount");
const OutputAmount = document.getElementById("output-amount");
const CalculateBtn = document.getElementById("calculate-btn");

// Functions
const get_a_option_tag = function (value, textContent) {
    const Element = document.createElement("option");
    Element.value = value;
    Element.textContent = textContent;

    return Element;
};

const get_conversion_rates = async function (base_currency) {
    // Getting the exchange rates.
    const response = await fetch(
        `https://v6.exchangerate-api.com/v6/c1e224655620492a591ec645/latest/${base_currency}`
    );
    const data = await response.json();

    const conversion_rates = data["conversion_rates"];
    // const conversion_rates = [];

    return conversion_rates;
};

// IIFE to load the page.
(async function () {
    // Getting the country names / currency codes list.
    const local_response = await fetch("/assets/data/currency_codes.json");
    const currency_codes = await local_response.json();

    for (let code in currency_codes) {
        const Element1 = get_a_option_tag(code, currency_codes[code]);
        InitialCurrency.appendChild(Element1);

        const Element2 = get_a_option_tag(code, currency_codes[code]);
        ChangoToCurrency.appendChild(Element2);
    }
})();

CalculateBtn.addEventListener("click", async function () {
    const BaseCurrency = InitialCurrency.value;
    const ExchangeAmount = InputAmount.valueAsNumber;
    const ExchangeCurrency = ChangoToCurrency.value;
    const ConversionRates = await get_conversion_rates(BaseCurrency);
    const ConversionRate = ConversionRates[ExchangeCurrency];
    const TotalExchangedAmount = ExchangeAmount * ConversionRate;

    OutputAmount.value = TotalExchangedAmount.toFixed(2);
});
