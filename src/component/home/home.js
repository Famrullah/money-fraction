import React, { Component } from 'react';
import Table from '../../hoc/Table/table';
import './_home.scss';

export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rupiah: [100000, 50000, 20000, 10000, 5000, 2000, 1000, 500, 100, 50],
      amount: '',
      list: [],
      rest: '',
      show_err: true
    };
    this.handleChange = this._handleChange.bind(this);
    this.handleSubmit = this._handleSubmit.bind(this);
    this._calc = this._calc.bind(this);
    this._formatIdr = this._formatIdr.bind(this);
    this._isNumber = this._isNumber.bind(this);
    this._validation = this._validation.bind(this);
    this._numberValidation = this._numberValidation.bind(this);
  }

  _handleChange(event) {
    let data = event.target.value.toLowerCase();
    this._validation(data);
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

  _isNumber(str) {
    const pattern = /^\d+$/;
    return pattern.test(str);
  }

  _handleSubmit(event) {
    event.preventDefault();
    this._calc();
  }

  // validation input value currency by rules
  _validation(value) {
    let data = value;
    const match = /rp./g;
    const results = data.match(match);
    if (results || this._isNumber(data)) {
      const number = data.replace(/rp./g, '');
      this._numberValidation(number);
    } else {
      this.setState({
        show_err: true,
        list: [],
        rest: '',
        amount: ''
      });
    }
  }

  // let data = value;
  // const match = /rp./g;
  // const results = data.match(match);
  // if value number after replace "Rp."
  _numberValidation(number) {
    if (this._isNumber(number)) {
      this.setState({
        show_err: false,
        amount: number
      });
    } else {
      this.setState({
        show_err: true,
        rest: '',
        amount: '',
        list: []
      });
    }
  }

  render() {
    return (
      <div className="home-page">
        <h1 className="title">Pecahan Mata Uang</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} />
          <input type="submit" disabled={this.state.show_err} value="Submit" />
          <h5 className="error">
            {this.state.show_err ? 'Invalid Input' : null}
          </h5>
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
