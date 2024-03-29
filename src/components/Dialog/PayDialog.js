import React, {useContext} from "react";

import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,} from "@material-ui/core";

import {GameContext} from "../../App";
import useGetOwnerPlayer from "../../hooks/useGetOwnerPlayer";
import { payAnotherPlayer } from "../../util/playerUtil";

const PayDialog = ({
  open,
  setOpen,
  fieldInfo,
  propertyInfo,
  property = false,
}) => {
  const { game, setGame } = useContext(GameContext);
  const owner = useGetOwnerPlayer(fieldInfo.owner);

  const handleClose = () => {
    const newCurrentPlayer = game.currentPlayer + 1;
    const currentPlayerDiff = newCurrentPlayer - game.players.length;

    setGame({
      ...game,
      players: payAnotherPlayer(
        game,
        game.currentPlayer,
        fieldInfo.owner,
        calculateAmount()
      ).players,
      currentPlayer:
        currentPlayerDiff >= 0 ? currentPlayerDiff : newCurrentPlayer,
    });

    setOpen(false);
  };

  const calculateAmount = () => {
    return Math.ceil(
      propertyInfo.PRICE.PROPERTY / 10 +
        fieldInfo.numberOfHouses * 10 +
        fieldInfo.numberOfHotels * 25
    );
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{propertyInfo.TITLE}</DialogTitle>
      <DialogContent>
        <DialogContentText>Owner: {owner.name}</DialogContentText>
        <DialogContentText>Price: {calculateAmount()}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="contained">
          Pay
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PayDialog;
