import React, { Component } from 'react'
import http from 'axios';
import NotificationSystem from 'react-notification-system';

export default class TradesTable extends Component {
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
    }

    render() {
        return (
            < div >
                <NotificationSystem ref={this.notificationSystem} />
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
                        {this.props.trades.length > 0 && (<thead>
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
                            {this.props.trades.map((x, index) => {
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
                                    <td><a onClick={(e) => this.props.showHistory(e, x.id)}>نمایش</a></td>
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