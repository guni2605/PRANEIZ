// App.jsx
import { Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout";
import AddItem from "./Pages/AddItem";
import ListItem from "./Pages/ListItem";

const App = () => (
  <Routes>
    <Route element={<Layout />} path="/">
      <Route path="/add-item" element={<AddItem />} />
      <Route path="/list-item" element={<ListItem />} />
    </Route>
  </Routes>
);

export default App;
