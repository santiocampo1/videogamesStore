import { useState, ChangeEvent, FormEvent } from "react";
import styles from "./Create.module.css";

interface Input {
  name: string;
  description: string;
  platforms: string;
  image: string;
  genres: string;
}

interface Errors {
  name: string;
  description: string;
  platforms: string;
  image: string;
  genres: string;
}

const Create: React.FC = () => {
  const [input, setInput] = useState<Input>({
    name: "",
    description: "",
    platforms: "",
    image: "",
    genres: "",
  });

  const [errors, setErrors] = useState<Errors>({
    name: "Name is required",
    description: "Description is required",
    platforms: "At least 1 platform is required",
    image: "",
    genres: "At least 1 genre is required",
  });

  const validate = (input: Input, name: keyof Input) => {
    const errorMessages = {
      name: "Name is required",
      description: "Description is required",
      platforms: "At least 1 platform is required",
      image: "",
      genres: "At least 1 genre is required",
    };

    setErrors({
      ...errors,
      [name]: input[name] ? "" : errorMessages[name],
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInput({
      ...input,
      [name]: value,
    });

    validate(
      {
        ...input,
        [name]: value,
      },
      name as keyof Input
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(input);
  };

  return (
    <div className={styles.container}>
      {/* {console.log(errors)} */}

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
