import Sidebar from "@/components/Sidebar/Sidebar";
import "./HomePage.scss";
import { useAuth } from "@/components/AuthProvider";
import DishesMenu from "@/components/DishesMenu/DishesMenu";
import { foods } from "@/db/foods";
import { useEffect, useState } from "react";
import CategoryTabs from "../../components/CategoryTabs/CategoryTabs";
import Loading from "../../components/Loading/Loading";

function HomePage() {
  const { fireStoreUser } = useAuth(); // auth'u const {fireStoreUser} = useAuth() şeklinde alırsanız user bilgilerine ulaşabilirsiniz

  const [dishes, setDishes] = useState(foods);
  const [filteredDishes, setFilteredDishes] = useState(dishes);
  const [filterParameters, setFilterParameters] = useState({
    orderType: "All",
    category: "all",
    searchQuery: "",
  });

  const renderLoading = <Loading />;

  const renderContent = (
    <>
      <CategoryTabs
        dishes={dishes}
        setFilteredDishes={setFilteredDishes}
        filterParameters={filterParameters}
        setFilterParameters={setFilterParameters}
      />
      <DishesMenu
        filteredDishes={filteredDishes}
        setFilteredDishes={setFilteredDishes}
      />
    </>
  );

  return (
    <div>
      <Sidebar />
      <div className="mainRoot">
        {fireStoreUser ? renderContent : renderLoading}
      </div>
    </div>
  );
}

export default HomePage;
