import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Views/Home";
import About from "./components/Views/About";
import Login from "./components/Views/Login";
import Register from "./components/Views/Register";
import Deceased from "./components/Views/Deceased";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/deceased" >
          <Route path=":deceasedId" element={<Deceased />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Layout>
  );
}

export default App;
