const currencyOne = document.querySelector('[data-js="currency-one"]');
const currencyTwo = document.querySelector('[data-js="currency-two"]');
const amountToConvert = document
  .querySelector('[data-js="currency-one-times"]');
const convertedValue = document.querySelector('[data-js="converted-value"]');
const conversionPrecision = document
  .querySelector('[data-js="conversion-precision"]');

const createCurrencyOptions = (currencies, wantedCurrency, container) => {
  currencies.forEach(([initials]) => {
    const option = document.createElement('option');

    if (initials === wantedCurrency) {
      option.setAttribute('selected', 'selected');
      option.textContent = initials;
    } else {
      option.textContent = initials;
    }

    container.insertAdjacentElement('afterbegin', option);
  });
};

const populateSelects = async () => {
  const { supported_codes: availableCurrencies } = await getCurrencyData();

  createCurrencyOptions(availableCurrencies, 'USD', currencyOne);
  createCurrencyOptions(availableCurrencies, 'BRL', currencyTwo);

  showConvertedValue();
};

const showConversionRate = conversionRate => {
  showConvertedValue();
  conversionPrecision.textContent = conversionRate;
}

const showConvertedValue = async () => {
  const { conversion_result: result, conversion_rate: conversionRate } = 
    await getConversionData(currencyOne.value, currencyTwo.value, amountToConvert.value);

  showConversionRate(conversionRate);
  
  convertedValue.textContent = result.toFixed(2);
};

populateSelects();

amountToConvert.addEventListener('input', () => {
  showConvertedValue();
});
