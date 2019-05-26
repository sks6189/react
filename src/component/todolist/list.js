import React, { Component } from 'react';
import Item from './item';

class List extends Component{

    /*shouldComponentUpdate(nextProps, nextState) {
        return this.props.items !== nextProps.items;
    }*/

    itemList(todoList){
        const { todoDelete, itemUseChange, todoModify } = this.props;

        const itemList = todoList.map(
            ({idx, parent, title, use, items}) => {
                const temp = [];
                temp.push(
                    <Item idx={idx}
                          parent={parent}
                          title={title}
                          use={use}
                          todoDelete={todoDelete}
                          itemUseChange={itemUseChange}
                          todoModify={todoModify}
                          key={idx}>
                    </Item>
                );
                if(items){
                    temp.push(this.itemList(items));
                }
                return temp;

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