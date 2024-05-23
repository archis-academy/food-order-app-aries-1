
import Sidebar from "@/components/Sidebar/Sidebar";
import "./HomePage.scss";
import { useAuth } from "@/components/AuthProvider";
import DishesMenu from "@/components/DishesMenu/DishesMenu";
import Header from "@/components/Header/Header";
import { foods } from "@/db/foods";
import { useState } from "react";
import CategoryTabs from "@/components/CategoryTabs/CategoryTabs";

function HomePage() {
  const { fireStoreUser } = useAuth(); // auth'u const {fireStoreUser} = useAuth() şeklinde alırsanız user bilgilerine ulaşabilirsiniz

  const [dishes] = useState(foods);
  const [filteredDishes, setFilteredDishes] = useState(dishes);

  const [filterParameters, setFilterParameters] = useState({
    orderType: "All",
    category: "all",
    searchQuery: "",
  });

  if (!fireStoreUser) return <p>Loading...</p>;

  return (
    <div>
      <Sidebar />
      <div className="mainRoot">
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
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;