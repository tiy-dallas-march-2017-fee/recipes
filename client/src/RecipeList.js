import React from 'react';
import './recipe-list.css';

class RecipeList extends React.Component {
  render() {

    let list = this.props.recipes.map((x, i) => {

      var imgUrl = x.thumbnail;
      if (imgUrl === '') {
        imgUrl = 'no-image-available.png';
      }

      return <li key={i}>
        <img src={imgUrl} alt={x.title} />
        <div className="details">
          <h2><a href={x.href} target="_self">{x.title}</a></h2>
          <div>Ingredients: {x.ingredients}</div>
        </div>
      </li>;
    });

    let temp;
    if (this.props.recipes.length === 0) {
      temp = <p>Run a search to see recipes.</p>
    }



    return (
      <div className="recipe-list">
        {temp}
        <ol>
          {list}
        </ol>
      </div>
    )
  }
}

module.exports = RecipeList;
