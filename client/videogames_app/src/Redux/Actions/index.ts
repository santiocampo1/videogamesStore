import axios from "axios";
import { Dispatch, AnyAction, Action } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "../Reducer";
import {
  GET_VIDEOGAMES,
  POST_VIDEOGAME,
  SEARCH_VIDEOGAMES,
  ORDERS,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
} from "../Actions_types/actions_types";

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

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
export const registerUser =
  (userData: { name: any; email: any; picture: any }): AppThunk =>
  async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/users/register",
        userData
      );

      if (response.status === 201) {
        dispatch({
          type: REGISTER_USER_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({
          type: REGISTER_USER_ERROR,
          payload: "Error registering user",
        });
      }
    } catch (error) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: (error as Error).message,
      });
    }
  };

export const postVideogame =
  (info: VideogameInfo): AppThunk =>
  async (_dispatch) => {
    try {
      await axios.post("http://localhost:3001/videogames/", info);
      alert("Videogame has been created successfully");
    } catch (error) {
      alert((error as Error).message);
    }
  };

export const getVideogames = (): AppThunk => {
  return async function (dispatch: Dispatch): Promise<void> {
    try {
      const response = await axios.get("http://localhost:3001/videogames/");
      console.log(response);

      dispatch({
        type: GET_VIDEOGAMES,
        payload: response.data,
      });
      return Promise.resolve(); // Asegúrate de retornar una promesa resuelta aquí
    } catch (error) {
      alert("Error! Videogames could not be required");
      return Promise.reject(); // En caso de error, retornamos una promesa rechazada
    }
  };
};

export const filterByNameVideogames =
  (order: string) =>
  (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): void => {
    dispatch({
      type: ORDERS,
      payload: order,
    });
  };

export const searchVideogamesByName =
  (name: string): AppThunk =>
  async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/videogames?name=${name}`
      );
      console.log(response);

      dispatch({
        type: SEARCH_VIDEOGAMES,
        payload: response.data,
      });
    } catch (error) {
      alert("Error! Videogames could not be found by name");
    }
  };
