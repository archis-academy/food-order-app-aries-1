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

  const [filterParameters, setFilterParameters] = useState({
    orderType: "All",
    category: "All",
    searchQuery: "",
  });

  useEffect(() => {
    const filtered = dishes.filter((dish) => {
      const isOrderTypeMatch =
        filterParameters.orderType === "All" ||
        dish.orderType === filterParameters.orderType;
      const isCategoryMatch =
        filterParameters.category === "All" ||
        dish.category === filterParameters.category;
      const isSearchQueryMatch = dish.description
        .toLowerCase()
        .includes(filterParameters.searchQuery.toLowerCase());
      return isOrderTypeMatch && isCategoryMatch && isSearchQueryMatch;
    });
    setFilteredDishes(filtered);
  }, [dishes, filterParameters]);
  return (
    <div>
      <Sidebar />
      <div className="mainRoot">
        <CategoryTabs dishes={dishes} setFilteredDishes={setFilteredDishes} />
        <DishesMenu
          dishes={dishes}
          filterParameters={filterParameters}
          setFilterParameters={setFilterParameters}
          filteredDishes={filteredDishes}
          setFilteredDishes={setFilteredDishes}
        />
      </div>
    </div>
  );
}

export default HomePage;
