import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Views/Home";
import About from "./components/Views/About";
import Login from "./components/Views/Login";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
  );
}

export default App;
