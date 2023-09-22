import { useState } from "react";
import styles from "./Create.module.css";

const Create: React.FC = () => {
  const [input, setInput] = useState({
    name: "",
    description: "",
    platforms: "",
    image: "",
    genres: "",
  });

  const handleChange = (event: any) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(input);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input name="name" type="text" onChange={handleChange} />
        </div>
        <div>
          <label>Description: </label>
          <input name="description" type="text" onChange={handleChange} />
        </div>
        <div>
          <label>Platforms: </label>
          <input name="platforms" type="text" onChange={handleChange} />
        </div>
        <div>
          <label>Image: </label>
          <input name="image" type="text" onChange={handleChange} />
        </div>

        <div>
          <label>Genres: </label>
          <input name="genres" type="text" onChange={handleChange} />
        </div>
        <input type="submit" value="Create Game" />
      </form>
    </div>
  );
};

export default Create;
