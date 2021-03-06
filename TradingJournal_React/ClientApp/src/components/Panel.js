
import React, { Component } from 'react';
import TradesTable from './Table';
import getTimeDate from '../Shared/BrokerTimeDate'
import http from 'axios';
import NotificationSystem from 'react-notification-system';
import TradeModal from './Modal';
import LoadingBar from 'react-top-loading-bar';

export default class Panel extends Component {
    notificationSystem = React.createRef();
    addNotification = (message, type) => {
        const notification = this.notificationSystem.current;
        notification.addNotification({
            message: message,
            level: type,
            position: 'tl',
            autoDismiss: 3
        });
    };
    constructor(props) {
        super(props);
        this.state = {
            enterdate: '',
            closedate: '',
            symbol: '',
            volume: '',
            profit: '',
            tradereason: '',
            enterravani: '',
            closeravani: '',
            mistakes: '',
            comment: '',
            file: null,
            filePath: '',
            editActive: false,
            editButton: null,
            editId: null,
            trades: [],
            isOpen: false,
            tradeData: {}
        }
    }

    componentDidMount() {
        this.state.symbol === '' && this.setState({ symbol: document.getElementById('symbol').options[0].value })
        this.getTrades();
    }

    getTrades = e => {
        this.LoadingBar.continuousStart()
        http.get('/GetTrades', { params: { id: -1, startDate: -1, endDate: -1 } }).then(x => {
            this.setState({ trades: x.data })
            this.LoadingBar.complete()
        }).catch(() => {
            this.addNotification('خطا در دریافت اطلاعات', 'error');
        });
    }

    getformData = action => {
        return {
            enterdate: this.state.enterdate,
            closedate: this.state.closedate,
            symbol: this.state.symbol == '' ? document.getElementById('symbol').options[0].value : this.state.symbol,
            volume: this.state.volume,
            profit: this.state.profit,
            tradereason: this.state.tradereason,
            enterravani: this.state.enterravani,
            closeravani: this.state.closeravani,
            mistakes: this.state.mistakes,
            comment: this.state.comment,
            id: this.state.editId
        }
    }

    handleChange = e => {
        e.target.id == 'file'
            ? this.setState({ [e.target.id]: e.target.files[0] })
            : this.setState({ [e.target.id]: e.target.value });
    }

    submitForm = e => {
        if (this.state.enterdate == '' || this.state.volume == '') {
            this.addNotification('لطفا فیلدهای خالی را تکمیل کنید', 'error')
            return;
        }
        this.LoadingBar.continuousStart()
        var fd = new FormData();
        fd.append('img', this.state.file);
        fd.append('data', JSON.stringify(this.getformData()));
        http.post('/SaveTrade', fd).then(e => {
            this.addNotification(e.data.message, e.data.type);
            this.getTrades();
            this.resetState();
            this.LoadingBar.complete()
        }).catch(() => this.addNotification('خطا در ثبت', 'error'))
    }

    brokerTimeDate = e => {
        if (e.target.value == '') {
            let time = getTimeDate()
            this.setState({ [e.target.id]: time })
            e.target.value = time
        }
    }

