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

function SettingsPage() {
  const { tabName } = useParams();

  const settingComponents = {
    appearance: <Appearance />,
    "your-restaurant": <YourRestaurant />,
    "products-management": <ProductsManagement />,
    notifications: <Notifications />,
    security: <SecurityPage />,
    "about-us": <AboutUs />,
  };

  return (
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
  );
}

export default SettingsPage;
