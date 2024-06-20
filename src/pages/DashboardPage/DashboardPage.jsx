import MostTypeOfOrder from "../../components/MostTypeOfOrder/MostTypeOfOrder";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./DashboardPage.scss";

const DashboardPage = () => {
  return (
    <>
      <Sidebar />
      <main className="dashboard-page">
        <MostTypeOfOrder />
      </main>
    </>
  );
};

export default DashboardPage;
