import React, { Component } from 'react';

class Form extends Component {

    render(){
        const { input, onChange, todoSubmit } = this.props;
        return (
            <div className="form-group">
                <div className="col-md-11">
                    <div className="input-group">
                        <div className="input-group-addon">할일 등록</div>
                        <input type="text"
                               className="form-control"
                               value={input}
                               placeholder="내용을 입력해주세요"
                               onChange={onChange}
                        />
                    </div>
                </div>
                <div className="col-md-1">
                    <button
                        className="btn btn-primary"
                        onClick={ todoSubmit }
                    >
                        등록
                    </button>
                </div>
            </div>
        )
    }
}

export default Form;