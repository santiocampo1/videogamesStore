import styles from "./Home.module.css";
import Cards from "../../Components/Cards/Cards";

const Home: React.FC = () => {
  return (
    <div className={styles.homeContainer}>
      <h1>Home</h1>
      <Cards />
    </div>
  );
};

export default Home;
