import React, { Component } from 'react';

import './template.css';

class Modal extends Component {

    render(){
        return (
            <div className="modal fade" id="detail-modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title">정보 수정</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-inline" id="">
                                <div className="input-group col-md-12">
                                    <div className="input-group-addon">내용</div>
                                    <input className="form-control" value="" placeholder="내용을 입력해주세요"/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">취소</button>
                            <button type="button" className="btn btn-primary">수정</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;