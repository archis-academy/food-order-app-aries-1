import AnalyticsHeader from "../../components/AnalyticsHeader/AnalyticsHeader";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./DashboardPage.scss";

const DashboardPage = () => {
  return (
    <>
      <Sidebar />
      <main className="dashboard-page">
        <AnalyticsHeader />
      </main>
    </>
  );
};

export default DashboardPage;
