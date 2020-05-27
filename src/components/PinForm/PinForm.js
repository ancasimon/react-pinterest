import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../helpers/data/authData';

import './PinForm.scss';

class PinForm extends React.Component {
  static propTypes = {
    boardId: PropTypes.string.isRequired,
    saveNewPin: PropTypes.func.isRequired,
  }

  state = {
    pinName: '',
    pinImageUrl: '',
  }

  pinNameChange = (e) => {
    e.preventDefault();
    this.setState({ pinName: e.target.value });
  }

  pinImageUrlChange = (e) => {
    e.preventDefault();
    this.setState({ pinImageUrl: e.target.value });
  }

  savePin = (e) => {
    e.preventDefault();
    const { pinImageUrl, pinName } = this.state;
    const { boardId, saveNewPin } = this.props;
    const newPin = {
      boardId,
      title: pinName,
      imageUrl: pinImageUrl,
      uid: authData.getUid(),
    };
    saveNewPin(newPin);
  }

  render() {
    const { pinImageUrl, pinName } = this.state;

    return (
      <div className="PinForm">
        <form className="col-6 offset-3">
          <div className="form-group">
            <label htmlFor="pinName">Pin Name</label>
            <input
              type="text"
              className="form-control"
              id="pinName"
              placeholder="Enter a pin name"
              value={pinName}
              onChange={this.pinNameChange}
              />
          </div>
          <div className="form-group">
            <label htmlFor="pinImageUrl">Photo</label>
            <input
              type="text"
              className="form-control" id="pinImageUrl" placeholder="Enter a URL for a pin photo"
              value={pinImageUrl}
              onChange={this.pinImageUrlChange}
              />
          </div>
          <button className="btn btn-warning" onClick={this.savePin}>Save Pin</button>
        </form>
      </div>
    );
  }
}

export default PinForm;
