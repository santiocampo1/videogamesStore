import styles from "./Home.module.css";
import Cards from "../../Components/Cards/Cards";
import { useEffect } from "react";
import { AnyAction } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { getVideogames } from "../../Redux/Actions";
import { RootState } from "../../Redux/Reducer";

const Home: React.FC = () => {
  const dispatch =
    useDispatch<ThunkDispatch<RootState, undefined, AnyAction>>();
  const allVideogames = useSelector((state: RootState) => state.allVideogames);

  // const [state, setState] = useState({});

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  return (
    <div className={styles.homeContainer}>
      <h1>Home</h1>
      <Cards allVideogames={allVideogames} />
    </div>
  );
};

export default Home;
