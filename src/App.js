import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Views/Home";
import About from "./components/Views/About";
import Login from "./components/Views/Login";
import Register from "./components/Views/Register";
import Deceased from "./components/Views/Deceased";
import NoMatch from "./components/Views/NoMatch";

function App() {
  return (
    <Layout>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/deceased">
          <Route path=":deceasedId" element={<Deceased />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Layout>
  );
}

export default App;
