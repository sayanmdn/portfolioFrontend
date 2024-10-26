import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Spinner, Alert } from "react-bootstrap";
import { URL } from "../config";

export function SocksSuggestions() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${URL}stocks`)
      .then((res) => {
        console.log(res.data);
        const recentData = res.data[0].data || [];
        setStocks(recentData);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load stock data");
        setLoading(false);
        console.error(err);
      });
  }, []);

  return (
    <div className="stocks-suggestions">
      <h2>Stocks Suggestions</h2>
      {loading && (
        <div style={{ textAlign: "center" }}>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
          <p>Loading stock data...</p>
        </div>
      )}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && stocks.length > 0 && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Trading Symbol</th>
              <th>Delta 200</th>
              <th>Delta 50</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock._id}>
                <td>{stock.trading_symbol}</td>
                <td>{stock.delta200.toFixed(2)}%</td>
                <td>{stock.delta50.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {!loading && !error && stocks.length === 0 && (
        <p style={{ textAlign: "center" }}>No stock data available.</p>
      )}
    </div>
  );
}
