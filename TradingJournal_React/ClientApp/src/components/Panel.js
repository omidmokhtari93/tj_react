
import React, { Component } from 'react';
import TradesTable from './Table';

export default class Panel extends Component {
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
            file: null
        }
    }

    handleChange = e => {
        e.target.id == 'file'
            ? this.setState({ [e.target.id]: e.target.files[0] })
            : this.setState({ [e.target.id]: e.target.value });
    }

    submitForm = e => {
        console.log(this.state)
    }

    brokerTimeDate = e => {
        let d = new Date();
        d.setMinutes(d.getMinutes() - 30);
        d.setHours(d.getHours() - 1);
        let time = d.getFullYear() + "-"
            + (((d.getMonth() + 1) < 10 ? '0' : '') + d.getMonth()) + "-"
            + ((d.getDate() < 10 ? '0' : '') + d.getDate()) + " "
            + d.getHours() + ":" + ((d.getMinutes() < 10 ? '0' : '') + d.getMinutes());
        this.setState({ [e.target.id]: time })
        e.target.value = time;
    }

    editTrade = e => {
        console.log(e)
    }

    render() {
        return (
            <div className="container sans p-4">
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
                                    <input type="file" className="mt-3" id="file"
                                        onChange={this.handleChange} />
                                </div>
                                <div className="col-sm-6 text-left pt-3">
                                    <div className="spinner-border ml-2 loading" role="status"
                                        style={{ verticalAlign: 'middle', display: 'none' }}>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                    <button className="btn btn-primary" id="sabt" onClick={this.submitForm}>ثبت</button>
                                    <button className="btn btn-danger" id="edit" style={{ display: 'none' }}>
                                        ویرایش
                                </button>
                                    <button className="btn btn-success" id="cancel" style={{ display: 'none' }}>
                                        انصراف
                                </button>
                                </div>
                            </div>
                        </div>
                        <TradesTable editTrade={this.editTrade} />
                    </div>
                </div>
            </div >
        )
    }
}