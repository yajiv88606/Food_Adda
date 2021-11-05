import React, { Component } from "react";
import { FormControl, InputGroup, Button } from "react-bootstrap";
import { getMealByName, getRandomMeal } from "../services/app-data";
import Meal from "./meal";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      randomMeal: undefined,
      mealName: "",
      listOfMeals: [],
    };
  }

  componentDidMount() {
    this.getRandomMeal();
  }
  getRandomMeal = () => {
    this.setState({ listOfMeals: [] });
    getRandomMeal()
      .then((res) => {
        this.setState({ listOfMeals: res.meals });
      })
      .catch((err) => console.log(err));
  };

  changeValue = (event) => {
    event.preventDefault();
    let value = event.target.value;
    this.setState({ mealName: value });
    console.log(this.state);
  };

  searchMeals = (event) => {
    event.preventDefault();
    this.setState({ listOfMeals: [] });
    getMealByName(this.state.mealName)
      .then((res) => {
        this.setState({ listOfMeals: res.meals ? res.meals : [] });
        console.log(this.state);
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <div className="headers">
          <h1>Meals App</h1>
          <InputGroup
            className="search-bar"
            value={this.state.mealName}
            name="mealName"
            onChange={this.changeValue}
          >
            <FormControl
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <Button
              type="submit"
              variant="outline-secondary"
              className="btn btn-secondary"
              id="button-addon2"
              onClick={this.searchMeals}
            >
              Search
            </Button>
            <Button
              type="submit"
              variant="outline-secondary"
              className="btn btn-secondary"
              id="button-addon2"
              onClick={this.getRandomMeal}
            >
              Suprise Me!
            </Button>
          </InputGroup>
        </div>
        <div className="content">
          {this.state.listOfMeals.length > 0
            ? this.state.listOfMeals.map((e) => (
                <Meal meal={e} style={{ margin: "5px 0px" }} />
              ))
            : null}
        </div>
      </div>
    );
  }
}
