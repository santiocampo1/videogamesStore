import styles from "./Home.module.css";
import Cards from "../../Components/Cards/Cards";
import Pagination from "../../Components/Pagination/Pagination";
import Loading from "../../Components/Loading/Loading";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import {
  getVideogames,
  filterByNameVideogames,
  registerUser,
} from "../../Redux/Actions";
import { RootState } from "../../Redux/Reducer";

const Home: React.FC = () => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const dispatch =
    useDispatch<ThunkDispatch<RootState, undefined, AnyAction>>();
  const ITEMS_PER_PAGE = 12;

  const allVideogames = useSelector((state: RootState) => state.allVideogames);
  const videogamesOrdered = useSelector(
    (state: RootState) => state.videogamesOrdered
  );

  const videogamesToShow = videogamesOrdered.length
    ? videogamesOrdered
    : allVideogames;

  const [currentVideogames, setCurrentVideogames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getVideogames());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const firstPageVideogames = videogamesToShow.slice(0, ITEMS_PER_PAGE);
    setCurrentVideogames(firstPageVideogames);
  }, [videogamesToShow]);

  useEffect(() => {
    if (isAuthenticated && user) {
      dispatch(
        registerUser({
          name: user.name,
          email: user.email,
          picture: user.picture,
        })
      );
    }
  }, [isAuthenticated, user, dispatch]);

  const onChangeOrder = (event: any) => {
    dispatch(filterByNameVideogames(event.target.value));
  };

  if (loading) return <Loading />;

  return isAuthenticated ? (
    <>
      <div className={styles.homeContainer}>
        <div className={styles.header}>
          <h1>Videogames Store</h1>
          <div>
            <img src={user?.picture} alt={user?.name} />
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
          </div>
          <div className={styles.sortContainer}>
            <label>Order by Name:</label>
            <select onChange={onChangeOrder} name="" id="">
              <option defaultChecked value="default">
                -
              </option>
              <option value="asc">A-Z</option>
              <option value="des">Z-A</option>
            </select>
          </div>
        </div>
        <Cards allVideogames={currentVideogames} />
        <Pagination
          key={videogamesToShow.length}
          items={videogamesToShow}
          onPageChange={setCurrentVideogames}
        />
      </div>
    </>
  ) : (
    (() => {
      alert("Debes iniciar sesión para acceder a esta página.");
      navigate("/");
      return null;
    })()
  );
};

export default Home;
