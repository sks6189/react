import React, { Component } from 'react';

class Item extends Component{

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.use !== nextProps.use || this.props.title !== nextProps.title;
    }

    render(){
        const {idx, title, use, todoDelete, itemUseChange, todoModify} = this.props;

        return (
            <a
                className={ 'list-group-item' }
                onClick={() => {
                    itemUseChange(idx)
                }}>
                <span className={ `list-group-item-heading ${!use && 'del'}` }>
                    {title}
                </span>
                <span className={ 'glyphicon glyphicon-remove' }
                      onClick={(e) => {
                          e.stopPropagation();
                          todoDelete(idx)
                      }}>
                    </span>
                <span className={ 'glyphicon glyphicon-pencil' }
                      onClick={(e) => {
                          e.stopPropagation();
                          todoModify(title, idx);
                      }}>
                    </span>
            </a>
        )
    }

}

export default Item;