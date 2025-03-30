import  './App.css';
import React, { useState, useEffect } from "react";

const App = () => {

  const [data, setData] = useState(null); // To store the fetched data
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To manage errors
  useEffect(()=>{

    // Instead of directly calling the NBP API
    fetch('https://api.nbp.pl/api/exchangerates/tables/a/')
    .then((response)=>response.json())
    .then((data)=>{
      setData(data);
      setLoading(false);
    })
    .catch((error)=>{
      setError(error);
      setLoading(false);
    });
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }



  return (
    <div>
  <h1>Exchange Rates:</h1>
  {data && data[0] && (
    <div>
      <p>Table: {data[0].table}</p>
      <p>No: {data[0].no}</p>
      <p>Effective Date: {data[0].effectiveDate}</p>
      
      <h2>Rates:</h2>
      <table className="border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Currency</th>
            <th className="border p-2">Code</th>
            <th className="border p-2">Mid Rate</th>
          </tr>
        </thead>
        <tbody>
          {data[0].rates && data[0].rates.map((rate, index) => (
            <tr key={index}>
              <td className="border p-2">{rate.currency}</td>
              <td className="border p-2">{rate.code}</td>
              <td className="border p-2">{rate.mid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>
    
  );
};

export default App;
