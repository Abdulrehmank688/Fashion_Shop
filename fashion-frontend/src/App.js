import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import DeleteProduct from "./components/DeleteProduct";
import SeasonTotals from "./components/SeasonTotals";
import TopProducts from "./components/TopProducts";
import RatingFilter from "./components/RatingFilter";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AddProduct />} />
        <Route path="/update" element={<UpdateProduct />} />
        <Route path="/delete" element={<DeleteProduct />} />
        <Route path="/season-totals" element={<SeasonTotals />} />
        <Route path="/top-products" element={<TopProducts />} />
        <Route path="/rating-filter" element={<RatingFilter />} />
      </Routes>
    </Router>
  );
}

export default App;
