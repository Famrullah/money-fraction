import React, { Component } from 'react';
import Table from '../table/table';

export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rupiah: [100000, 50000, 20000, 10000, 5000, 1000, 500, 100, 50],
      amount: null,
      list: [],
      rest: null
    };
    this.handleChange = this._handleChange.bind(this);
    this.handleSubmit = this._handleSubmit.bind(this);
    this._calc = this._calc.bind(this);
    this._formatIdr = this._formatIdr.bind(this);
  }

  _handleChange(event) {
    this.setState({ amount: event.target.value });
  }

  _formatIdr(money) {
    const number_string = money.toString();
    const split = number_string.split(',');
    const rest = split[0].length % 3;
    let rupiah = split[0].substr(0, rest);
    const thousand = split[0].substr(rest).match(/\d{1,3}/gi);

    if (thousand) {
      const separator = rest ? '.' : '';
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
    console.log(this.state.list);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Ammount:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <Table data={this.state.amount} />
      </div>
    );
  }
}
