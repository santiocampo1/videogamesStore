import Card from "../Card/Card";
import { VideogameInfo } from "../../Redux/Actions";

interface CardsProps {
  allVideogames: VideogameInfo[];
}

const Cards: React.FC<CardsProps> = ({ allVideogames }) => {
  return (
    <div>
      {allVideogames.map((videogame) => (
        <Card
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
