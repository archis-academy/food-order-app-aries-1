import Sidebar from "../../components/Sidebar/Sidebar";
import "./DashboardPage.scss";
import { foods } from "@/db/foods";
import MostOrderedFood from "./MostOrderedFood/MostOrderedFood";
import ViewAllModal from "./ViewAllModal/ViewAllModal";
import { useState } from "react";

const DashboardPage = () => {
  const [showAll, setShowAll] = useState(false);

  const topFoods = foods.slice(0, 3);

  return (
    <>
      <Sidebar />
      <main className="dashboard-page">
        <div>DashboardPage</div>
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
        </div>
        {showAll && (
          <ViewAllModal onClose={() => setShowAll(false)}>
            <div className="modal-items">
              {foods.map((food) => (
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
