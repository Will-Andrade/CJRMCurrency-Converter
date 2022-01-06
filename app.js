/*
  - Quando a página for carregada: 
    - O parágrafo com data-js="converted-value" deve exibir o resultado da 
      conversão de 1 USD para 1 BRL;
    - Quando um novo número for inserido no input com 
      data-js="currency-one-times", o parágrafo do item acima deve atualizar 
      seu valor;
    - O parágrafo com data-js="conversion-precision" deve conter a conversão 
      apenas x1. Exemplo: 1 USD = 5.0615 BRL;
    - O conteúdo do parágrafo do item acima deve ser atualizado à cada 
      mudança nos selects;
    - O conteúdo do parágrafo data-js="converted-value" deve ser atualizado à
      cada mudança nos selects e/ou no input com data-js="currency-one-times";
    - Para que o valor contido no parágrafo do item acima não tenha mais de 
      dois dígitos após o ponto, você pode usar o método toFixed: 
      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
*/

const currencyOne = document.querySelector('[data-js="currency-one"]');
const currencyTwo = document.querySelector('[data-js="currency-two"]');
const wantedAmount = document.querySelector('[data-js="currency-one-times"]');
const convertedValue = document.querySelector('[data-js="converted-value"]');
const conversionPrecision = document
  .querySelector('[data-js="conversion-precision"]');

const saveCurrencyInfoOnLocalStorage = async () => {
  const { supported_codes: currencyArray } = await getCurrencyData();
  
  const currencyArrayJSON = JSON.stringify(currencyArray);
  localStorage.setItem('availableCurrencies', currencyArrayJSON);
};

const createSelectOptionsAndInsertThemIntoDOM = () => {
  const currencies = JSON.parse(localStorage.getItem('availableCurrencies'));

  currencies.forEach(([initials]) => {
    const option = document.createElement('option');

    if (initials === 'USD') {
      option.setAttribute('selected', 'selected');
      option.textContent = initials;
      currencyOne.insertAdjacentElement('afterbegin', option);
    } else {
      option.textContent = initials;
      currencyOne.insertAdjacentElement('afterbegin', option);
    }
  });

  currencies.forEach(([initials]) => {
    const option = document.createElement('option');

    if (initials === 'BRL') {
      option.setAttribute('selected', 'selected');
      option.textContent = initials;
      currencyTwo.insertAdjacentElement('afterbegin', option);
    } else {
      option.textContent = initials;
      currencyTwo.insertAdjacentElement('afterbegin', option);
    }
  });
}

if (localStorage.getItem('availableCurrencies')) {
  console.log('As informações das moedas existem!');
} else {
  console.log('Informações não existem!');
  saveCurrencyInfoOnLocalStorage();
  createSelectOptionsAndInsertThemIntoDOM();
}


createSelectOptionsAndInsertThemIntoDOM();

const saveConversionRateOnLocalStorage = async () => {
  const { base_code: option1, target_code: option2, conversion_rate: rate  } = 
    await getConversionData(currencyOne.value, currencyTwo.value, wantedAmount.value);

  localStorage.setItem(`${option1}to${option2}`, rate);
}

const getConversionRate = () => {
  const conversionRate = JSON.parse(localStorage.getItem(`${currencyOne.value}to${currencyTwo.value}`));

  if (conversionRate) {
    return conversionRate;
  }

  saveConversionRateOnLocalStorage();
}

getConversionRate()

const convertCurrency = () => {
  const currentRate = getConversionRate();
  
  convertedValue.textContent = (wantedAmount.value * currentRate).toFixed(2)
}

const showPrecision = () => {
  const currentRate = getConversionRate();

  conversionPrecision.textContent = `1 ${currencyOne.value} = ${currentRate} ${currencyTwo.value}`
}

convertCurrency()
showPrecision();

wantedAmount.addEventListener('input', () => {
  convertCurrency()
})
