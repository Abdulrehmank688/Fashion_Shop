import { useState } from "react";
import api from "../api";
import "./AddProduct.css";   

export default function AddProduct() {
  const [form, setForm] = useState({
    "Product Category": "",
    "Product Name": "",
    "Units Sold": "",
    "Returns": "",
    "Revenue": "",
    "Customer Rating": "",
    "Stock Level": "",
    "Season": "",
    "Trend Score": ""
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await api.post("/add-product", form);
      setMsg(res.data.message);

      // Reset form
      setForm({
        "Product Category": "",
        "Product Name": "",
        "Units Sold": "",
        "Returns": "",
        "Revenue": "",
        "Customer Rating": "",
        "Stock Level": "",
        "Season": "",
        "Trend Score": ""
      });

    } catch (err) {
      setMsg(" Error adding product");
    }
  };

  return (
    <div className="add-card">
      <h2 className="add-title"> Add New Product</h2>

      {msg && <p className="message">{msg}</p>}

      <div className="form-grid">
        {Object.keys(form).map((key) => (
          <div className="form-group" key={key}>
            <label>{key}</label>
            <input
              type="text"
              name={key}
              value={form[key]}
              onChange={handleChange}
              placeholder={`Enter ${key}`}
            />
          </div>
        ))}
      </div>

      <button className="add-btn" onClick={handleSubmit}>
        Add Product
      </button>
    </div>
  );
}
