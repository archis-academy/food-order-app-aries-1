import Sidebar from "@/components/Sidebar/Sidebar";
import "./HomePage.scss";
import { useAuth } from "@/components/AuthProvider";
import DishesMenu from "@/components/DishesMenu/DishesMenu";
import { foods } from "@/db/foods";
import React, { useState } from "react";
import CategoryTabs from "../../components/CategoryTabs/CategoryTabs";

function HomePage() {
  const { fireStoreUser } = useAuth(); // auth'u const {fireStoreUser} = useAuth() şeklinde alırsanız user bilgilerine ulaşabilirsiniz


  const [dishes, setDishes] = useState(foods);
  const [filteredDishes, setFilteredDishes] = useState(foods);


  const [filter, setFilter] = useState("All");

  return (
    <div>
      <Sidebar />
      <div className="mainRoot">
        <CategoryTabs dishes={dishes} setFilteredDishes={setFilteredDishes} />
        <DishesMenu filter={filter} setFilter={setFilter} foods={foods} filteredDishes={filteredDishes} />
      </div>
    </div>
  );
}

export default HomePage;
