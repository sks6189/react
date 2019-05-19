import React, { Component } from 'react';

class Form extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.input !== nextProps.input;
    }

    render(){
        const { input, modifyIdx, sortType, onChange, onKeyPress, todoSubmit, todoReset, todoChangeSortType } = this.props;
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
                <div className="col-md-12">
                    <div className="input-group">
                        <div className="input-group-addon">정렬</div>
                        <select className="form-control"
                                onChange={(e)=>{
                                    todoChangeSortType(e.target.value);
                                }}
                                defaultValue={sortType}>
                            <option value="default">기본</option>
                            <option value="name">이름</option>
                            <option value="use">사용여부</option>
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}

export default Form;