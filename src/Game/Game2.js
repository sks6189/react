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
    updateValue(){
        let num = Math.round(Math.random()*100);
        console.log(this.props);
        console.log(num);
    }

    constructor(props){
        super(props);
        //this.number =
    }

    render(){
        let setTitle = "GAME";
        return(
            <div className="game">
                <div className="game-board">
                    <p>1</p>
                    <button onclick={this.updateValue}>클릭</button>
                </div>
            </div>
        )
    }
};


export default Game2;