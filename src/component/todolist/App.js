import React, { Component } from 'react';
import Template from "./template";
import Modal from "./modal";
import Form from "./form";
import List from "./list";

class App extends Component {

    items = [
        {"title" : "Number1", "contents" : "text1"},
        {"title" : "Number2", "contents" : "text2"},
        {"title" : "Number3", "contents" : "text3"}
    ];

    render(){
        return (
            <div>
                <Template
                    form={<Form />}
                    list={<List items={this.items}/>}
                />
                <Modal />
            </div>

        )
    }
}

export default App;