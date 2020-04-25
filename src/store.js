import React, { createContext, useReducer } from "react"; // importing react hooks
import { reducer } from "./reducers";

export const intialState = {  // set initial store state
  totalTrucks: [],
  runningTrucks: [],
  stoppedTrucks: [],
  idleTrucks: [],
  errorTrucks: [],
  trucks: [],
};

export const TrucksContext = createContext(""); // create global context store

export default function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, intialState);
  const value = { state, dispatch };

  return (
    <TrucksContext.Provider value={value}>
      {props.children}
    </TrucksContext.Provider>
  );
}
