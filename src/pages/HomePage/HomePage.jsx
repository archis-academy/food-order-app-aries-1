import Sidebar from "@/components/Sidebar/Sidebar";
import "./HomePage.scss";
import { useAuth } from "@/components/AuthProvider";
import DishesMenu from "@/components/DishesMenu/DishesMenu";
import Header from "@/components/Header/Header";
import { foods } from "@/db/foods";
import { useState, useEffect } from "react";
import CategoryTabs from "@/components/CategoryTabs/CategoryTabs";
import OrderPayment from "@/components/OrderPayment/OrderPayment";
import OrderConfirmation from "@/components/OrderConfirmation/OrderConfirmation";

function HomePage() {
  const { fireStoreUser } = useAuth(); // auth'u const {fireStoreUser} = useAuth() şeklinde alırsanız user bilgilerine ulaşabilirsiniz

  const [dishes] = useState(foods);
  const [filteredDishes, setFilteredDishes] = useState(dishes);

  const [filterParameters, setFilterParameters] = useState({
    orderType: "All",
    category: "all",
    searchQuery: "",
  });
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  if (!fireStoreUser) return <p>Loading...</p>;

  const handleFoodCardClick = (food) => {
    const existingOrderIndex = orders.findIndex(
      (order) => order.id === food.id
    );
    console.log(existingOrderIndex);

    if (existingOrderIndex === -1) {
      setOrders([...orders, { ...food, quantity: 1, note: "" }]);
    } else {
      const updatedOrders = [...orders];
      updatedOrders[existingOrderIndex].quantity += 1;

      setOrders(updatedOrders);
    }
    setIsOrderOpen(true);
  };
  const handleDeleteItem = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);

    setOrders(updatedOrders);
  };

  const handleUpdateQuantity = (id, quantity) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, quantity } : order
    );
    setOrders(updatedOrders);
  };
  const handleUpdateNote = (id, note) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, note } : order
    );
    setOrders(updatedOrders);
  };
  const handleContinueToPayment = () => {
    setIsConfirmationOpen(true);
  };

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  return (
    <div>
      <Sidebar />
      <div className={`main-root ${isOrderOpen ? "shrink" : ""}`}>
        <div>
          <Header
            userName={fireStoreUser.displayName}
            dishes={dishes}
            filterParameters={filterParameters}
            setFilterParameters={setFilterParameters}
            setFilteredDishes={setFilteredDishes}
          />
          <CategoryTabs
            dishes={dishes}
            setFilteredDishes={setFilteredDishes}
            filterParameters={filterParameters}
            setFilterParameters={setFilterParameters}
          />
          <DishesMenu
            dishes={dishes}
            filterParameters={filterParameters}
            setFilterParameters={setFilterParameters}
            filteredDishes={filteredDishes}
            setFilteredDishes={setFilteredDishes}
            onFoodCardClick={handleFoodCardClick}
          />
        </div>
      </div>
      <OrderPayment
        orders={orders}
        isOpen={isOrderOpen}
        onClose={() => setIsOrderOpen(false)}
        onDeleteItem={handleDeleteItem}
        onUpdateQuantity={handleUpdateQuantity}
        onUpdateNote={handleUpdateNote}
        onContinueToPayment={handleContinueToPayment}
      />
      {isConfirmationOpen && (
        <OrderConfirmation orders={orders} onClose={handleCloseConfirmation} />
      )}
    </div>
  );
}

export default HomePage;
