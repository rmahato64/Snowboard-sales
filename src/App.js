import React, { useState } from "react";
import "./App.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function App() {
  const data = [
    {
      country: "Finland",
      sales: 400,
    },
    {
      country: "France",
      sales: 100,
    },
    {
      country: "Brazil",
      sales: 70,
    },
  ];

  const [country, setCountry] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [selectedData, setSelectedData] = useState("");

  const handleSubmit = () => {
    const selectedCountry = data.find(
      (d) => d.country.toUpperCase() === country.toUpperCase()
    );
    if(country && selectedCountry){
      setFilteredData([selectedCountry])
    }
    else if(country && !selectedCountry){
      setFilteredData([])
    }
    else{
      setFilteredData(data)
    }
    setSelectedData(selectedCountry);
  };

  return (
    <div className="App">
      <h1>Find snowboard sales for Finland, France and Brazil.</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Enter country name"
          onChange={(e) => setCountry(e.target.value)}
          value={country}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      {selectedData && (
        <p>
          Snowboard sales for {selectedData.country} in 2022 is{" "}
          {selectedData.sales}
        </p>
      )}
      {!filteredData.length && <p>Invalid input.</p>}

      {filteredData.length > 0 && (
        <BarChart
          width={500}
          height={300}
          data={filteredData}
          barSize={10}
        >
          <XAxis
            dataKey="country"
            scale="point"
            padding={{ left: 10, right: 10 }}
            label={{
              value: "Country",
              position: "insideBottomRight",
              offset: 0,
            }}
          />
          <YAxis
            label={{ value: "Sales", position: "insideLeft", angle: -90 }}
          />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="sales" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
      )}
    </div>
  );
}

export default App;
