const currencyOne = document.querySelector('[data-js="currency-one"]');
const currencyTwo = document.querySelector('[data-js="currency-two"]');
const amountToConvert = document.querySelector('[data-js="currency-one-times"]');
const convertedValue = document.querySelector('[data-js="converted-value"]');
const conversionPrecision = document.querySelector('[data-js="conversion-precision"]');

//TODO: Futuro - Para não fazer uma requisição sempre para isso, salvar as moedas no localStorage!
const populateSelects = async () => {
  const { supported_codes: availableCurrencies } = await getCurrencyData();

  availableCurrencies.forEach(([initials]) => {
    const option = document.createElement('option');

    if (initials === 'USD') {
      option.setAttribute('selected', 'selected');
      option.textContent = initials;
    } else {
      option.textContent = initials;
    }

    currencyOne.insertAdjacentElement('afterbegin', option);
  });

  availableCurrencies.forEach(([initials]) => {
    const option = document.createElement('option');

    if (initials === 'BRL') {
      option.setAttribute('selected', 'selected');
      option.textContent = initials;
    } else {
      option.textContent = initials;
    }

    currencyTwo.insertAdjacentElement('afterbegin', option);
  });

  showConvertedValue();
};

populateSelects();

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

amountToConvert.addEventListener('input', () => {
  showConvertedValue();
})
