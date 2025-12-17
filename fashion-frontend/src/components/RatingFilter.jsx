import { useState } from "react";
import api from "../api";
import "./RatingFilter.css";

export default function RatingFilter() {
  const [season, setSeason] = useState("");
  const [operator, setOperator] = useState("gt");
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const [msg, setMsg] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filter = async () => {
    if (!season || !value) {
      setMsg(" Please fill all fields");
      return;
    }

    try {
      const res = await api.get(
        `/rating-filter?season=${season}&operator=${operator}&value=${value}`
      );
      setResults(res.data.results);
      setCurrentPage(1);
      setMsg(`✔ ${res.data.results.length} result(s) found`);
    } catch {
      setMsg(" Error fetching data");
    }
  };

  // Pagination calculations
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentData = results.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(results.length / itemsPerPage);

  return (
    <div className="rating-card">
      <h2 className="rating-title"> Filter by Customer Rating</h2>

      {msg && <p className="rating-msg">{msg}</p>}

      <div className="rating-form">
        <div className="rf-group">
          <label>Season</label>
          <input
            type="text"
            placeholder="Summer / Winter / Autumn / Spring"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
          />
        </div>

        <div className="rf-group">
          <label>Condition</label>
          <select
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
          >
            <option value="gt">Greater Than (&gt;)</option>
            <option value="gte">Greater or Equal (&ge;)</option>
            <option value="lt">Less Than (&lt;)</option>
            <option value="lte">Less or Equal (&le;)</option>
          </select>
        </div>

        <div className="rf-group">
          <label>Rating Value</label>
          <input
            type="number"
            step="0.1"
            placeholder="Example: 4.5"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>

      <button className="rating-btn" onClick={filter}>
        Apply Filter
      </button>

      <table className="rating-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Customer Rating</th>
          </tr>
        </thead>

        <tbody>
          {currentData.length > 0 ? (
            currentData.map((r) => (
              <tr key={r._id}>
                <td>{r["Product Name"]}</td>
                <td>{r["Customer Rating"]}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="no-results">
                No results — apply filter
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* -------- SMART PAGINATION -------- */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;

            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <button
                  key={page}
                  className={currentPage === page ? "active" : ""}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              );
            }
            if (page === currentPage - 2 || page === currentPage + 2) {
              return (
                <span key={page} className="dots">
                  …
                </span>
              );
            }

            return null; 
          })}

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
