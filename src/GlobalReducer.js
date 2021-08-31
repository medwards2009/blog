const globalReducer = (state, action) => {
  switch (action.type) {
    case "SET_CONFIG":
      return { ...state, ...action.payload };
    case "UPDATE_CONFIG":
      return { ...state, ...action.payload };
    default:
      throw new Error();
  }
};
export default globalReducer;
