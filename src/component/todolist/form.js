import React, { Component } from 'react';

class Form extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.input !== nextProps.input;
    }

    render(){
        const { input, modifyIdx, onChange, onKeyPress, todoSubmit, todoReset } = this.props;
        return (
            <div className="form-group">
                <div className="col-md-10">
                    <div className="input-group">
                        <div className="input-group-addon">할일 등록</div>
                        <input type="text"
                               className="form-control"
                               value={input}
                               placeholder="내용을 입력해주세요"
                               onChange={onChange}
                               onKeyPress={onKeyPress}
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <button
                        className="btn btn-primary"
                        onClick={ () => {
                            todoSubmit( (typeof(modifyIdx) === 'number' && modifyIdx >= 0) && 'modify', modifyIdx )
                        }}
                    >
                        등록
                    </button>
                    <button
                        className="btn btn-success"
                        onClick={ todoReset }
                    >
                        초기화
                    </button>
                </div>
            </div>
        )
    }
}

export default Form;