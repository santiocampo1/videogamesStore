import Card from "../Card/Card";
import styles from "./Cards.module.css";
import { VideogameInfo } from "../../Redux/Actions";

interface CardsProps {
  allVideogames: VideogameInfo[];
}

const Cards: React.FC<CardsProps> = ({ allVideogames }) => {
  return (
    <div className={styles.cardsContainer}>
      {allVideogames.map((videogame, index) => (
        <Card
          key={index} // Siempre es una buena práctica agregar un key al mapear.
          name={videogame.name}
          description={videogame.description}
          platforms={videogame.platforms}
          image={videogame.image}
          genres={videogame.genres}
        />
      ))}
    </div>
  );
};

export default Cards;
