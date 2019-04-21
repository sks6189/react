import React, { Component } from 'react';

class Button extends Component{
    numberSum(i){
        return i + 1;
    }

    render(){
        return (
            <button>{this.numberSum(1)}</button>
        )
    }
}

class Game2 extends Component {

    render(){
        let setTitle = "GAME";
        return(
            <div className="game">
                <div className="game-board">
                    <Button/>
                </div>
            </div>
        )
    }
};


export default Game2;