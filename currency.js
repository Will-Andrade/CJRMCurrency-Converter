const APIKey = '8050f7e7b7fcf23dd8b046ea';
const baseURL = 'https://v6.exchangerate-api.com/v6';

const getConversionURL = (currencyOne, currencyTwo, amount) => 
  `${baseURL}/${APIKey}/pair/${currencyOne}/${currencyTwo}/${amount}`;

const getCurrencyURL = () => `${baseURL}/${APIKey}/codes`;

const fetchData = async endpoint => {
  try {
    const response = await fetch(endpoint);
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const getConversionData = (currencyOne, currencyTwo, amountToConvert) => 
  fetchData(getConversionURL(currencyOne, currencyTwo, amountToConvert));

const getCurrencyData = () => fetchData(getCurrencyURL());
