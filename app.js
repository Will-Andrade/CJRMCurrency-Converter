const currencyContainer = document.querySelector('[data-js="currency-container"]');
const currencyOne = document.querySelector('[data-js="currency-one"]');
const currencyTwo = document.querySelector('[data-js="currency-two"]');
const currencyInput = document.querySelector('[data-js="currency-one-times"]');
const convertedValue = document.querySelector('[data-js="converted-value"]');
const conversionRate = document.querySelector('[data-js="conversion-rate"]');

const APIKey = '8050f7e7b7fcf23dd8b046ea';

const generateErrorMessage = (errType, customMessage) => ({
  "unsupported-code": 'Currency code not supported!',
  "malformed-request": 'The request was malformed. Please, try again later!',
  "invalid-key": 'The API key is invalid. Please, try again later!',
  "inactive-account": 'The account used for the API is inactive. Please, contact support!',
  "quota-reached": 'The API has reached the maxium request quota. Please, check the available plans at https://www.exchangerate-api.com/#pricing'
})[errType] || customMessage;

const getExchangeURL = currency => 
  `https://v6.exchangerate-api.com/v6/${APIKey}/latest/${currency}`;

const fetchExchangeData = async currency => {
  try {
    const response = await fetch(getExchangeURL(currency));
    const conversionData = await response.json();

    if (!response.ok) {
      throw new Error(generateErrorMessage(conversionData['error-type'], null));
    }

    return await conversionData;
  } catch (err) {
    alert (err);
  }
};

const state = (() => {
  let exchangeRate = {};
  return {
    getExchangeRate: () => exchangeRate,
    setExchangeRate: newExchangeRate => {
      if (!newExchangeRate.conversion_rates) {
        alert(generateErrorMessage(null, 'The object needs a conversion_rates property!'));
        return
      }
      
      exchangeRate = newExchangeRate;
      return exchangeRate;
    }
  }
})();

const getOptions = selectedCurrency => currenciesArr => currenciesArr
  .map(currency => 
    `<option ${selectedCurrency === currency ? 'selected' : ''}>${currency}</option>`
  ).join('');

const insertOptionsIntoDOM = optionsArr => {
  currencyOne.innerHTML = getOptions('USD')(optionsArr);
  currencyTwo.innerHTML = getOptions('BRL')(optionsArr);
};

const insertConversionDataIntoDOM = conversion_rates => {
  const formattedValue = conversion_rates[currencyTwo.value].toFixed(2);
  convertedValue.textContent = formattedValue;
  conversionRate.textContent = `1 ${currencyOne.value} = ${formattedValue} ${currencyTwo.value}`;
};

const showUSDToBRLExchange = ({ conversion_rates }) => {
  insertOptionsIntoDOM(Object.keys(conversion_rates));
  insertConversionDataIntoDOM(conversion_rates);
};

const initHandler = async () => {
  const exchangeRate = state.setExchangeRate(await fetchExchangeData('USD'));
  if (exchangeRate && exchangeRate.conversion_rates) showUSDToBRLExchange(exchangeRate);
};

const renderExchangedResult = e => {
  const { conversion_rates } = state.getExchangeRate();
  const exchangedResult = e.target.value * conversion_rates[currencyTwo.value];
  convertedValue.textContent = exchangedResult.toFixed(2);
};

const handleCurrencyChange = async ({ target }) => {
  const changedCurrencyOne = target === currencyOne;
  const changedCurrencyTwo = target === currencyTwo;
  
  if (changedCurrencyOne) {
    const { conversion_rates } = 
      state.setExchangeRate(await fetchExchangeData(currencyOne.value));
    insertConversionDataIntoDOM(conversion_rates);
    return
  }
  
  if (changedCurrencyTwo) {
    const { conversion_rates } = state.getExchangeRate();
    insertConversionDataIntoDOM(conversion_rates);
  };
};

initHandler();
currencyInput.addEventListener('input', renderExchangedResult);
currencyContainer.addEventListener('input', handleCurrencyChange);
