import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";

import { TrucksContext } from "../../store";
import { setTrucks } from "../../actions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "17%",
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
      marginLeft: "10px",
    },
  },
  list: {
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    minHeight: window.innerHeight - 150,
    maxHeight: window.innerHeight - 100,
  },
}));

function Sidebar({ trucks }) {
  const classes = useStyles();
  const { state, dispatch } = useContext(TrucksContext);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search.length) {
      const result = state.totalTrucks.filter((item) =>
        item.truckNumber.includes(search.toUpperCase())
      );
      setTrucks(dispatch, result);
    } else {
      setTrucks(dispatch, state.totalTrucks);
    }
  }, [dispatch, search, state.totalTrucks]);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className={classes.root}>
      <TextField
        id="outlined-basic"
        label="Search Trucks"
        onChange={handleChange}
        value={search}
      />
      <List className={classes.list}>
        {trucks &&
          trucks.map((value) => {
            return (
              <ListItem
                key={value.id}
                role={undefined}
                dense
                button
                style={{
                  background: value.state === "Error" ? "red" : "white",
                }}
              >
                <ListItemText
                  primary={value.truckNumber}
                  secondary={`${
                    value.lastWaypoint.speed > 0 ? "Running" : "Stopped"
                  } since last
                      ${new Date(
                        value.lastRunningState.stopStartTime
                      ).getHours()} "hr"`}
                />
                <ListItemSecondaryAction>
                  {new Date(value.lastWaypoint.updateTime).getHours() + "hr"}
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
      </List>
    </div>
  );
}

Sidebar.propTypes = {
  trucks: PropTypes.array,
};

export default Sidebar;
