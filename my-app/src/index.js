import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//  * the Square component changed, and now is a function component, that only contains a render method
//  * and doesn't have it own state
// class Square extends React.Component {
//     render() {
//         return (
//             <button className="square"
//                 // When a Square is clicked, the onClick function provided by the Board is called
//                 // the Square components are controlled components. The Board has full control over them
//                 onClick={() => this.props.onClick()}>
//                 {this.props.value}
//             </button>
//         );
//     }
// }

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

class Board extends React.Component {
    // * esto es del contructor de Component
    // In JavaScript classes, you need to always call super when 
    // defining the constructor of a subclass. 
    // All React component classes that have a constructor should 
    // start with a super(props) call.
    constructor(props) {
        super(props)
        this.state = {
            // this stores the state of all 9 squares in the parent (board)
            squares: Array(9).fill(null),
        }
    }
    handleClick(i) {
        const squares = this.state.squares.slice()
        squares[i] = 'X'
        this.setState({ squares, squares })
    }
    renderSquare(i) {
        return (
            <Square
                // * value and onClick are props
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)} />
        )
    }

    render() {
        const status = 'Next player: X';

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
