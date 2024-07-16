import AnalyticsHeader from "../../components/AnalyticsHeader/AnalyticsHeader";
import MostTypeOfOrder from "../../components/MostTypeOfOrder/MostTypeOfOrder";
import OrderReport from "../../components/OrderReport/OrderReport";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./DashboardPage.scss";
import { getDishes } from "../../db/foods";
import MostOrderedFood from "../../components/MostOrderedFood/MostOrderedFood";
import ViewAllModal from "../../components/ViewAllModal/ViewAllModal";
import { useState, useEffect } from "react";
import moment from "moment";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

const DashboardPage = () => {
  const [showAll, setShowAll] = useState(false);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
      const dishesData = await getMostOrderedDishes();
      setDishes(dishesData);
    };

    fetchDishes();
  }, []);

  const topFoods = dishes.slice(0, 3);
  const currentDate = moment().format("dddd, Do MMM YYYY");

  const getMostOrderedDishes = async () => {
    const dishesCollection = collection(db, "dishes");
    const dishesQuery = query(
      dishesCollection,
      orderBy("orderCount", "desc"),
      limit(12)
    );
    const dishesSnapshot = await getDocs(dishesQuery);
    const dishesList = dishesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return dishesList;
  };

  return (
    <>
      <Sidebar />
      <main className="dashboard-page">
        <div className="dashboard-page-left">
          <div className="dashboard-header">
            <div className="dashboard-user-date-field">
              <h1 className="dashboard-title">Dashboard Page</h1>
              <p className="dashboard-date-field">{currentDate}</p>
            </div>
          </div>
          <AnalyticsHeader />
          <OrderReport />
        </div>

        <div className="dashboard-page-right">
          <div className="most-ordered-container">
            <div className="most-ordered-header">
              <p className="most-ordered-title">Most Ordered</p>
              <select className="most-ordered-select">
                <option value="Today">Today</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className="most-ordered-content">
              {topFoods.map((food) => {
                return <MostOrderedFood key={food.id} food={food} />;
              })}
            </div>
            <div className="most-ordered-footer">
              <button className="view-all-btn" onClick={() => setShowAll(true)}>
                View All
              </button>
            </div>
          </div>
          <MostTypeOfOrder />
        </div>
        {showAll && (
          <ViewAllModal onClose={() => setShowAll(false)}>
            <div className="modal-items">
              {dishes.map((food) => (
                <MostOrderedFood key={food.id} food={food} />
              ))}
            </div>
          </ViewAllModal>
        )}
      </main>
    </>
  );
};

export default DashboardPage;
