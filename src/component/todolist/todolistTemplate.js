import React, { Component } from 'react';

class Todolist extends Component {

    render(){
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
                        <div className="form-group">
                            <div className="col-md-11">
                                <div className="input-group">
                                    <div className="input-group-addon">할일 등록</div>
                                    <input type="text" className="form-control" value="" placeholder="내용을 입력해주세요" />
                                </div>
                            </div>
                            <div className="col-md-1">
                                <button className="btn btn-primary">등록</button>
                            </div>

                        </div>
                    </div>
                    <div className="panel-footer">
                        <div className="list-group">
                            <a href="#" className="list-group-item" data-toggle="modal" data-target="#detail-modal">
                                <p className="list-group-item-heading">등록글 1</p>
                            </a>
                            <a href="#" className="list-group-item" data-toggle="modal" data-target="#detail-modal">
                                <p className="list-group-item-heading">등록글 2</p>
                            </a>
                            <a href="#" className="list-group-item list-group-item-danger">
                                <p className="list-group-item-heading">등록글 3</p>
                            </a>
                            <a href="#" className="list-group-item" data-toggle="modal" data-target="#detail-modal">
                                <p className="list-group-item-heading">등록글 4</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Todolist;