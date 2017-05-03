import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './index.css';
import QueryBar from './QueryBar.js';
import RecipeList from './RecipeList.js';
import IngredientFilter from './IngredientFilter.js';
import $ from 'jquery';



class App extends React.Component {

  constructor() {
    super();

    this.ingredientFilterList = [];

    this.state = {
      recipes: [],
      ingredientFilterList: [],
      filterInputValue: '',
      queryInputValue: ''
    }

    this.handleQuery = this.handleQuery.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleRemoveFilter = this.handleRemoveFilter.bind(this);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
  }

  query() {

    let filterQuery = '&i=';
    filterQuery += this.ingredientFilterList.join();

    var url = '/api/?q=' + this.queryValue + filterQuery;
    console.log('what url am I using?', url)

    $.ajax({
      url: url
    })
    .done(x => {
      x = JSON.parse(x);
      //console.log(x);
      this.setState({
        recipes: x.results
      })
    });
  }

  handleQuery(queryValue) {
    this.query();
  }

  handleQueryChange(queryValue) {
    this.queryValue = queryValue;
    this.setState({
      queryInputValue: queryValue
    })
  }

  handleFilterChange(item) {
    var ingredients = this.ingredientFilterList.slice();
    ingredients.push(item);
    this.ingredientFilterList = ingredients;

    this.setState({
      ingredientFilterList: ingredients,
      filterInputValue: ''
    });
    this.query();
  }

  handleFilterTextChange(text) {
    this.setState({
      filterInputValue: text
    });
  }

  handleRemoveFilter(i) {
    let ingredients = this.ingredientFilterList.slice();
    ingredients.splice(i, 1);
    this.ingredientFilterList = ingredients;
    this.setState({
      ingredientFilterList: ingredients
    });
    this.query();
  }

  render() {

    let filter;
    if (this.state.recipes.length > 0 || this.state.ingredientFilterList.length > 0) {
      filter = <IngredientFilter
        onFilterChange={this.handleFilterChange}
        filters={this.state.ingredientFilterList}
        onRemoveFilter={this.handleRemoveFilter}
        inputValue={this.state.filterInputValue}
        onFilterTextChange={this.handleFilterTextChange} />
    }

    return (
      <div>
        <header>
          <h1 className="container">My Recipe App</h1>
        </header>
        <div className="contents container">
          <QueryBar
            onQuery={this.handleQuery}
            onQueryChange={this.handleQueryChange}
            inputValue={this.state.queryInputValue}
            />
          <RecipeList recipes={this.state.recipes} />
          {filter}
          <footer>This app is built with <a href="http://recipepuppy.com"><img src="recipepuppy.png" alt="recipe puppy" /></a>.</footer>
        </div>
      </div>
    );
  }
}





ReactDOM.render(
  <App />,
  document.getElementById('root')
);
