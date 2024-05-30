import { useParams } from "react-router-dom";
import ProductsManagement from "../../components/ProductsManagement/ProductsManagement";
import SettingsSidebar from "../../components/SettingsSidebar/SettingsSidebar";
import "./SettingsPage.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Appearance from "../../components/Appearance/Appearance";
import YourRestaurant from "../../components/YourRestaurant/YourRestaurant";
import Notifications from "../../components/Notifications/Notifications";
import SecurityPage from "../../components/SecurityPage/SecurityPage";
import AboutUs from "../../components/AboutUs/AboutUs";
import AddDish from "../../components/AddDish/AddDish";
import { useState } from "react";

function SettingsPage() {
  const { tabName } = useParams();
  const [addDish, setAddDish] = useState(false);

  const settingComponents = {
    appearance: <Appearance />,
    "your-restaurant": <YourRestaurant />,
    "products-management": <ProductsManagement setAddDish={setAddDish} />,
    notifications: <Notifications />,
    security: <SecurityPage />,
    "about-us": <AboutUs />,
  };

  return (
    <div className="outer-container">
      <div className="settings-page-container">
        <Sidebar />
        <main className="settings-page">
          <h1>Settings</h1>
          <div className="main-container">
            <SettingsSidebar />
            {settingComponents[tabName]
              ? settingComponents[tabName]
              : settingComponents["products-management"]}
          </div>
        </main>
      </div>
      {addDish && (
        <div className="overlay-container">
          <AddDish setAddDish={setAddDish} />
        </div>
      )}
    </div>
  );
}

export default SettingsPage;
