import { GET_VIDEOGAMES } from "../Actions_types/actions_types";

export interface RootState {
  allVideogames: any[];
}

let initialState: RootState = {
  allVideogames: [],
};

const rootReducer = (
  state: RootState = initialState,
  action: any
): RootState => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        allVideogames: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
