const APIKey = '059ea44b9d831c4224dc856b';
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

const getConversionData = (currencyOne, currencyTwo, amount) => 
  fetchData(getConversionURL(currencyOne, currencyTwo, amount));

const getCurrencyData = () => fetchData(getCurrencyURL());
