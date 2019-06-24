import React, { Component } from "react";
import "./Table.css";

import Panel from "../panel/Panel";
import Modal from "../modal/Modal";

class Table extends Component {
  constructor() {
    super();
    let today = new Date();
    let date = [
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate(),
      today.getDay()
    ];
    let daysAmount = new Date(date[0], date[1], 0).getDate();
    let firstDayOfCurrentMonth = new Date(date[0], date[1] - 1, 0).getDay();
    console.log(date[1]);

    this.state = {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      date: date,
      daysAmount: daysAmount,
      firstDay: firstDayOfCurrentMonth,
      currentMonth: date[1],
      flag: false,
      isOpen: false,
      eventBase: {}
    };
  }

  monthChangerIncrement() {
    const { date, months } = this.state;
    let counter = date[1];
    this.setState({
      daysAmount: new Date(date[0], counter + 1, 0).getDate(),
      firstDay: new Date(date[0], counter, 0).getDay(),
      flag: false
    });

    if (counter === months.length) {
      counter = 0;
      this.setState(prevState => (prevState.date[1] = counter));
    }

    if (counter <= months.length - 1) {
      this.setState(prevState => (prevState.date[1] = ++counter));
    }
  }

  monthChangerDecrement() {
    const { date, months } = this.state;
    let counter = date[1];
    this.setState({
      daysAmount: new Date(date[0], counter + 1, 0).getDate(),
      firstDay: new Date(date[0], counter, 0).getDay(),
      flag: false
    });

    if (counter <= 0) {
      counter = months.length + 1;
      this.setState(prevState => (prevState.date[1] = counter));
    }

    if (counter > 0) {
      this.setState(prevState => (prevState.date[1] = --counter));
    }
  }

  backToReality() {
    const { date, currentMonth } = this.state;
    let daysAmount = new Date(date[0], currentMonth, 0).getDate();
    let firstDay = new Date(date[0], currentMonth - 1, 0).getDay();

    console.log("click", this.state.date[1]);

    this.setState(prevState => (prevState.date[1] = currentMonth));

    this.setState({
      daysAmount: daysAmount,
      firstDay: firstDay,
      flag: true
    });
    this.setState({
      flag: false
    });
  }

  addEvent = () => {
    this.setState({ isOpen: false });
    console.log(`Your event was saved`);
  };

  openModal = e => {
    let target = e.target;
    this.setState({ isOpen: true });
    console.log(target);
    return target.firstChild;
  };

  handleCancel = () => {
    console.log("Cancel function!");
    this.setState({ isOpen: false });
  };

  render() {
    const { days, daysAmount, firstDay, date, currentMonth } = this.state;

    let thead = days.map(day => {
      return (
        <div key={day} className="calendar__thead">
          {day}
        </div>
      );
    });
    let tbody = Array(daysAmount)
      .fill(null)
      .map((item, index) => {
        return (
          <div
            id={`day${index + 1}`}
            key={index}
            className={
              index === date[2] - 1 && date[1] === currentMonth
                ? "calendar__tbody today "
                : "calendar__tbody"
            }
          >
            {index + 1}
            <span hidden />
          </div>
        );
      });

    let cells = [];
    for (let i = 0; i < firstDay; i++) {
      cells.push(
        <div key={"empty" + i} className="emptyCell">
          {""}
        </div>
      );
    }

    return (
      <>
        <Panel
          state={this.state}
          click_Inkr={() => this.monthChangerIncrement()}
          click_Decr={() => this.monthChangerDecrement()}
          returnMonth={() => this.backToReality()}
        />
        <div className="calendar" onClick={this.openModal}>
          {thead}
          {cells.map(cell => cell)}
          {tbody}
        </div>
        <Modal
          title="Test Dialog window"
          isOpen={this.state.isOpen}
          onCancel={this.handleCancel}
          onSubmit={this.addEvent}
        />
      </>
    );
  }
}

export default Table;
