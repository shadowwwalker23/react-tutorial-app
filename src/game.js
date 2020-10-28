import React from 'react';
import { Board } from './board';
import { constants } from './constants';

export class Game extends React.Component {
  constructor(props) {
    super(props);

    const squares = [];
    for (let i = 0; i < constants.BOARD_LENGTH; i++) {
      squares.push(Array(constants.BOARD_LENGTH).fill(null));
    }

    this.state = {
      history: [{
        squares: squares,
        desc: `Game Start`
      }],
      xIsNext: true,
      stepNumber: 0,
    }
  }

  handleClick(row, col) {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const squares = [];
    current.squares.forEach(square => {
      squares.push(square.slice());
    });
    if (calculateWinner(squares) || squares[row][col]) {
      return;
    }

    squares[row][col] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares.slice(),
        desc: `Place ${squares[row][col]} at (${row + 1}, ${col + 1})`
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
      history: this.state.history.slice(0, step + 1),
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = `Winner: ${winner}`
    } else {
      status = `Next Player: ${this.state.xIsNext ? 'X' : 'O'}`
    }

    const moves = history.map((step, move) => {
      return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{step.desc}</button>
          </li>
      );
    })

    return (
        <div className="game">
          <div className="game-board">
            <Board
                squares={current.squares}
                onClick={(row, col) => this.handleClick(row, col)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
    )
  }
}

function calculateWinner(squares) {

  for (let i = 0; i < squares.length; i++) {
    if (squares[0][i] === squares[1][i] && squares[1][i] === squares[2][i]) {
      return squares[0][i];
    }

    if (squares[i][0] === squares[i][1] && squares[i][1] === squares[i][2]) {
      return squares[i][0];
    }
  }

  if (squares[0][0] === squares[1][1] && squares[1][1] === squares[2][2]) {
    return squares[0][0];
  } else {
    return null;
  }
}
