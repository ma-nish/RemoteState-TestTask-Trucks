import React, { useContext, useState, useEffect } from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

import { TrucksContext } from "../../store";
import { setTrucks } from "../../actions";

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
  formControl: {
    margin: theme.spacing(1),
    width: "10%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  progress: {
    display: "flex",
    marginTop: "25%",
    marginLeft: "50%",
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const { state, dispatch } = useContext(TrucksContext);
  const [value, setValue] = useState("total");
  const [selectedTruck, setSelectedTruck] = useState([]);

  useEffect(() => {
    if (selectedTruck.length) {
      const result = selectedTruck.map((element) => {
        return state.totalTrucks.find((item) => item.truckNumber === element);
      });
      setTrucks(dispatch, result);
    }
    console.log("selectedTruck", selectedTruck);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTruck.length]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSelectedTruck([]);
    switch (newValue) {
      case "total":
        setTrucks(dispatch, state.totalTrucks);
        break;
      case "stopped":
        setTrucks(dispatch, state.stoppedTrucks);
        break;
      case "running":
        setTrucks(dispatch, state.runningTrucks);
        break;
      case "idle":
        setTrucks(dispatch, state.idleTrucks);
        break;
      case "error":
        setTrucks(dispatch, state.errorTrucks);
        break;
      default:
        setTrucks(dispatch, state.totalTrucks);
    }
  };

  const handleChangeMultiple = (event) => {
    const value = event.target.value;
    setSelectedTruck(value);
    const payload = value.map((element) => {
      return state.totalTrucks.find((item) => item.truckNumber === element);
    });
    setTrucks(dispatch, payload);
  };

  return (
    <AppBar position="static" color="default" className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab
          label={"Total Trucks " + state.totalTrucks.length}
          value="total"
          {...a11yProps(0)}
        />
        <Tab
          label={"Running Trucks " + state.runningTrucks.length}
          value="running"
          {...a11yProps(1)}
        />
        <Tab
          label={"Stopped Trucks " + state.stoppedTrucks.length}
          value="stopped"
          {...a11yProps(2)}
        />
        <Tab
          label={"Idle Trucks " + state.idleTrucks.length}
          value="idle"
          {...a11yProps(3)}
        />
        <Tab
          label={"Error Trucks " + state.errorTrucks.length}
          value="error"
          {...a11yProps(4)}
        />

        <FormControl className={classes.formControl}>
          <InputLabel id="demo-mutiple-name-label">Select Trucks</InputLabel>
          <Select
            labelId="demo-mutiple-name-label"
            id="demo-mutiple-name"
            multiple
            value={selectedTruck}
            onChange={handleChangeMultiple}
            input={<Input />}
            MenuProps={MenuProps}
          >
            {state.totalTrucks &&
              state.totalTrucks.map((truck) => (
                <MenuItem
                  key={truck.id}
                  value={truck.truckNumber}
                  style={getStyles(truck.truckNumber, selectedTruck, theme)}
                >
                  {truck.truckNumber}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Tabs>
    </AppBar>
  );
}
