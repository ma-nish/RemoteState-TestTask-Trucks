import React, { useEffect, useContext, Suspense, Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import Header from "./components/Header";
import { fetchTrucks } from "./actions";
import { TrucksContext } from "./store";

const Map = React.lazy(() => import("./components/GoogleMap"));
const Sidebar = React.lazy(() => import("./components/Sidebar"));

const useStyles = makeStyles((theme) => ({
  progress: {
    display: "flex",
    marginTop: "25%",
    marginLeft: "50%",
  },
}));

const App = () => {
  const { dispatch } = useContext(TrucksContext);
  const classes = useStyles();

  useEffect(() => {
    fetchTrucks(dispatch); // action to action trucks data
  }, [dispatch]);

  return (
    <Fragment>
      <Header />
      <Suspense fallback={<CircularProgress className={classes.progress} />}>
        <TrucksContext.Consumer>
          {({ state: { trucks } }) =>
            trucks.length && (
              <div
                style={{
                  display: "inline-flex",
                  position: "relative",
                  width: "100%",
                }}
              >
                <Sidebar trucks={trucks} />
                <Map markers={trucks} />
              </div>
            )
          }
        </TrucksContext.Consumer>
      </Suspense>
    </Fragment>
  );
};

export default App;
