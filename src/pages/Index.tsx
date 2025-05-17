
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  // Redirect to dashboard on load
  useEffect(() => {
    navigate("/dashboard");
  }, [navigate]);
  
  return null;
};

export default Index;
