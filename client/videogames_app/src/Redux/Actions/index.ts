import axios from "axios";
import { Dispatch } from "redux";
import { Action } from "redux";
import {
  GET_VIDEOGAMES,
  ORDERS,
  POST_VIDEOGAME,
} from "../Actions_types/actions_types";

type ThunkAction = (dispatch: Dispatch<Action<any>>) => Promise<any>;
export type AppActions = PostVideogameAction;

export interface VideogameInfo {
  name: string;
  description: string;
  platforms: string;
  image: string;
  genres: string[];
}

interface PostVideogameAction {
  type: typeof POST_VIDEOGAME;
  payload: VideogameInfo;
}

// Actions
export const postVideogame = (info: VideogameInfo): ThunkAction => {
  return async function (_dispatch: Dispatch): Promise<void> {
    try {
      await axios.post("http://localhost:3001/videogames/", info);
      alert("Videogame has been created successfully");
    } catch (error) {
      alert((error as Error).message);
    }
  };
};

export const getVideogames = () => {
  return async function (dispatch: Dispatch): Promise<any> {
    try {
      const response = await axios.get("http://localhost:3001/videogames/");
      console.log(response);

      return dispatch({
        type: GET_VIDEOGAMES,
        payload: response.data,
      });
    } catch (error) {
      alert("Error! Videogames could not be required");
    }
  };
};

export const filterByNameVideogames = (order: string) => {
  return function (dispatch: Dispatch) {
    return dispatch({
      type: ORDERS,
      payload: order,
    });
  };
};
