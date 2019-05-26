import React, { Component } from 'react';

class Item extends Component{

    /*shouldComponentUpdate(nextProps, nextState) {
        return this.props.use !== nextProps.use || this.props.title !== nextProps.title;
    }*/

    render(){
        const {idx, parent, title, use, todoDelete, itemUseChange, todoModify} = this.props;

        return (
            <a
                className={ 'list-group-item' }
                onClick={() => {
                    itemUseChange(idx, parent)
                }}>
                <span className={ `list-group-item-heading ${!use && 'del'}` }>
                    {(parent > 0) ? ' └ '+title:title}
                </span>

                <span className={ 'glyphicon glyphicon-remove' }
                      onClick={(e) => {
                          e.stopPropagation();
                          todoDelete(idx, parent)
                      }}>
                </span>
                <span className={ 'glyphicon glyphicon-pencil' }
                      onClick={(e) => {
                          e.stopPropagation();
                          todoModify(title, idx, parent, 'modify');
                      }}>
                </span>
                { (parent < 1)
                    ? <span className={ 'glyphicon glyphicon-plus' }
                            onClick={(e) => {
                                e.stopPropagation();
                                todoModify(title, idx, parent, 'create');
                            }}>
                    </span>
                    : ''
                }
            </a>
        )
    }

}

export default Item;