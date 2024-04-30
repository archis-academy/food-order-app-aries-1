import Sidebar from "@/components/Sidebar/Sidebar";
import "./HomePage.scss";
import { useAuth } from "@/components/AuthProvider";
import DishesMenu from "@/components/DishesMenu/DishesMenu";

function HomePage() {
  const { fireStoreUser } = useAuth(); // auth'u const {fireStoreUser} = useAuth() şeklinde alırsanız user bilgilerine ulaşabilirsiniz

  return (
    <div>
      <Sidebar />
      <div className="mainRoot">
        <DishesMenu />
      </div>
    </div>
  );
}

export default HomePage;
