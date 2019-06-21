import React, { Component } from 'react';
import Table from '../../hoc/Table/table';
import './_home.scss';

export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rupiah: [100000, 50000, 20000, 10000, 5000, 2000, 1000, 500, 100, 50],
      amount: null,
      list: [],
      rest: ''
    };
    this.handleChange = this._handleChange.bind(this);
    this.handleSubmit = this._handleSubmit.bind(this);
    this._calc = this._calc.bind(this);
    this._formatIdr = this._formatIdr.bind(this);
  }

  _handleChange(event) {
    const data = event.target.value;
    const replace = data.replace(/\D/g, '');
    this.setState({ amount: replace });
  }

  _formatIdr(money) {
    let number_string = money.toString();
    let split = number_string.split(',');
    let rest = split[0].length % 3;
    let rupiah = 'Rp' + split[0].substr(0, rest);
    let thousand = split[0].substr(rest).match(/\d{1,3}/gi);

    if (thousand) {
      let separator = rest ? '.' : '';
      rupiah += separator + thousand.join('.');
    }
    rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
    return rupiah;
  }

  _calc() {
    let { rupiah, amount } = this.state;
    const arr = [];
    rupiah.map(item => {
      if (amount >= item) {
        const sheet = Number(amount / item);
        amount = amount % item;
        console.log(this._formatIdr(item));
        arr.push({ fraction: item, sheet: Math.floor(sheet) });
        this.setState({
          list: arr,
          rest: amount
        });
      }
      return true;
    });
    return arr;
  }

  _handleSubmit(event) {
    event.preventDefault();
    this._calc();
  }

  render() {
    return (
      <div className="home-page">
        <h1 className="title">Pecahan Mata Uang</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="jumlah uang"
          />
          <input type="submit" value="Submit" />
        </form>
        <Table
          rest={this.state.rest}
          list={this.state.list}
          idr={e => this._formatIdr(e)}
        />
      </div>
    );
  }
}
