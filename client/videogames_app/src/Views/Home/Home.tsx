import styles from "./Home.module.css";
import Cards from "../../Components/Cards/Cards";
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

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(videogamesToShow.length / ITEMS_PER_PAGE);

  const indexOfLastVideogame = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstVideogame = indexOfLastVideogame - ITEMS_PER_PAGE;
  const currentVideogames = videogamesToShow.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  const onChangeOrder = (event: any) => {
    dispatch(filterByNameVideogames(event.target.value));
    setCurrentPage(1); // Reset the page when order changes
  };

  return (
    <div className={styles.homeContainer}>
      <h1>Videogames Store</h1>
      <label>Order by Name</label>
      <select onChange={onChangeOrder} name="" id="">
        <option defaultChecked value="default">
          -
        </option>
        <option value="asc">A-Z</option>
        <option value="des">Z-A</option>
      </select>

      <Cards allVideogames={currentVideogames} />

      <div className={styles.paginationControls}>
        <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
          First
        </button>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default Home;
