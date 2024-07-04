import OrderReport from "../../components/OrderReport/OrderReport";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./DashboardPage.scss";

const DashboardPage = () => {
  return (
    <>
      <Sidebar />
      <main className="dashboard-page">
        <OrderReport />
      </main>
    </>
  );
};

export default DashboardPage;
