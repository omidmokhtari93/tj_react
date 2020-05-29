import React, { Component } from 'react';

class TradeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: '',
            display: 'none'
        }
    }
    openModal = e => {
        this.setState({
            modalShow: 'show',
            display: 'block'
        });
    }

    closeModal = e => {
        this.setState({
            modalShow: '',
            display: 'none'
        });
    }
    componentDidMount() {
        console.log(this.state)
        this.props.isOpen ? this.openModal() : this.closeModal();
    }

    componentWillReceiveProps(){
        console.log(this.props)
        this.props.isOpen ? this.openModal() : this.closeModal();
    }

    render() {
        return (
            <div className={'modal fade ' + this.state.modalShow}
                tabIndex="-1" role="dialog"
                aria-hidden="true" id="trademodal"
                style={{ display: this.state.display }}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <img className="trade-image" src={this.props.filePath} />
                        <div className="card-body rtl text-right">
                            <p>
                                <span className="badge badge-primary">زمان رود به معامله : </span>
                                {this.props.enterDate}
                            </p>
                            <p>
                                <span className="badge badge-primary">زمان خروج از معامله : </span>
                                {this.props.endDate}
                            </p>
                            <p>
                                <span className="badge badge-primary">نماد :</span>
                                {this.props.symbol}
                            </p>
                            <p>
                                <span className="badge badge-primary">حجم معاملاتی : </span>
                                {this.props.volume}
                            </p>
                            <p>
                                <span className="badge badge-primary">سود / ضرر : </span>
                                {this.props.profit}
                            </p>
                            <p>
                                <span className="badge badge-primary">دلایل ورود به معامله : </span>
                                {this.props.enterReason}
                            </p>
                            <p>
                                <span className="badge badge-primary">حالت روانی ورود به معامله : </span>
                                {this.props.enterRavani}
                            </p>
                            <p>
                                <span className="badge badge-primary">حالت روانی خروج از معامله : </span>
                                {this.props.closeRavani}
                            </p>
                            <p>
                                <span className="badge badge-primary">اشتباهات : </span>
                                {this.props.mistakes}
                            </p>
                            <p>
                                <span className="badge badge-primary">توضیحات : </span>
                                {this.props.comment}
                            </p>
                            <div className="text-left">
                                <button className="btn btn-danger" onClick={this.closeModal}>بستن</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default TradeModal;