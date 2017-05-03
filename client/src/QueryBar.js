import React from 'react';
import './css/query-bar.css'

class QueryBar extends React.Component {

  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }



  handleKeyUp(evt) {
    if (evt.keyCode === 13) {
      this.props.onQuery();
    }

  }

  handleChange(evt) {
    this.props.onQueryChange(evt.target.value);
  }

  render() {
    return (
      <div className="query-bar">
        <input value={this.props.inputValue}
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
          placeholder="Search Query" />
      </div>
    );
  }

}

module.exports = QueryBar;
