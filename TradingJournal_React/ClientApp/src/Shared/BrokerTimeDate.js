const BrokerTimeDate = (e) => {
    var d = new Date();
    d.setMinutes(d.getMinutes() - 30);
    d.setHours(d.getHours() - 1);
    e.target.value.length > 0 ? e.target.value = ""
        : e.target.value = d.getFullYear() + "-"
        + (((d.getMonth() + 1) < 10 ? '0' : '') + d.getMonth()) + "-"
        + ((d.getDate() < 10 ? '0' : '') + d.getDate()) + " " 
        + d.getHours() + ":" + ((d.getMinutes() < 10 ? '0' : '') + d.getMinutes());
}

export default BrokerTimeDate;