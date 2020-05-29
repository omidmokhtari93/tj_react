import React, { Component } from 'react';
import Modal from 'react-bootstrap4-modal';

class TradeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    render() {
        return (
            <Modal visible={this.props.isOpen}
                onClickBackdrop={() => this.props.handleShow('close', 0)}>
                <img className="trade-image" src={"uploads/" + this.props.tradeData.filePath} />
                <div className="card-body text-right rtl">
                    <p>
                        <span className="badge badge-primary ml-2">زمان رود به معامله : </span>
                        {this.props.tradeData.enterdate}
                    </p>
                    <p>
                        <span className="badge badge-primary ml-2">زمان خروج از معامله : </span>
                        {this.props.tradeData.closedate}
                    </p>
                    <p>
                        <span className="badge badge-primary ml-2">نماد :</span>
                        {this.props.tradeData.symbol}
                    </p>
                    <p>
                        <span className="badge badge-primary ml-2">حجم معاملاتی : </span>
                        {this.props.tradeData.volume}
                    </p>
                    <p>
                        <span className="badge badge-primary ml-2">سود / ضرر : </span>
                        {this.props.tradeData.profit}
                    </p>
                    <p>
                        <span className="badge badge-primary ml-2">دلایل ورود به معامله : </span>
                        {this.props.tradeData.tradereason}
                    </p>
                    <p>
                        <span className="badge badge-primary ml-2">حالت روانی ورود به معامله : </span>
                        {this.props.tradeData.enterravani}
                    </p>
                    <p>
                        <span className="badge badge-primary ml-2">حالت روانی خروج از معامله : </span>
                        {this.props.tradeData.closeravani}
                    </p>
                    <p>
                        <span className="badge badge-primary ml-2">اشتباهات : </span>
                        {this.props.tradeData.mistakes}
                    </p>
                    <p>
                        <span className="badge badge-primary ml-2">توضیحات : </span>
                        {this.props.tradeData.comment}
                    </p>
                </div>
                <div className="card-footer text-left">
                    <button className="btn btn-primary" onClick={() => this.props.handleShow('close', 0)}>بستن</button>
                </div>
            </Modal>
        )
    }
}


export default TradeModal;