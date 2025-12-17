import { useState } from "react";
import api from "../api";
import "./UpdateProduct.css";  

export default function UpdateProduct() {
  const [form, setForm] = useState({
    "Product Name": "",
    "Product Category": "",
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

  const handleUpdate = async () => {
    if (!form["Product Name"]) {
      setMsg(" Product Name is required for updating");
      return;
    }

    try {
      const res = await api.post("/update-product", form);
      setMsg(res.data.message);

    } catch (err) {
      setMsg(" Error updating product");
    }
  };

  return (
    <div className="update-card">
      <h2 className="update-title">Update Product</h2>

      {msg && <p className="update-msg">{msg}</p>}

      <div className="update-form">
        {Object.keys(form).map((key) => (
          <div className="up-group" key={key}>
            <label>
              {key}
              {key === "Product Name" && <span className="required">*</span>}
            </label>
            <input
              name={key}
              type="text"
              value={form[key]}
              onChange={handleChange}
              placeholder={`Enter ${key}`}
            />
          </div>
        ))}
      </div>

      <button className="update-btn" onClick={handleUpdate}>
        Update Product
      </button>
    </div>
  );
}
