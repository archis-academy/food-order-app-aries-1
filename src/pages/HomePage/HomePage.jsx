import Sidebar from "@/components/Sidebar/Sidebar";
import "./HomePage.scss";
import { useAuth } from "@/components/AuthProvider";
import DishesMenu from "@/components/DishesMenu/DishesMenu";
import { foods } from "@/db/foods";
import { useState } from "react";

function HomePage() {
  const { fireStoreUser } = useAuth(); // auth'u const {fireStoreUser} = useAuth() şeklinde alırsanız user bilgilerine ulaşabilirsiniz

  const [dishes, setDishes] = useState(foods);
  const [filteredDishes, setFilteredDishes] = useState(dishes);

  return (
    <div>
      <Sidebar />
      <div className="mainRoot">
        <DishesMenu
          filteredDishes={filteredDishes}
          setFilteredDishes={setFilteredDishes}
        />
      </div>
    </div>
  );
}

export default HomePage;
