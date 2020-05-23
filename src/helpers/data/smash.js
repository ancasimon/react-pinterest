import boardsData from './boardsData';
import pinsData from './pinsData';

const completelyRemoveBoard = (boardId) => new Promise((resolve, reject) => {
// this smash function needs to do 3 things: 1-delete the board;
  boardsData.deleteBoard(boardId)
    .then(() => {
      // Next step: 2-get all the pins by the boardId;
      pinsData.getPinsByBoardId(boardId)
        .then((pins) => {
          // 3-delete each pin
          pins.forEach((pin) => pinsData.deletePin(pin.id));
          resolve(); // we want it tp resolve when it's done, but we don't need to send anything back so nothing between parentheses.
        });
    })
    .catch((err) => reject(err));
});


export default { completelyRemoveBoard };
