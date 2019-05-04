import React, { Component } from 'react';

import './template.css';

class Template extends Component {

    render(){
        const {form, list} = this.props;
        return (
            <div className="container pt30">
                <div className="panel">
                    <h2>REACT TODO LIST</h2>
                </div>
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        todolist
                    </div>
                    <div className="panel-body">
                        {form}
                    </div>
                    <div className="panel-footer">
                        {list}
                    </div>
                </div>
            </div>
        )
    }
}

export default Template;