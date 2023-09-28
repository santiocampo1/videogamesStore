interface State {
  allVideogames: any[];
}

let initialState: State = {
  allVideogames: [],
};

const rootReducer = (state: State = initialState, action: any): State => {
  switch (action.type) {
    // case value:
    // break;

    default:
      return state;
  }
};

export default rootReducer;
