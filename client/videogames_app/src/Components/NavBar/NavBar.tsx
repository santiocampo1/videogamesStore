import { NavLink } from "react-router-dom";
import { useState } from "react";
import styles from "./NavBar.module.css";
import logoNavBar from "../../assets/logoNavBar.png";
import LogoutButton from "../LogoutButton/LogoutButton";

const NavBar: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className={styles.navContainer}>
      <div>
        <NavLink to={"/"} className={styles.logoLink}>
          <img src={logoNavBar} alt="videogameLogo" />
        </NavLink>
      </div>

      <div className={styles.searchContainer}>
        <input
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Buscar videojuegos..."
          className={styles.searchInput}
        />
      </div>

      <div>
        <NavLink to={"/home"}>Home</NavLink>
        <NavLink to={"/create"}>Create</NavLink>
        <LogoutButton />
      </div>
    </div>
  );
};

export default NavBar;
