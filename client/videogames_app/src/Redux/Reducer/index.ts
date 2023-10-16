import {
  GET_VIDEOGAMES,
  ORDERS,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
} from "../Actions_types/actions_types";

export interface RootState {
  allVideogames: any[];
  videogamesOrdered: any[];
  user: null;
  error: null;
}

let initialState: RootState = {
  allVideogames: [],
  videogamesOrdered: [],
  user: null,
  error: null,
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

    case ORDERS:
      const videogamesToOrder = [...state.allVideogames];
      if (action.payload === "asc") {
        return {
          ...state,
          videogamesOrdered: videogamesToOrder.sort((prev: any, next: any) => {
            if (prev.name > next.name) return 1;
            if (prev.name < next.name) return -1;
            return 0;
          }),
        };
      } else if (action.payload === "des") {
        return {
          ...state,
          videogamesOrdered: videogamesToOrder.sort((prev: any, next: any) => {
            if (prev.name > next.name) return -1;
            if (prev.name < next.name) return 1;
            return 0;
          }),
        };
      } else if (action.payload === "default") {
        return {
          ...state,
          videogamesOrdered: state.allVideogames,
        };
      } else {
        return state;
      }

    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };

    case REGISTER_USER_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
