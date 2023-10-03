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
    <div>
      <h3>{name}</h3>
      <p>{description}</p>
      <p>{platforms}</p>
      <img src={image} alt={`${name} cover`} />
      <div>
        {genres.map((genre, index) => (
          <p key={index}>{genre}</p>
        ))}
      </div>
    </div>
  );
};

export default Card;
