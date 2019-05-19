import React, { Component } from 'react';
import Item from './item';

class List extends Component{

    /*shouldComponentUpdate(nextProps, nextState) {
        return this.props.items !== nextProps.items;
    }*/

    itemList(todoList){
        const { todoDelete, itemUseChange, todoModify } = this.props;

        let returnHtml = '';
        const itemList = todoList.map(
            ({idx, title, use, items}) => {
                if(items){
                    console.log(this.itemList(items));
                }
                return (
                    <Item idx={idx}
                          title={title}
                          use={use}
                          todoDelete={todoDelete}
                          itemUseChange={itemUseChange}
                          todoModify={todoModify}
                          key={idx}>
                    </Item>
                )

        });

        return itemList;
    }

    render(){
        const { items } = this.props;
        return (
            <div className="list-group">
                {this.itemList(items)}
            </div>
        )
    }

}

export default List;