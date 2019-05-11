import React, { Component } from 'react';
import Item from './item';

class List extends Component{

    /*shouldComponentUpdate(nextProps, nextState) {
        return this.props.items !== nextProps.items;
    }*/

    itemList(){
        const { items, todoDelete, itemUseChange, todoModify } = this.props;

        const itemList = items.map(
            ({idx, title, use}) => {

            return (
                <Item idx={idx}
                      title={title}
                      use={use}
                      todoDelete={todoDelete}
                      itemUseChange={itemUseChange}
                      todoModify={todoModify}
                      key={idx}
                >
                </Item>
                )
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