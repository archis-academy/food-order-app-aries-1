import { useAuth } from "./AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminRoute({ children }) {
  const { fireStoreUser } = useAuth();
  const navigate = useNavigate();
  const isAdmin = fireStoreUser?.role === "admin";

  useEffect(() => {
    if (!isAdmin) {
      navigate("/settings/notifications", { replace: true });
      return;
    }
  }, []);

  return children;
}

export default AdminRoute;
