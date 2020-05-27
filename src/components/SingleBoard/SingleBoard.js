import React from 'react';
import PropTypes from 'prop-types';

import Pin from '../Pin/Pin';
import PinForm from '../PinForm/PinForm';

import boardsData from '../../helpers/data/boardsData';
import pinsData from '../../helpers/data/pinsData';

import './SingleBoard.scss';

class SingleBoard extends React.Component {
  static propTypes = {
    boardId: PropTypes.string.isRequired,
    setSingleBoard: PropTypes.func.isRequired,
  }

  state = {
    board: {},
    pins: [],
    pinFormOpen: false,
  }

  getInfo = () => {
    const { boardId } = this.props;
    boardsData.getSingleBoard(boardId)
      .then((request) => {
        const board = request.data;
        this.setState({ board });
        pinsData.getPinsByBoardId(boardId)
          .then((pins) => this.setState({ pins }));
      })
      .catch((err) => console.error('unable to get single board', err));
  }

  componentDidMount() {
    this.getInfo();
  }

  removePin = (pinId) => {
    pinsData.deletePin(pinId)
      .then(() => this.getInfo())
      .catch((err) => console.error('could not delete the pin', err));
  }

  render() {
    const { setSingleBoard, boardId } = this.props;
    const { board, pins, pinFormOpen } = this.state;

    const makePins = pins.map((eachPin) => <Pin key={eachPin.id} pin={eachPin} removePin={this.removePin} />);

    return (
      <div className="SingleBoard">
        <button className="btn btn-dark" onClick={() => { setSingleBoard(''); }}>X</button>
        <h2>{board.name} Board</h2>
        <h3>{board.description}</h3>
        <button className="btn btn-warning" onClick={() => this.setState({ pinFormOpen: true })}>Add a Pin</button>
        { pinFormOpen ? <PinForm boardId={boardId} /> : '' }
        <div className="d-flex flex-wrap">
          {makePins}
        </div>
      </div>
    );
  }
}

export default SingleBoard;
