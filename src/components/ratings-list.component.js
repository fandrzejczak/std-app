import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CarRating = props => (
  <tr>
    <td>{props.carRating.username}</td>
    <td>{props.carRating.car}</td>
    <td>{props.carRating.description}</td>
    <td>{props.carRating.rating}</td>
    <td>{props.carRating.date.substring(0,10)}</td>
    <td>
      <a href="#" onClick={() => { props.deleteCarRating(props.carRating._id) }}>usuń</a>
    </td>
  </tr>
)

export default class CarRatingsList extends Component {
  constructor(props) {
    super(props);

    this.deleteCarRating = this.deleteCarRating.bind(this)

    this.state = {carRatings: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/carRatings/')
      .then(response => {
        this.setState({ carRatings: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteCarRating(id) {
    axios.delete('http://localhost:5000/carRatings/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      carRatings: this.state.carRatings.filter(el => el._id !== id)
    })
  }

  carRatingList() {
    return this.state.carRatings.map(currentcarRating => {
      return <CarRating carRating={currentcarRating} deleteCarRating={this.deleteCarRating} key={currentcarRating._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Zapisane opinie</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Użytkownik</th>
              <th>Samochód</th>
              <th>Opis</th>
              <th>Ocena</th>
              <th>Data</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            { this.carRatingList() }
          </tbody>
        </table>
      </div>
    )
  }
}