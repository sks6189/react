import React, { Component } from 'react';

class List extends Component{
    fs = null;

    constructor(props) {
        super(props);
        console.log('constructor');
    }

    componentWillMount() {
        console.log('componentWillMount (deprecated)');
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    itemList(){
        const { items } = this.props;

        console.log(items);
        /*const listItem = items.forEach((data, i) => {
            return (<a href="#" className="list-group-item" data-toggle="modal" data-target="#detail-modal">
                <p className="list-group-item-heading">{data.title}</p>
            </a>)
        });*/

        const itemList = items.map(function(data,j){
            return (
                <a href="#"
                   className="list-group-item"
                   data-toggle="modal"
                   data-target="#detail-modal"
                >
                <p className="list-group-item-heading">{data.title}</p>
            </a>)
        });

        return itemList;
    }

    render(){

        return (
            <div className="list-group">
                {this.itemList()}
            </div>
        )
    }

}

export default List;