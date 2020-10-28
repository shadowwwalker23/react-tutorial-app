import React from 'react';

export class Board extends React.Component {

  renderSquare(row, rIdx) {
    return row.map((square, cIdx) => {
      return (
          <Square
              key={10 * rIdx + cIdx}
              value={square}
              onClick={() => this.props.onClick(rIdx, cIdx)}
          />
      );
    });
  }

  render() {

    return this.props.squares.map((row, index) => {
      return (
          <div className="board-row" key={index}>
            {this.renderSquare(row, index)}
          </div>
      );
    });
  }
}

function Square(props) {
  return (
      <button className="square" onClick={props.onClick}>{props.value}</button>
  );
}
