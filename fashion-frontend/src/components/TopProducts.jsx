import { useState } from "react";
import api from "../api";
import "./TopProducts.css";

export default function TopProducts() {
  const [season, setSeason] = useState("");
  const [minUnits, setMinUnits] = useState("");
  const [results, setResults] = useState([]);
  const [msg, setMsg] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const search = async () => {
    if (!season || !minUnits) {
      setMsg(" Please fill all fields");
      return;
    }

    try {
      const res = await api.get(
        `/top-products?season=${season}&minUnits=${minUnits}`
      );

      setResults(res.data.results);
      setCurrentPage(1); 
      setMsg(`✔ ${res.data.results.length} result(s) found`);
    } catch {
      setMsg(" Error fetching products");
    }
  };

  // Pagination logic
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentData = results.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(results.length / itemsPerPage);

  return (
    <div className="top-card">
      <h2 className="top-title"> Top Products (Units Sold &gt; X)</h2>

      {msg && <p className="top-msg">{msg}</p>}

      <div className="top-form">

        <div className="tp-group">
          <label>Season</label>
          <input
            type="text"
            placeholder="Summer / Winter / Autumn / Spring"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
          />
        </div>

        <div className="tp-group">
          <label>Minimum Units Sold</label>
          <input
            type="number"
            placeholder="Example: 200"
            value={minUnits}
            onChange={(e) => setMinUnits(e.target.value)}
          />
        </div>

      </div>

      <button className="top-btn" onClick={search}>
        Search
      </button>

      <table className="top-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Units Sold</th>
            <th>Customer Rating</th>
          </tr>
        </thead>

        <tbody>
          {currentData.length > 0 ? (
            currentData.map((p) => (
              <tr key={p._id}>
                <td>{p["Product Name"]}</td>
                <td>{p["Units Sold"]}</td>
                <td>{p["Customer Rating"]}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="no-results">
                No data — try filter
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ---------------- Pagination Controls ---------------- */}
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}

    </div>
  );
}
