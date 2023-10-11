import { GET_VIDEOGAMES, ORDERS } from "../Actions_types/actions_types";

export interface RootState {
  allVideogames: any[];
  videogamesOrdered: any[];
}

let initialState: RootState = {
  allVideogames: [],
  videogamesOrdered: [],
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

    default:
      return state;
  }
};

export default rootReducer;
