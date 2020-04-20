import React, { Component } from 'react'

export default class TradesTable extends Component {
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
                        <thead>
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
                        </thead>
                    </table>
                </div>
            </div>
        )
    }
}