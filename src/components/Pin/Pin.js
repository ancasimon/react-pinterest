import React from 'react';
import PropTypes from 'prop-types';

import pinShape from '../../helpers/propz/pinShape';

import './Pin.scss';

class Pin extends React.Component {
  static propTypes = {
    pin: pinShape.pinShape,
    removePin: PropTypes.func.isRequired,
    editAPin: PropTypes.func.isRequired,
  }

  deletePinEvent = (e) => {
    e.preventDefault();
    const { pin, removePin } = this.props;
    removePin(pin.id);
  }

  editPinEvent = (e) => {
    e.preventDefault();
    const { pin, editAPin } = this.props;
    editAPin(pin);
  }

  render() {
    const { pin } = this.props;

    return (
      <div className="Pin col-4">
        <div className="card">
          <img src={pin.imageUrl} className="card-img-top" alt="pin" />
          <div className="card-body">
            <h5 className="card-title">{pin.title}</h5>
            <button className="btn btn-primary" onClick={this.editPinEvent}>Edit Pin</button>
            <button className="btn btn-danger" onClick={this.deletePinEvent}>Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Pin;
