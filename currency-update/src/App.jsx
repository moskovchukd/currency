import './App.css';
import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const App = () => {
  const [tableA, setTableA] = useState(null);
  const [tableC, setTableC] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(1);
  const [calculatedCurrency, setCalculatedCurrency] = useState("USD");

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


  // List of required currencies
  const requiredCurrencies = ["USD", "EUR", "CHF", "GBP", "JPY"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch table C (buy/sell rates)
        const responseCTable = await fetch('https://api.nbp.pl/api/exchangerates/tables/c/');
        const cTableData = await responseCTable.json();
        
        // Fetch table A (average rates)
        const responseATable = await fetch('https://api.nbp.pl/api/exchangerates/tables/a/');
        const aTableData = await responseATable.json();
        
        setTableC(cTableData[0]);
        setTableA(aTableData[0]);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to fetch historical data for a specific currency
  const fetchHistoricalData = async (currencyCode) => {
    try {
   
      const response = await fetch(`https://api.nbp.pl/api/exchangerates/rates/a/${currencyCode}/last/10/`);
      const data = await response.json();
      
   
      const formattedData = data.rates.map(rate => ({
        date: rate.effectiveDate,
        value: rate.mid
      }));
      
      setHistoricalData(formattedData);
      setSelectedCurrency(currencyCode);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching historical data:", error);
    }
  };

  // Function to filter required currencies from table C
  const getFilteredCurrenciesC = () => {
    if (!tableC || !tableC.rates) return [];
    return tableC.rates.filter(rate => requiredCurrencies.includes(rate.code));
  };

  // Function to calculate exchange for entered amount
  const calculateExchange = (amount, currencyCode) => {
    if (!tableC || !tableC.rates) return null;
    
    const currency = tableC.rates.find(rate => rate.code === currencyCode);
    if (!currency) return null;
    
    return {
      buy: (amount * currency.bid).toFixed(2),
      sell: (amount * currency.ask).toFixed(2)
    };
  };

  // Modal component for historical chart
  const HistoricalChart = () => {
    if (!historicalData || !selectedCurrency) return null;
    
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4">
        <div className="bg-white   rounded-lg p-6 w-full max-w-3xl">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">
              {selectedCurrency} - Last 10 Average Rates
            </h2>
            <button 
              onClick={() => setShowModal(false)}
              className="close-btn"
            >
              ✕
            </button>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => {
                    const d = new Date(date);
                    return `${d.getDate()}-${d.getMonth() + 1}`;
                  }}
                />
                <YAxis 
                  domain={['auto', 'auto']} 
                  tickFormatter={(value) => value.toFixed(2)}
                />
                <Tooltip 
                  formatter={(value) => [value.toFixed(4), "Exchange rate"]}
                  labelFormatter={(label) => new Date(label).toLocaleDateString()}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#8884d8" 
                  name={`${selectedCurrency} to PLN`} 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Error: {error.message}</div>;
  }

  const filteredCurrencies = getFilteredCurrenciesC();
  const calculationResult = calculateExchange(amount, calculatedCurrency);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">NBP Currency Exchange Rates</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Current Exchange Rates</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Currency</th>
                <th className="border p-2">Code</th>
                <th className="border p-2">Buy Rate</th>
                <th className="border p-2">Sell Rate</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCurrencies.map((rate, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-2">{capitalizeFirstLetter(rate.currency)}</td>
                  <td className="border p-2">{rate.code}</td>
                  <td className="border p-2">{rate.bid}</td>
                  <td className="border p-2">{rate.ask}</td>
                  <td className="border p-2 flex">
                    <button 
                      onClick={() => fetchHistoricalData(rate.code)}
                      className="show-stats"
                    >
                      Show Chart
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Effective Date: {tableC && tableC.effectiveDate}
        </p>
      </div>
      <div className="bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Currency Calculator</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-1 ">
            <label className="block mb-2">Amount:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-90 p-2 border rounded"
              min="0"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-2">Currency:</label>
            <select
              value={calculatedCurrency}
              onChange={(e) => setCalculatedCurrency(e.target.value)}
              className="w-90 p-2 border rounded"
            >
              {filteredCurrencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.currency}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {calculationResult && (
          <div className="bg-white p-4 rounded border">
            <h3 className="font-semibold mb-2">Result:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 bg-green-50 rounded border border-green-200">
                <p className="text-sm text-gray-600">If you sell {amount} {calculatedCurrency}:</p>
                <p className="text-xl font-bold">{calculationResult.buy} PLN</p>
              </div>
              <div className="p-3 bg-blue-50 rounded border border-blue-200">
                <p className="text-sm text-gray-600">If you buy {amount} {calculatedCurrency}:</p>
                <p className="text-xl font-bold">{calculationResult.sell} PLN</p>
              </div>
            </div>
          </div>
        )}
      </div>
      {showModal && <HistoricalChart />}
    </div>
  );
};

export default App;