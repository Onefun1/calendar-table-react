import React from "react";

import "./Panel.css";

function Panel(props) {
  const { months, date, flag, currentMonth } = props.state;
  return (
    <div className="panel">
      <button className="decrement" onClick={props.click_Decr}>
        {"<"}
      </button>
      <button onClick={props.returnMonth}>Today</button>
      <div>
        {flag
          ? `${months[currentMonth - 1]} ${date[0]}`
          : `${months[date[1] - 1]} ${date[0]}`}
      </div>
      <button className="increment" onClick={props.click_Inkr}>
        {">"}
      </button>
    </div>
  );
}

export default Panel;
