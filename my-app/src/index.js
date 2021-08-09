import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//  * the Square component changed, and now is a function component, that only contains a render method
//  * and doesn't have it own state
// class Square extends React.Component {
//     render() {
//         return (
//             <button className="square"
//                 onClick={() => this.props.onClick()}>
//                 {this.props.value}
//             </button>
//         );
//     }
// }

function Square(props) {
    return (
        // When a Square is clicked, the onClick function provided by the Board is called
        // the Square components are controlled components. The Board has full control over them
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

class Board extends React.Component {
    // * esto es del contructor de Component
    // TODO creo que esto no va
    // handleClick(i) {
    //     const squares = this.state.squares.slice()
    //     if (calculateWinner(squares) || squares[i]) {
    //         return;
    //     }
    //     squares[i] = this.state.xIsNext ? 'X' : 'O'
    //     this.setState({
    //         squares: squares,
    //         xIsNext: !this.state.xIsNext
    //     })
    // }
    renderSquare(i) {
        return (
            <Square
                // * value and onClick are props
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)} />
        )
    }

    render() {
        // const winner = calculateWinner(this.state.squares)
        // let status
        // if (winner) {
        //     status = 'Winner: ' + winner
        // } else {
        //     status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
        // }

        return (
            <div>
                <div className="board">

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
            </div>
        );
    }
}

class Game extends React.Component {
    // In JavaScript classes, you need to always call super when 
    // defining the constructor of a subclass. 
    // All React component classes that have a constructor should 
    // start with a super(props) call.
    constructor(props) {
        super(props)
        this.state = {
            // this stores the state of all 9 squares in the parent (game)
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            // set first player as X by default
            xIsNext: true,
        }
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{ squares: squares, }]), 
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }

    render() {
        const history = this.state.history
        const current = history[this.state.stepNumber]
        const winner = calculateWinner(current.squares)

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move # ' + move :
                'Go to game start'
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })

        let status
        if (winner) {
            status = 'Winner: ' + winner
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
