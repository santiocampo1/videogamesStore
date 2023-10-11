import styles from "./Home.module.css";
import Cards from "../../Components/Cards/Cards";
import Pagination from "../../Components/Pagination/Pagination";
import { useEffect, useState } from "react";
import { AnyAction } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { getVideogames, filterByNameVideogames } from "../../Redux/Actions";
import { RootState } from "../../Redux/Reducer";

const Home: React.FC = () => {
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

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  useEffect(() => {
    const firstPageVideogames = videogamesToShow.slice(0, ITEMS_PER_PAGE);
    setCurrentVideogames(firstPageVideogames);
  }, [videogamesToShow]);

  const onChangeOrder = (event: any) => {
    dispatch(filterByNameVideogames(event.target.value));
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.header}>
        <h1>Videogames Store</h1>
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
  );
};

export default Home;
