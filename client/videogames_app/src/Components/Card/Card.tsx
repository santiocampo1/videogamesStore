import styles from "./Card.module.css";

interface CardProps {
  name: string;
  description: string;
  platforms: string;
  image: string;
  genres: string[];
}

const Card: React.FC<CardProps> = ({
  name,
  description,
  platforms,
  image,
  genres,
}) => {
  return (
    <div className={styles.cardContainer}>
      <h3>{name}</h3>
      <img src={image} alt={`${name} cover`} />
      <p>{description}</p>
      <p>{platforms}</p>
      <div className={styles.genresContainer}>
        {genres.map((genre, index) => (
          <span key={index}>{genre}</span>
        ))}
      </div>
    </div>
  );
};

export default Card;
