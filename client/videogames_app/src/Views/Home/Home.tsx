import styles from "./Home.module.css";
import Cards from "../../Components/Cards/Cards";
import { useEffect } from "react";
import { AnyAction } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { getVideogames, filterByNameVideogames } from "../../Redux/Actions";
import { RootState } from "../../Redux/Reducer";

const Home: React.FC = () => {
  const dispatch =
    useDispatch<ThunkDispatch<RootState, undefined, AnyAction>>();
  const allVideogames = useSelector((state: RootState) => state.allVideogames);
  const videogamesOrdered = useSelector(
    (state: RootState) => state.videogamesOrdered
  );

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  const onChangeOrder = (event: any) => {
    dispatch(filterByNameVideogames(event.target.value));
  };

  return (
    <div className={styles.homeContainer}>
      <h1>Videogames Store</h1>
      <label>Order by Name</label>
      <select onChange={onChangeOrder} name="" id="">
        <option value="default">-</option>
        <option value="asc">A-Z</option>
        <option value="des">Z-A</option>
      </select>
      <Cards
        allVideogames={
          videogamesOrdered.length ? videogamesOrdered : allVideogames
        }
      />
    </div>
  );
};

export default Home;
