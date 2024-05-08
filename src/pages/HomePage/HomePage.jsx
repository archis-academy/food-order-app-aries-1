import Sidebar from "@/components/Sidebar/Sidebar";
import "./HomePage.scss";
import { useAuth } from "@/components/AuthProvider";
import Header from "../../components/Header/Header";

function HomePage() {
  const { fireStoreUser } = useAuth(); // auth'u const {fireStoreUser} = useAuth() şeklinde alırsanız user bilgilerine ulaşabilirsiniz

  return (
    <div>
      <Header user={fireStoreUser} />
      <Sidebar />
      <div className="mainRoot">
        {/* <h1>Homepage example</h1> */}
      </div>
    </div>
  );
}

export default HomePage;
