import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./app/Home";
import ItemDetail from "./app/ItemDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<ItemDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
