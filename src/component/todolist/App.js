import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Template from "./template";
//import Modal from "./modal";
import Form from "./form";
import List from "./list";

class App extends Component {

    idx = 0;
    state = {
        input : '',
        modifyIdx : null,
        sortType : 'default',
        sort : 'asc',
        items : []
    };

    componentWillMount() {
        const { state } = this;

        state.items = require('./todoItem.json');
        this.idx = (state.items.length);
    }

    inputChange = (e) => {
        this.setState({
            input : e.target.value
        })
    };

    inputKeyPress = (e) => {
        if(e.key === 'Enter'){
            this.todoCreate();
            e.target.value = '';
        }
    };

    todoCreate = ( type, idx ) => {
        const{ input, items } = this.state;

        if(type === 'modify' && typeof(idx) === 'number' && idx >= 0){

            const _index = items.findIndex(items => items.idx === idx); // idx 값 체크
            const selected = items[_index];
            const changeItems = [...items];

            changeItems[_index] = {
                ...selected,
                title : input
            };

            this.setState({
                items : changeItems
            });

        }else{
            if(input === '' || !input){
                alert('내용을 입력하세요.');
                return;
            }
            this.setState({
                input : '',
                modifyIdx : null,
                items : items.concat({
                    idx : this.idx++,
                    title : input,
                    use : true
                })
            });
        }
    };

    itemDelete = (idx) => {
        const { items } = this.state;

        this.setState({
            items : items.filter(items => items.idx !== idx)
        });

    };
    itemUseChange = (idx) => {
        const { items } = this.state;

        // idx 값 체크
        const _index = items.findIndex(items => items.idx === idx);

        const selected = items[_index];

        //const changeItems = [...items];
        const changeItems = items;

        changeItems[_index] = {
            ...selected,
            use : !selected.use
        };

        this.setState({
            items : changeItems
        });

    };

    todoDelete = (idx) => {
        confirmAlert({
            'title' : '삭제',
            'message' : '정말로 삭제하시겠습니까?',
            'buttons' : [
                {
                    label : '예',
                    onClick : () => this.itemDelete(idx)
                },
                {
                    label : '아니요'
                }
            ]
        })
    };

    todoModify = (title, idx) => {
        this.setState({
            input : title,
            modifyIdx : idx
        });
    };

    todoReset = () => {
        this.setState({
            input : '',
            modifyIdx : null
        });
    };

    todoChangeSortType = (name) => {

        this.setState({
            sortType : name
        });

        this.todoItemSort(name);
    };

    todoItemSort = (sortName) => {
        const { items, sort } = this.state;

        const changeItems = [...items];

        changeItems.sort(function(a,b){
            switch(sortName){
                case 'name' :
                    if(sort === 'asc'){
                        return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
                    }else{
                        return a.title > b.title ? -1 : a.title < b.title ? 1 : 0;
                    }
                break;
                case 'use' :
                    if(sort === 'asc'){
                        return a.use - b.use;
                    }else{
                        return b.use - a.use;
                    }
                break;
                case 'default' :
                    if(sort === 'asc'){
                        return a.idx - b.idx;
                    }else{
                        return b.idx - a.idx;
                    }
                    break;
            }
        });

        this.setState({
            items : changeItems
        });
    };

    render(){
        const { input, modifyIdx, sortType,  items } = this.state;
        const { inputChange, inputKeyPress, todoCreate, todoDelete, itemUseChange, todoModify, todoReset, todoChangeSortType } = this;

        return (
            <div>
                <Template
                    form={
                        <Form input={ input }
                              modifyIdx={ modifyIdx }
                              sortType={ sortType }
                              onChange={ inputChange }
                              onKeyPress={ inputKeyPress }
                              todoSubmit={ todoCreate }
                              todoReset={ todoReset }
                              todoChangeSortType={ todoChangeSortType }
                        />
                    }
                    list={
                        <List items={ items }
                              todoDelete={ todoDelete }
                              itemUseChange={ itemUseChange }
                              todoModify={ todoModify }
                        />
                    }
                />
            </div>

        )
    }
}

export default App;