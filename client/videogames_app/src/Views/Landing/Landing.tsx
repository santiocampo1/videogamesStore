import styles from "./Landing.module.css";
import LoginButton from "../../Components/LoginButton/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";

const Landing: React.FC = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className={styles.container}>
      <div>
        <h1>Welcome</h1>
      </div>

      <div>
        {isAuthenticated ? (
          <NavLink className={styles.navButton} to="/home">
            Back to Home
          </NavLink>
        ) : (
          <LoginButton></LoginButton>
        )}
      </div>
    </div>
  );
};

export default Landing;
