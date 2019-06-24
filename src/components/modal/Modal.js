import React from "react";

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      eventBase: {}
    };
  }

  handleChange(e) {
    let target = e.target;
    console.log(target.value);
    this.setState({
      value: target.value
    });
  }

  render() {
    const { title, isOpen, onCancel, onSubmit } = this.props;
    const { value } = this.state;
    return (
      <>
        {isOpen && (
          <div className="modalOverlay">
            <div className="modalWindow">
              <div className="modalHeader">
                <div className="modalTitle">{title}</div>
              </div>
              <div className="modalBody">
                <p>{value}</p>
                <input onChange={e => this.handleChange(e)} />
              </div>
              <div className="modalFooter">
                <button onClick={onCancel}>Cancel</button>
                <button onClick={onSubmit}>Save</button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Modal;
