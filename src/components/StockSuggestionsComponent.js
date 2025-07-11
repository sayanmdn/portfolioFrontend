import { useEffect, useState } from "react";
import axios from "axios";
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
      <h2 className="text-2xl font-bold text-white mb-6">Stocks Suggestions</h2>
      {loading && (
        <div className="text-center">
          <div className="spinner-glass w-8 h-8 mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading stock data...</p>
        </div>
      )}
      {error && <div className="alert-glass alert-danger">{error}</div>}
      {!loading && !error && stocks.length > 0 && (
        <div className="glass-card overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white border-b border-white/20">
                    Trading Symbol (NSE)
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white border-b border-white/20">
                    Less than the 200 day average
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white border-b border-white/20">
                    Less than the 50 day average
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {stocks.map((stock) => (
                  <tr key={stock._id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-white">{stock.trading_symbol}</td>
                    <td className="px-6 py-4 text-white">{stock.delta200.toFixed(2)}%</td>
                    <td className="px-6 py-4 text-white">{stock.delta50.toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {!loading && !error && stocks.length === 0 && (
        <p className="text-center text-text-secondary">No stock data available.</p>
      )}
    </div>
  );
}
