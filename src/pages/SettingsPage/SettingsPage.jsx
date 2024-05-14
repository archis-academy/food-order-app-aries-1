import ProductsManagement from "../../components/ProductsManagement/ProductsManagement";
import SettingsSidebar from "../../components/SettingsSidebar/SettingsSidebar";
import "./SettingsPage.scss";

function SettingsPage() {
  return (
    <main className="settings-page">
      <h1>Settings</h1>
      <div className="main-container">
        <SettingsSidebar />
        <ProductsManagement />
      </div>
    </main>
  );
}

export default SettingsPage;