    editTrade = (el, id) => {
        this.LoadingBar.continuousStart()
        this.state.editButton != null && (this.state.editButton.style.color = '')
        el.target.style.color = 'red'
        this.setState({ editActive: true, editButton: el.target })
        http.get('/GetTrades', { params: { id: id, startDate: -1, endDate: -1 } }).then(x => {
            this.setState({
                enterdate: x.data[0].enterDate,
                closedate: x.data[0].closeDate,
                symbol: x.data[0].symbol,
                volume: x.data[0].volume,
                profit: x.data[0].profit,
                tradereason: x.data[0].tradeReason,
                enterravani: x.data[0].enterRavani,
                closeravani: x.data[0].closeRavani,
                mistakes: x.data[0].mistakes,
                comment: x.data[0].comment,
                filePath: x.data[0].filePath,
                editId: x.data[0].id
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.LoadingBar.complete()
        })
    }

    acceptEdit = e => {
        if (this.state.enterdate == '' || this.state.volume == '') {
            this.addNotification('لطفا فیلدهای خالی را تکمیل کنید', 'error')
            return;
        }
        this.LoadingBar.continuousStart()
        var fd = new FormData();
        fd.append('img', this.state.file);
        fd.append('data', JSON.stringify(this.getformData()));
        http.post('/EditTrade', fd).then(e => {
            this.state.editButton.style.color = '';
            this.setState({ editActive: false });
            this.addNotification('با موفقیت ویرایش شد', 'success');
            this.resetState();
            this.getTrades();
            this.LoadingBar.complete()
        }).catch(() => this.addNotification('خطا در ثبت', 'error'))
    }


    cancelEdit = e => {
        this.state.editButton.style.color = '';
        this.resetState();
    }

    resetState = e => {
        this.setState({
            enterdate: '',
            closedate: '',
            symbol: '',
            volume: '',
            profit: '',
            tradereason: '',
            enterravani: '',
            closeravani: '',
            mistakes: '',
            comment: '',
            file: null,
            filePath: '',
            editActive: false,
            editButton: null,
            editId: null
        })
        document.getElementById('file').value = '';
    }

    showModal = (el, id) => {
        if (el == 'close') {
            this.setState({ isOpen: false })
        } else {
            this.LoadingBar.continuousStart()
            http.get('/GetTrades', { params: { id: id, startDate: -1, endDate: -1 } }).then(x => {
                var trade = {
                    enterdate: x.data[0].enterDate,
                    closedate: x.data[0].closeDate,
                    symbol: x.data[0].symbol,
                    volume: x.data[0].volume,
                    profit: x.data[0].profit,
                    tradereason: x.data[0].tradeReason,
                    enterravani: x.data[0].enterRavani,
                    closeravani: x.data[0].closeRavani,
                    mistakes: x.data[0].mistakes,
                    comment: x.data[0].comment,
                    filePath: x.data[0].filePath,
                }
                this.setState({ isOpen: true, tradeData: trade })
                this.LoadingBar.complete()
            })
        }
    }

    render() {
        return (
            <div className="container sans p-4">
                <LoadingBar
                    height={3}
                    color='#f11946'
                    onRef={ref => (this.LoadingBar = ref)}
                />
                <NotificationSystem ref={this.notificationSystem} />
                <ul className="nav nav-tabs rtl" id="myTab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="home-tab" data-toggle="tab"
                            href="#home" role="tab" aria-controls="home" aria-selected="true">ثبت</a>
                    </li>
                    <li style={{ alignSelf: 'center' }} className="pointer mr-3">
                        <a>خروج</a>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" role="tabpanel" aria-labelledby="home-tab">
                        <div id="home">
                            <div className="row rtl text-right">
                                <div className="col-sm-6">
                                    <div className="mt-1">زمان ورود به معامله</div>
                                    <input className="form-control text-center ltr" id="enterdate"
                                        onChange={this.handleChange} onFocus={(e) => { this.brokerTimeDate(e) }} required
                                        value={this.state.enterdate} style={{ fontFamily: 'arial' }} />
                                </div>
                                <div className="col-sm-6">
                                    <div className="mt-1">زمان خروج از معامله</div>
                                    <input className="form-control text-center ltr" id="closedate"
                                        onChange={this.handleChange} onFocus={(e) => { this.brokerTimeDate(e) }}
                                        value={this.state.closedate} style={{ fontFamily: 'arial' }} />
                                </div>
                            </div>
                            <div className="row rtl text-right">
                                <div className="col-sm-4">
                                    <div className="mt-1">نماد</div>
                                    <select className="form-control ltr" id="symbol" required
                                        onChange={this.handleChange} value={this.state.symbol}>
                                        <option>DOWJONES</option>
                                        <option>GOLD</option>
                                        <option>EURUSD</option>
                                        <option>USDJPY</option>
                                        <option>GBPUSD</option>
                                        <option>USDCAD</option>
                                        <option>USDCHF</option>
                                        <option>CADCHF</option>
                                        <option>CADJPY</option>
                                        <option>CHFJPY</option>
                                        <option>EURCHF</option>
                                        <option>EURCAD</option>
                                        <option>EURGBP</option>
                                        <option>EURJPY</option>
                                        <option>GBPCAD</option>
                                        <option>AUDUSD</option>
                                        <option>NZDUSD</option>
                                    </select>
                                </div>
                                <div className="col-sm-4">
                                    <div className="mt-1">حجم معامله (Lot)</div>
                                    <input className="form-control text-center ltr" type="number" id="volume"
                                        required onChange={this.handleChange} value={this.state.volume} />
                                </div>
                                <div className="col-sm-4">
                                    <div className="mt-1">سود / ضرر ($)</div>
                                    <input className="form-control text-center ltr" type="number" id="profit" required
                                        onChange={this.handleChange} value={this.state.profit} />
                                </div>
                            </div>
                            <div className="row rtl text-right">
                                <div className="col-sm-4">
                                    <div className="mt-1">دلایل ورود به معامله</div>
                                    <textarea rows="3" className="form-control no-resize" id="tradereason"
                                        onChange={this.handleChange} value={this.state.tradereason}></textarea>
                                </div>
                                <div className="col-sm-4">
                                    <div className="mt-1">حالت روانی ورود به معامله</div>
                                    <textarea rows="3" className="form-control no-resize" id="enterravani"
                                        onChange={this.handleChange} value={this.state.enterravani}></textarea>
                                </div>
                                <div className="col-sm-4">
                                    <div className="mt-1">حالت روانی خروج از معامله</div>
                                    <textarea rows="3" className="form-control no-resize" id="closeravani"
                                        onChange={this.handleChange} value={this.state.closeravani}></textarea>
                                </div>
                            </div>
                            <div className="row rtl text-right">
                                <div className="col-sm-6">
                                    <div className="mt-1">اشتباهات</div>
                                    <textarea rows="3" className="form-control no-resize" id="mistakes"
                                        onChange={this.handleChange} value={this.state.mistakes}></textarea>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mt-1">توضیحات</div>
                                    <textarea rows="3" className="form-control no-resize" id="comment"
                                        onChange={this.handleChange} value={this.state.comment}></textarea>
                                </div>
                            </div>
                            <div className="row rtl text-right">
                                <div className="col-sm-6">
                                    <input type="file" className="mt-3" id="file" accept="image/png"
                                        onChange={this.handleChange} />
                                    {this.state.filePath.length > 0 &&
                                        (<a className="linkButton" href={"uploads/" + this.state.filePath} target="_blank">download file</a>)}
                                </div>
                                <div className="col-sm-6 text-left pt-3">
                                    <div className="spinner-border ml-2 loading" role="status"
                                        style={{ verticalAlign: 'middle', display: 'none' }}>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                    {this.state.editActive
                                        ? <div>
                                            <button className="btn btn-danger ml-1" id="edit" onClick={this.acceptEdit}>ویرایش</button>
                                            <button className="btn btn-success" id="cancel" onClick={this.cancelEdit}>انصراف</button>
                                        </div>
                                        : <button className="btn btn-primary" id="sabt" onClick={this.submitForm}>ثبت</button>
                                    }
                                </div>
                            </div>
                        </div>
                        <TradesTable editTrade={this.editTrade} trades={this.state.trades} showHistory={this.showModal} />
                        <TradeModal isOpen={this.state.isOpen} handleShow={this.showModal} tradeData={this.state.tradeData} />
                    </div>
                </div>
            </div >
        )
    }
}