import React from 'react';
import './css/ingredient-filter.css';

class IngredientFilter extends React.Component {

  constructor() {
    super();

    this.state = {
      inputValue: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleKeyUp(evt) {
    if (evt.keyCode === 13) {
      this.props.onFilterChange(this.state.inputValue);
      this.setState({
        inputValue: ''
      })
    }
  }

  handleChange(evt) {
    this.setState({
      inputValue: evt.target.value
    })
  }

  render() {

    var ingredientList = this.props.filters.map((x, i) =>  {
      return <li
        key={i + x}
        onClick={() => this.props.onRemoveFilter(i)}>{x}</li>
    });

    return (
      <div className="ingredient-filter">

        <h2>Would you also like to filter by ingredients?</h2>

        <input value={this.state.inputValue}
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
          placeholder="ingredient" />

        <ol>
          {ingredientList}
        </ol>
      </div>
    )
  }
}

module.exports = IngredientFilter;
