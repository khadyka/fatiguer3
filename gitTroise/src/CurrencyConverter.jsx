import axios from 'axios';
import { useEffect, useState } from 'react';

function CurrencyConverter() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [conversionRate, setConversionRate] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);

  const API_KEY = 'YOUR_API_KEY'; // Remplacez par votre clé d'API

  useEffect(() => {
    if (amount === '') {
      setConvertedAmount(0);
      return;
    }

    axios
      .get(`https://free.currencyconverterapi.com/api/v6/convert?q=${fromCurrency}_${toCurrency}&apiKey=${API_KEY}`)
      .then(response => {
        const rate = response.data.results[`${fromCurrency}_${toCurrency}`].val;
        setConversionRate(rate);
        setConvertedAmount(amount * rate);
      })
      .catch(error => {
        console.error('Error fetching conversion rate:', error);
      });
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div>
      <h1>Convertisseur de Devises</h1>
      <label>
        Montant:
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
      </label>
      <br />
      <label>
        De:
        <select value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          {/* Ajoutez d'autres devises au besoin */}
        </select>
      </label>
      <br />
      <label>
        Vers:
        <select value={toCurrency} onChange={e => setToCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          {/* Ajoutez d'autres devises au besoin */}
        </select>
      </label>
      <br />
      <p>{amount} {fromCurrency} équivaut à {convertedAmount.toFixed(2)} {toCurrency}</p>
    </div>
  );
}

export default CurrencyConverter;
