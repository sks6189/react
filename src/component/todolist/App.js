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

        //state.items = require('./todoItem.json');

        const res = async() => {
            let result = axios.get('http://localhost:8080/todo');
            let {items} = result.data;

            _this.setState({
                items : items
            })

            //console.log(data);
        };

        /*let result = axios.get('http://localhost:8080/todo');

        console.log(result);

        console.log(res);

        console.log(state.items);*/

        this.idx = this.checkIndex(state.items) + 1;
    }

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
        )
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

            if(modifyParent > 0){
                let parent_index = changeItems.findIndex(items => items.idx === modifyParent);
                let modifyItems = changeItems[parent_index].items;
                let _index = modifyItems.findIndex(items => items.idx === modifyIdx);

                changeItems[parent_index].items[_index] = {
                    ...modifyItems[_index],
                    title: input

                };

            }else{
                // idx 값 체크
                let _index = changeItems.findIndex(items => items.idx === modifyIdx);
                let selected = changeItems[_index];

                changeItems[_index] = {
                    ...selected,
                    title : input
                };

            }
            this.setState({
                items : changeItems
            });

            this.todoReset();
        }else{
            let changeItems = [...items];
            if(input === '' || !input){
                alert('내용을 입력하세요.');
                return;
            }

            let inputItem = {
                idx : this.idx++,
                parent : 0,
                title : input,
                use : true,
                items : []
            };

            if(inputType == 'create' && modifyIdx > 0){
                inputItem.parent = modifyIdx;
                let parent_index = changeItems.findIndex(items => items.idx === modifyIdx);

                changeItems[parent_index].items = changeItems[parent_index].items.concat(inputItem);

            }else{
                changeItems = changeItems.concat(inputItem);
            }

            this.setState({
                items : changeItems
            });

            this.todoReset();
        }
    };

    itemDelete = (idx, parent) => {
        const { items } = this.state;


        let changeItems = [...items];

        if(parent > 0){
            let parent_index = items.findIndex( (items) => items.idx === parent);
            let deleteItems = changeItems[parent_index].items;

            changeItems[parent_index].items = deleteItems.filter(items => items.idx !== idx);

        }else{
            changeItems = changeItems.filter(items => items.idx !== idx);
        }

        this.setState({
            items : changeItems
        });

    };
    itemUseChange = (idx, parent) => {
        const { items } = this.state;

        // idx 값 체크
        // 1depth
        if(parent < 1){
            const _index = items.findIndex(items => items.idx === idx);

            const selected = items[_index];
            const changeItems = [...items]; //const changeItems = items;


            changeItems[_index] = {
                ...selected,
                use : !selected.use
            };


            this.setState({
                items : changeItems
            });
        }else{
            // 2depth로 들어갈 때
            const parent_index = items.findIndex( (items) => items.idx === parent);

            const _index = items[parent_index].items.findIndex( (items) => {
                return items.idx === idx;
            });

            const selected = items[parent_index].items[_index];
            const changeItems = [...items];

            changeItems[parent_index].items[_index] = {
                ...selected,
                use : !selected.use
            };

            this.setState({
                items : changeItems
            });
        }

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

        /*let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(items));
        let downloadUrl = document.createElement('a');
        downloadUrl.setAttribute('href',dataStr);
        downloadUrl.setAttribute('download','todoItem.json');
        document.body.appendChild(downloadUrl);
        downloadUrl.click();
        downloadUrl.remove();*/



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