import React, { Component } from "react";
import ReactPlayer from "react-player";
import "../css/meal.scss";

export default class Meal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meal: this.props.meal,
      showDetails: false,
      playVideo: false,
      showIngredients: false,
      ingredientsList: [],
    };
    this.mapIngredients();
  }

  componentDidMount() {
    this.mapIngredients();
  }

  mapIngredients = () => {
    let ingredients = [];
    let n = 0;
    while (n++ <= 20 && this.props?.meal?.["strIngredient" + n]) {
      let obj = {
        item: this.props.meal["strIngredient" + n],
        quantity: this.props.meal["strMeasure" + n],
      };
      ingredients.push(obj);
    }

    this.setState({ ingredientsList: ingredients });
    console.log(this.state, ingredients);
  };

  updateValue = (event) => {
    let name = event.target.name;
    this.setState({ [name]: !this.state[name] });
    console.log(name);
    console.log(this.state);
  };

  render() {
    let mealObj = undefined;
    if (!this.state.meal) {
      return (
        <h3>
          Sorry, unable to fetch data! please refresh or retry after some time
        </h3>
      );
    } else {
      mealObj = this.state.meal;
    }
    return (
      <div className="random-container">
        <div className="card">
          <div className="card-body">
            {this.state.playVideo ? (
              <ReactPlayer
                className="cust-video"
                url={mealObj?.strYoutube}
                controls={true}
              />
            ) : (
              <img src={mealObj?.strMealThumb} alt="nothing found" />
            )}
            <div className="details">
              <h3>{mealObj?.strMeal}</h3>
              <h6>
                <span className="head">Category:</span> {mealObj?.strCategory}
              </h6>
              <h6>
                <span className="head">Tags:</span> {mealObj?.strTags}
              </h6>
              <h6>
                <span className="head">From: </span> {mealObj?.strArea}
              </h6>
              <h6>
                <button onClick={this.updateValue} name="playVideo">
                  {this.state.playVideo ? "Hide" : "Play"} Video
                </button>
              </h6>
              <h6>
                <span className="head">Instructions: </span>
                {mealObj?.strInstructions?.length > 500 &&
                !this.state.showDetails ? (
                  <span>
                    {mealObj?.strInstructions.substring(0, 300)}
                    <button
                      className="link"
                      onClick={this.updateValue}
                      name="showDetails"
                    >
                      Read More...
                    </button>
                  </span>
                ) : (
                  <span>
                    {mealObj?.strInstructions}
                    <button
                      className="link"
                      onClick={this.updateValue}
                      name="showDetails"
                    >
                      Read Less...
                    </button>
                  </span>
                )}
              </h6>
              <h6>
                <span className="head">Ingredients: </span>
                {this.state.showIngredients ? (
                  <span>
                    <button
                      className="link"
                      onClick={this.updateValue}
                      name="showIngredients"
                    >
                      Hide Ingredients
                    </button>
                    {this.state.ingredientsList?.map((e) => (
                      <h6 style={{ marginLeft: "10px" }} key={e.item}>
                        {e.item} - {e.quantity}
                      </h6>
                    ))}
                  </span>
                ) : (
                  <button
                    className="link"
                    onClick={this.updateValue}
                    name="showIngredients"
                  >
                    Show Ingredients
                  </button>
                )}
              </h6>
              <h6>
                <a
                  className="head"
                  href={mealObj?.strSource}
                  target="_blank"
                  rel="noreferrer"
                >
                  Source: Click Here
                </a>
              </h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
