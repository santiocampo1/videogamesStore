import { useAuth0 } from "@auth0/auth0-react";
import styles from "./Landing.module.css";
import { NavLink } from "react-router-dom";

const Landing: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className={styles.container}>
      <div>
        <h1>Welcome</h1>
      </div>

      <div>
        <button onClick={() => loginWithRedirect()}>Log In / Sign Up</button>
        <NavLink className={styles.navButton} to="/home">
          Im just looking up
        </NavLink>
      </div>
    </div>
  );
};

export default Landing;
