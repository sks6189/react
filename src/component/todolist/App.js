import React, { Component } from 'react';
import axios from 'axios';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Template from "./template";
//import Modal from "./modal";
import Form from "./form";
import List from "./list";

class App extends Component {

    idx = 0;
    inputTitle = '할일 등록';
    state = {
        input : '',
        inputType : '',
        modifyIdx : null,
        modifyParent : null,
        sortType : 'default',
        sort : 'asc',
        items : []
    };

    componentWillMount() {
        const { state } = this;

        let index = 0;
        const _this = this;

        this.getTodoList();

        this.idx = this.checkIndex(state.items) + 1;
    }

    getTodoList(){
        let _this = this;
        axios.get('http://localhost:8080/todo')
        .then(response => {
            console.log(response);

            if(response.data.code == '0000'){
                _this.setState({
                    items : response.data.data
                });
                _this.todoReset();
            }else{
                alert(response.data.description);
            }

        });
    }

    dataChange = (todo, type) =>{
        let _this = this;

        type = (type == 'del') ? 'delete' : 'write';

        axios({
            method : 'post',
            url : 'http://localhost:8080/todo/' + type,
            headers : {
                'Content-Type' : 'application/json'
            },
            data : todo
        })
        .then(response => {
            if(response.data.code == '0000'){
                _this.getTodoList();
            }else{
                alert(response.data.description);
            }
        });

    };


    checkIndex = (items) => {
        let index = 0;
        items.map(
            ({items}) => {
                items = items || [];
                if(items.length > 0){
                    index += this.checkIndex(items);
                }
                index++;
            }
        );
        return index;
    };

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



    todoCreate = () => {
        const{ input, inputType, modifyIdx, modifyParent, items } = this.state;

        if(inputType === 'modify' && typeof(modifyIdx) === 'number' && modifyIdx > 0 && modifyParent >= 0){

            let changeItems = [...items];

            let _index = changeItems.findIndex(items => items.idx === modifyIdx);
            let selected = changeItems[_index];

            changeItems[_index] = {
                ...selected,
                title : input
            };
            this.dataChange(changeItems[_index]);

        }else{
            let _this = this;
            let changeItems = [...items];
            if(input === '' || !input){
                alert('내용을 입력하세요.');
                return;
            }

            let inputItem = {
                parent : 0,
                title : input,
                use : 1
            };

            if(inputType == 'create' && modifyIdx > 0){
                inputItem.parent = modifyIdx;
            }
            _this.dataChange(inputItem);


        }
    };

    itemDelete = (idx, parent) => {
        const { items } = this.state;


        let changeItems = [...items];


        let _index = items.findIndex( (items) => items.idx === idx);

        this.dataChange(changeItems[_index], 'del');

    };
    itemUseChange = (idx, parent) => {
        const { items } = this.state;

        const _index = items.findIndex(items => items.idx === idx);

        const selected = items[_index];
        const changeItems = [...items]; //const changeItems = items;

        changeItems[_index] = {
            ...selected,
            use : !selected.use
        };

        this.dataChange(changeItems[_index]);
    };

    todoDelete = (idx, parent) => {
        confirmAlert({
            'title' : '삭제',
            'message' : '정말로 삭제하시겠습니까?',
            'buttons' : [
                {
                    label : '예',
                    onClick : () => this.itemDelete(idx, parent)
                },
                {
                    label : '아니요'
                }
            ]
        })
    };

    todoModify = (title, idx, parent, type) => {
        if(type === 'modify'){
            this.inputTitle = '수정';
        }else if(type === 'create' && parent === 0){
            this.inputTitle = '댓글 등록';
        }
        this.setState({
            input : (type === 'create') ? '' : title,
            inputType : type,
            modifyIdx : idx,
            modifyParent : parent
        });
    };

    todoReset = () => {
        this.inputTitle = '할일 등록';
        this.setState({
            input : '',
            inputType : 'create',
            modifyIdx : null,
            modifyParent : null
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

    todoDownload = () => {
        const {items} = this.state;
        let _this = this;

        let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(items));
        let downloadUrl = document.createElement('a');
        downloadUrl.setAttribute('href',dataStr);
        downloadUrl.setAttribute('download','todoItem.json');
        document.body.appendChild(downloadUrl);
        downloadUrl.click();
        downloadUrl.remove();
    };

    todoFileLoad = (e) => {
        let fileContent = (e.target.files[0]);

        let reader = new FileReader;

        reader.readAsText(fileContent);

        reader.onload = () => {

            this.setState({
                items : JSON.parse(reader.result)
            });

        };

        e.target.value = "";
    };


    render(){
        const { input, sortType,  items } = this.state;
        const { inputTitle, inputChange, inputKeyPress, todoCreate, todoDelete, itemUseChange, todoModify, todoReset, todoChangeSortType, todoDownload, todoFileLoad } = this;

        return (
            <div>
                <Template
                    form={
                        <Form input={ input }
                              inputTitle={ inputTitle }
                              sortType={ sortType }
                              onChange={ inputChange }
                              onKeyPress={ inputKeyPress }
                              todoSubmit={ todoCreate }
                              todoReset={ todoReset }
                              todoChangeSortType={ todoChangeSortType }
                              todoDownload={ todoDownload }
                              todoFileLoad={ todoFileLoad }
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