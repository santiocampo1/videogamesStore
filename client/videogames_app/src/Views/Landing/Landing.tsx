import styles from "./Landing.module.css";
import { NavLink } from "react-router-dom";

const Landing: React.FC = () => {
  return (
    <div className={styles.container}>
      <div>
        <h1>Welcome</h1>
      </div>

      <div>
        <NavLink className={styles.navButton} to="/home">
          Let's Start
        </NavLink>
      </div>
    </div>
  );
};

export default Landing;
