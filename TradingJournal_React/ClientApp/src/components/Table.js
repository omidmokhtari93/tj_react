import React, { Component } from 'react'
import http from 'axios';

export default class TradesTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trades: []
        }
    }

    componentDidMount() {
        http.get('/GetTrades', { params: { id: -1, startDate: -1, endDate: -1 } }).then(x => {
            this.setState({ trades: x.data })
        });
    }

    showHistory = (e, id) => {
        console.log(id)
    }

    render() {
        return (
            <div>
                <hr />
                <div className="row rtl text-right mt-2" id="FilterArea">
                    <div className="col-sm-5">
                        <input className="form-control ltr text-center mt-1" required id="filterStartDate" readOnly style={{ fontFamily: 'arial' }} />
                    </div>
                    <div className="col-sm-5">
                        <input className="form-control ltr text-center mt-1" required id="filterEndDate" readOnly style={{ fontFamily: 'arial' }} />
                    </div>
                    <div className="col-sm-2">
                        <button className="btn btn-block btn-primary mt-1">فیلتر</button>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-bordered table-hover mt-3" id="tablejournals">
                        {this.state.trades.length > 0 && (<thead>
                            <tr>
                                <th>ردیف</th>
                                <th>نماد</th>
                                <th>زمان ورود به معامله</th>
                                <th>زمان خروج از معامله</th>
                                <th>حجم معاملاتی</th>
                                <th>سود / ضرر</th>
                                <th>تصویر</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>)}
                        <tbody>
                            {this.state.trades.map((x, index) => {
                                return <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{x.symbol}</td>
                                    <td>{x.enterDate}</td>
                                    <td>{x.closeDate}</td>
                                    <td>{x.volume}</td>
                                    <td style={{
                                        backgroundColor: parseFloat(x.profit) < 0
                                            ? 'lightcoral' : 'lightgreen'
                                    }}>{x.profit}</td>
                                    <td>{x.filePath.length > 0 ? 'دارد' : 'ندارد'}</td>
                                    <td><a onClick={(e) => this.showHistory(e, x.id)}>نمایش</a></td>
                                    <td><a onClick={(e) => this.props.editTrade(e, x.id)}>ویرایش</a></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div >
        )
    }
}