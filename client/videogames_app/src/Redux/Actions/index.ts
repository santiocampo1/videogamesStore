import axios from "axios";
import { Dispatch } from "redux";
import { POST_VIDEOGAME } from "../Actions_types/actions_types";

type ThunkAction = (dispatch: Dispatch) => Promise<void>;
export type AppActions = PostVideogameAction;

interface VideogameInfo {
  name: string;
  description: string;
  platforms: string;
  image: string;
  genres: string;
}

interface PostVideogameAction {
  type: typeof POST_VIDEOGAME;
  payload: VideogameInfo;
}

// Actions
export const postVideogame = (info: VideogameInfo): ThunkAction => {
  return async function (dispatch: Dispatch): Promise<void> {
    try {
      const response = await axios.post(
        "http://localhost:3001/videogames/",
        info
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
};
