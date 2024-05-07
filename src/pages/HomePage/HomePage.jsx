import Sidebar from "@/components/Sidebar/Sidebar";
import "./HomePage.scss";
import { useAuth } from "@/components/AuthProvider";
import DishesMenu from "@/components/DishesMenu/DishesMenu";
import { foods } from "@/db/foods";
import { useEffect, useState } from "react";
import CategoryTabs from "../../components/CategoryTabs/CategoryTabs";

function HomePage() {
  const { fireStoreUser } = useAuth(); // auth'u const {fireStoreUser} = useAuth() şeklinde alırsanız user bilgilerine ulaşabilirsiniz

  const [dishes, setDishes] = useState(foods);
  const [filteredDishes, setFilteredDishes] = useState(dishes);
  useEffect(() => {
    console.log(filteredDishes);
  }, [dishes, filteredDishes]);
  return (
    <div>
      <Sidebar />
      <div className="mainRoot">
        <CategoryTabs dishes={dishes} setFilteredDishes={setFilteredDishes} />
        <DishesMenu
          filteredDishes={filteredDishes}
          setFilteredDishes={setFilteredDishes}
        />
      </div>
    </div>
  );
}

export default HomePage;
