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

        const _index = items.findIndex(items => items.idx === idx); // idx 값 체크

        const selected = items[_index];

        const changeItems = [...items];

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

    render(){
        const { input, modifyIdx, items } = this.state;
        const { inputChange, inputKeyPress, todoCreate, todoDelete, itemUseChange, todoModify, todoReset } = this;

        return (
            <div>
                <Template
                    form={
                        <Form input={ input }
                              modifyIdx={ modifyIdx }
                              onChange={ inputChange }
                              onKeyPress={ inputKeyPress }
                              todoSubmit={ todoCreate }
                              todoReset={ todoReset }
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