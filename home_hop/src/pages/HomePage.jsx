import { useEffect } from "react";
import { useAuth } from "../hooks/authContext";
import MiniBar from "../components/MiniBar";

const HomePage = () => {
  const { checkAuthentication } = useAuth();



  useEffect(() => {
    checkAuthentication();
  }, [])

  return (
    <div>
      <MiniBar />
    </div>
  );
};

export default HomePage;

