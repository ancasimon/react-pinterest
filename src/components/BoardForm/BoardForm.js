import React from 'react';
import PropTypes from 'prop-types';
import authData from '../../helpers/data/authData';
import './BoardForm.scss';

class BoardForm extends React.Component {
  static propTypes = {
    saveNewBoard: PropTypes.func.isRequired,
  }

  state = {
    boardName: '',
    boardDescription: '',
  }

  saveBoard = (e) => {
    e.preventDefault();
    const { boardDescription, boardName } = this.state;
    const { saveNewBoard } = this.props;
    const newBoard = {
      description: boardDescription,
      name: boardName,
      uid: authData.getUid(),
    };
    saveNewBoard(newBoard);
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ boardName: e.target.value });
  }

  descriptionChange = (e) => {
    e.preventDefault();
    this.setState({ boardDescription: e.target.value });
  }

  render() {
    const { boardDescription, boardName } = this.state;
    return (
      <div className="BoardForm">
        <form className="col-6 offset-3">
          <div className="form-group">
            <label htmlFor="boardName">Board Name</label>
            <input
              type="text"
              className="form-control"
              id="boardName"
              placeholder="Enter a board name"
              value={boardName}
              onChange={this.nameChange} />
          </div>
          <div className="form-group">
            <label htmlFor="boardDescription">Board Description</label>
            <input
              type="text"
              className="form-control" id="boardDescription" placeholder="Enter a board description"
              value={boardDescription}
              onChange={this.descriptionChange} />
          </div>
          <button className="btn btn-success" onClick={this.saveBoard}>Save Board</button>
        </form>
      </div>
    );
  }
}

export default BoardForm;
