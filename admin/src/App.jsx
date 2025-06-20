// App.jsx
import { Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout";
import AddItem from "./Pages/AddItem";
import ListItem from "./Pages/ListItem";
import Login from "./Pages/Login";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import { ContextStore } from "./store/ContextStore";
import AllOrders from "./Pages/Orders";
import AdminOrders from "./Pages/Orders";
import OrderDetails from "./Pages/OrderDetails";

const App = () => {
  const { atoken, setaToken } = useContext(ContextStore);
  return (
    <>
      <Routes>
        {atoken ? (
          <Route element={<Layout />} path="/">
            <Route path="add-item" element={<AddItem />} />
            <Route path="list-item" element={<ListItem />} />
            <Route path="get-orders" element={<AdminOrders />} />
            <Route path="orders/:orderId" element={<OrderDetails />} />
          </Route>
        ) : (
          <Route element={<Login />} path="/"></Route>
        )}
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
