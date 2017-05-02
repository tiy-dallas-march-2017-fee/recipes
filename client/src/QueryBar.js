import React from 'react';
import './css/query-bar.css'

class QueryBar extends React.Component {

  constructor() {
    super();

    this.state = {
      queryValue: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }



  handleKeyUp(evt) {
    if (evt.keyCode === 13) {
      this.props.onQuery(this.state.queryValue);
      this.setState({
        queryValue: ''
      })
    }

  }

  handleChange(evt) {
    this.setState({
      queryValue: evt.target.value
    })
  }

  render() {
    return (
      <div className="query-bar">
        <input value={this.state.queryValue}
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
          placeholder="Search Query" />
      </div>
    );
  }

}

module.exports = QueryBar;
