import { intialState } from "../store";

export function reducer(state = intialState, action) {
  switch (action.type) {
    case "SAVE_TRUCKS":
      const allTrucks = action.payload.map((el) => {
        if (el.lastWaypoint.ignitionOn && el.lastWaypoint.speed > 0) {
          return {
            ...el,
            icon: {
              url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
            },
            state: "Running",
          };
        } else if (el.lastWaypoint.ignitionOn && el.lastWaypoint.speed === 0) {
          return {
            ...el,
            icon: {
              url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
            },
            state: "Idle",
          };
        } else if (
          !el.lastWaypoint.ignitionOn &&
          new Date(el.lastRunningState.stopStartTime).getHours() < 4
        ) {
          return {
            ...el,
            icon: {
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            },
            state: "Stopped",
          };
        } else if (
          !el.lastWaypoint.ignitionOn &&
          new Date(el.lastRunningState.stopStartTime).getHours() > 4
        ) {
          return {
            ...el,
            icon: {
              url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
            },
            state: "Error",
          };
        }
        return el;
      });
      
      return {
        ...state,
        totalTrucks: allTrucks,
        runningTrucks: allTrucks.filter((item) => item.state === "Running"),
        stoppedTrucks: allTrucks.filter((item) => item.state === "Stopped"),
        idleTrucks: allTrucks.filter((item) => item.state === "Idle"),
        errorTrucks: allTrucks.filter((item) => item.state === "Error"),
        trucks: allTrucks
      };

    case "SET_TRUCKS": 
      return {
        ...state,
        trucks: action.payload
      }

    default:
      return state;
  }
}
