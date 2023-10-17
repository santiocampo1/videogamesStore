import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  searchVideogamesByName,
  getVideogames,
} from "../../Redux/Actions/index";
import { AppDispatch } from "../../Redux/Reducer";
import styles from "./NavBar.module.css";
import logoNavBar from "../../assets/logoNavBar.png";
import LogoutButton from "../LogoutButton/LogoutButton";
import Loading from "../Loading/Loading";

const NavBar: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = async () => {
    setIsLoading(true);
    if (searchValue) {
      await dispatch(searchVideogamesByName(searchValue));
    } else {
      await dispatch(getVideogames());
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.navContainer}>
      {isLoading && <Loading />}
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
          placeholder="Search Videogames..."
          className={styles.searchInput}
        />
        <button onClick={handleSearchSubmit} className={styles.searchButton}>
          Search
        </button>
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
