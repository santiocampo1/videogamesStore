import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import logoNavBar from "../../assets/logoNavBar.png";
import LogoutButton from "../LogoutButton/LogoutButton";

const NavBar: React.FC = () => {
  return (
    <div className={styles.navContainer}>
      <div>
        <NavLink to={"/"} className={styles.logoLink}>
          <img src={logoNavBar} alt="videogameLogo" />
        </NavLink>
      </div>

      <div>
        <NavLink to={"/home"}>Home</NavLink>
        <NavLink to={"/create"}>Create</NavLink>
        <LogoutButton></LogoutButton>
      </div>
    </div>
  );
};

export default NavBar;
