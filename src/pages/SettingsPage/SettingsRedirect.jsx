import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SettingsRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/settings/about-us");
  }, []);

  return <div>SettingsRedirect</div>;
}

export default SettingsRedirect;
