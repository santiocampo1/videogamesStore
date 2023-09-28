import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../../Redux/Actions";
import { postVideogame } from "../../Redux/Actions";
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

type AppDispatch = ThunkDispatch<RTCIceConnectionState, undefined, AppActions>;

const Create: React.FC = () => {
  const [input, setInput] = useState<Input>({
    name: "",
    description: "",
    platforms: "",
    image: "",
    genres: "",
  });

  const [errors, setErrors] = useState<Errors>({
    name: "",
    description: "",
    platforms: "",
    image: "",
    genres: "",
  });

  const dispatch: AppDispatch = useDispatch();

  const validate = (input: Input, name: keyof Input) => {
    let error = "";

    switch (name) {
      case "name":
        error = /^[A-Za-z\s]+$/.test(input.name)
          ? ""
          : "Name can only contain letters";
        break;
      case "description":
        error =
          input.description.length >= 10 && input.description.length <= 165
            ? ""
            : "Description must be between 10 and 165 characters";
        break;
      case "platforms":
        error =
          input.platforms.length <= 150
            ? ""
            : "Platforms cannot exceed 150 characters";
        break;
      case "image":
        error = /^(http|https):\/\/[^ "]+$/.test(input.image)
          ? ""
          : "Image must be a valid URL";
        break;
      case "genres":
        break;
    }

    setErrors({
      ...errors,
      [name]: error,
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
    dispatch(postVideogame(input));
  };
  const isFormValid = Object.values(errors).every((error) => error === "");

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input name="name" type="text" onChange={handleChange} />
          {errors.name && <div className={styles.error}>{errors.name}</div>}
        </div>

        <div>
          <label>Description: </label>
          <input name="description" type="text" onChange={handleChange} />
          {errors.description && (
            <div className={styles.error}>{errors.description}</div>
          )}
        </div>

        <div>
          <label>Platforms: </label>
          <input name="platforms" type="text" onChange={handleChange} />
          {errors.platforms && (
            <div className={styles.error}>{errors.platforms}</div>
          )}
        </div>

        <div>
          <label>Image: </label>
          <input name="image" type="text" onChange={handleChange} />
          {errors.image && <div className={styles.error}>{errors.image}</div>}
        </div>

        <div>
          <label>Genres: </label>
          <input name="genres" type="text" onChange={handleChange} />
          {errors.genres && <div className={styles.error}>{errors.genres}</div>}
        </div>

        <input type="submit" value="Create Game" disabled={!isFormValid} />
      </form>
    </div>
  );
};

export default Create;
