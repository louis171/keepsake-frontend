import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Views/Home";
import About from "./components/Views/About";
import Login from "./components/Views/Login";
import Register from "./components/Views/Register";
import Memory from "./components/Views/Memory";
import NoRouteMatch from "./components/Views/NoRouteMatch";

function App() {
  return (
    <Layout>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/memory">
          <Route path=":deceasedId" element={<Memory />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NoRouteMatch />} />
      </Routes>
    </Layout>
  );
}

export default App;
