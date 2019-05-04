import React, { Component } from 'react';
import Template from "./template";
import Modal from "./modal";
import Form from "./form";
import List from "./list";

class App extends Component {

    idx = 0;
    state = {
        input : '',
        items : []
    }

    componentWillMount() {
        console.log('App componentWillMount (deprecated)');
        const { state } = this;

        state.items = require('./todoItem.json');
    }

    inputChange = (e) => {
        this.setState({
            input : e.target.value
        })
    };

    todoCreate = () => {
        const{ input, items} = this.state;
        if(input == '' || !input){
            alert('내용을 입력하세요.');
            return;
        }
        this.setState({
            input : '',
            items : items.concat({
                idx : this.idx++,
                title : input,
                use : 1
            })
        });
    };

    render(){
        const { input, items } = this.state;
        const { inputChange, todoCreate } = this;

        return (
            <div>
                <Template
                    form={
                        <Form value={ input }
                              onChange={ inputChange }
                              todoSubmit={ todoCreate }
                        />
                    }
                    list={
                        <List items={ items }
                        />
                    }
                />
                <Modal />
            </div>

        )
    }
}

export default App;