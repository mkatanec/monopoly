import React, {createContext, useContext, useEffect, useState} from "react";

import {Grid, Snackbar} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import _ from "lodash";

import {GameContext} from "../../App";
import properties from "../../constants/properties";
import Dice from "../Dice/Dice";
import Field from "../Field/Field";
import PlayerData from "../PlayerData/PlayerData";
import {getDialog} from "../../util/boardUtil";
import {getPropertyByName} from "../../util/propertyUtil";

export const DialogContext = createContext(null);

const Board = () => {
  const {game} = useContext(GameContext);

  const [showDialog, setShowDialog] = useState(false);

  const [dialog, setDialog] = useState(null);

  const [dialogs, setDialogs] = useState({
    snackBar: {
      open: false,
      severity: "",
      message: "",
    },
  });

  const onCloseSnackBar = () => {
    setDialogs({
      ...dialogs,
      snackBar: {
        ...dialogs.snackBar,
        open: false,
      },
    })
  };

  const helpDialog = (fieldName) => {
    const field = _.find(game.fields, field => _.findIndex(field.players, playerIndex => playerIndex === game.currentPlayer) !== -1);
    const property = getPropertyByName(fieldName);
    setDialog(getDialog(field, property, true, setShowDialog, game.currentPlayer, dialogs.jailVisit));
    setShowDialog(true);
  };

  useEffect(() => {
    if(dialogs.showDialog) {
      const fieldName = _.findKey(game.fields, field =>
        _.findIndex(field.players, playerIndex => playerIndex === game.currentPlayer) !== -1);
      helpDialog(fieldName);

      setDialogs({
        ...dialogs,
        showDialog: false
      });
    }
  }, [dialogs, game.currentPlayer, game.fields]);

  return (
    <DialogContext.Provider value={{dialogs, setDialogs}}>
      <Snackbar open={dialogs.snackBar.open} autoHideDuration={6000}
                onClose={onCloseSnackBar}
                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                message={dialogs.snackBar.message}>
        <Alert onClose={onCloseSnackBar} severity={dialogs.snackBar.severity}>
          {dialogs.snackBar.message}
        </Alert>
      </Snackbar>
      <Grid container direction="row" justify="space-around" alignContent="center">
        <Grid item xs={10}>
          <Grid container direction="column" style={{marginTop: 70}}>
            {showDialog ? (dialog) : null}
            {/* prvi redak */}
            <Grid container direction="row" justify="space-around" alignContent="center">
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.START}/>
              </Grid>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.BROKEN_ELEVATOR}/>
              </Grid>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.ROOMATE_AGREEMENT_1}/>
              </Grid>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.LAUNDRY_ROOM}/>
              </Grid>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.NEW_COMIC_BOOK_DAY}/>
              </Grid>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.TOY_TRAIN_SET}/>
              </Grid>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.NORTH_POLE_RESEARCH_STATION}/>
              </Grid>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.FORTUNE_COOKIE_1}/>
              </Grid>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.CERN_LARGE_HADRON_COLLIDER}/>
              </Grid>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.INTERNATIONAL_SPACE_STATION}/>
              </Grid>
            </Grid>

            {/* drugi redak */}
            <Grid container direction="row" justify="space-around" alignContent="center" style={{marginTop: 10}}>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.JAIL}/>
              </Grid>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.BERNADETTE_OFFICE}/>
              </Grid>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.SHELDON_WIFI}/>
              </Grid>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.AMY_LAB}/>
              </Grid>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.MRS_WOLOWITZ_HOUSE}/>
              </Grid>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.SOYUZ_ROCKET}/>
              </Grid>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.MODEL_TRAIN_STORE}/>
              </Grid>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.ROOMATE_AGREEMENT_2}/>
              </Grid>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.THE_COMIC_CENTER_OF_PASADENA}/>
              </Grid>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.THE_CHEESECAKE_FACTORY}/>
              </Grid>
            </Grid>

            {/* treci redak */}

            <Grid container direction="row" justify="space-around" alignContent="center" style={{marginTop: 10}}>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.PARKING}/>
              </Grid>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.SHELDON_OFFICE}/>
              </Grid>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.FORTUNE_COOKIE_2}/>
              </Grid>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.HOWARD_LAB}/>
              </Grid>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.LEONARD_LAB}/>
              </Grid>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.LEONARD_CAR}/>
              </Grid>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.RAJ_OFFICE}/>
              </Grid>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.SHELDON_PARKING_SPACE}/>
              </Grid>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.PENNY_WINE}/>
              </Grid>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.PHYSICS_DEPARTMENT_CAFETERIA}/>
              </Grid>
            </Grid>

            {/* cetvrti redak */}

            <Grid container direction="row" justify="space-around" alignContent="center" style={{marginTop: 10}}>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.GO_TO_JAIL}/>
              </Grid>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.AMY_APARTMENT}/>
              </Grid>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.RAJ_APARTMENT}/>
              </Grid>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.ROOMATE_AGREEMENT_3}/>
              </Grid>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.HOWARD_AND_BERNADETTE_APARTMENT}/>
              </Grid>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.HOWARD_SCOOTER}/>
              </Grid>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.FORTUNE_COOKIE_3}/>
              </Grid>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.PENNY_APARMENT}/>
              </Grid>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.BERNAETTE_RING}/>
              </Grid>
              <Grid item xs={1} container justify="space-around" alignContent="center">
                <Field property={properties.SHELDON_AND_LEONARD_APARTMENT}/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Grid container direction="column" style={{marginTop: 70}} justify="space-around">
            <Dice/>
            <PlayerData/>
          </Grid>
        </Grid>
      </Grid>
    </DialogContext.Provider>
  );
};

export default Board;