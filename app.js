/*
  07
  - Você poderá modificar a marcação e estilos da aplicação depois. No momento, 
    concentre-se em executar o que descreverei abaixo;
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
    - Para obter as moedas com os valores já convertidos, use a Exchange rate 
      API: https://www.exchangerate-api.com/;
      - Para obter a key e fazer requests, você terá que fazer login e escolher
        o plano free. Seus dados de cartão de crédito não serão solicitados.
  
  PS: o desafio aqui é você implementar essa aplicação sozinho(a) e enviá-la 
  para análise antes de ver as próximas aulas, ok? =)
*/

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
};

populateSelects();
