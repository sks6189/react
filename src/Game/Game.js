import React, { Component } from 'react';

class Square extends Component {
    render(){
        return (
            <button>{this.props.value}</button>
        )
    }
}

class Board extends Component {
    renderSquare(i,j){
        let sum = i+j;
        return <Square value={sum}/>
        ;
    }

    render(){
        return (
            <table>
                <tr>
                    <td>{this.renderSquare(1,2)}</td>
                    <td>{this.renderSquare(2,3)}</td>
                    <td>{this.renderSquare(3,4)}</td>
                </tr>
                <tr>
                    <td>{this.renderSquare(1,2)}</td>
                    <td>{this.renderSquare(2,3)}</td>
                    <td>{this.renderSquare(3,4)}</td>
                </tr>
                <tr>
                    <td>{this.renderSquare(1,2)}</td>
                    <td>{this.renderSquare(2,3)}</td>
                    <td>{this.renderSquare(3,4)}</td>
                </tr>
            </table>
        )
    }
}

class Game extends Component {
    render(){
        let setTitle = "GAME";
        return(
            <div className="game">
                <span>{setTitle}</span>
                <div className="game-board">
                    <Board />
                </div>
            </div>
        )
    }
};

export default Game;