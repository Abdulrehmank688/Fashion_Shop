import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SeasonTotals.css"; 

export default function SeasonTotals() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/season-totals")
      .then((res) => {
        console.log("Season Data:", res.data.results);
        setData(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API ERROR:", err);
        setError("Failed to load season totals");
        setLoading(false);
      });
  }, []);

  return (
    <div className="card modern-card">
      <h2 className="heading"> Season Totals Report</h2>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <table className="modern-table">
          <thead>
            <tr>
              <th>Season</th>
              <th>Total Units Sold</th>
              <th>Total Returns</th>
              <th>Total Revenue</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((row) => (
                <tr key={row._id}>
                  <td>{row._id}</td>
                  <td>{row.totalUnitsSold}</td>
                  <td>{row.totalReturns}</td>
                  <td>${row.totalRevenue.toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-data">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
