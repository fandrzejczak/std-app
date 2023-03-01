import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components'

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0;
  padding: 0.25em 1em;
`

export default class CreateCarRating extends Component {
  constructor(props) {
    super(props);
    this.userInputRef = React.createRef();

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeCar = this.onChangeCar.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeRating = this.onChangeRating.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      car: '',
      description: '',
      rating: 0,
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeCar(e) {
    this.setState({
      car: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeRating(e) {
    this.setState({
      rating: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const carRating = {
      username: this.state.username,
      car: this.state.car,
      description: this.state.description,
      rating: this.state.rating,
      date: this.state.date
    }

    console.log(carRating);

    axios.post('http://localhost:5000/carRatings/add', carRating)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Utwórz nową opinię</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Użytkownik: </label>
          <select ref={this.userInputRef}
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Samochód: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.car}
              onChange={this.onChangeCar}
              />
        </div>
        <div className="form-group"> 
          <label>Opis: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Ocena: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.rating}
              onChange={this.onChangeRating}
              />
        </div>
        <div className="form-group">
          <label>Data: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <br/>
          <Button type="submit" value="Utwórz nową opinię" className="btn btn-primary" >Utwórz nową opinię</Button>
        </div>
      </form>
    </div>
    )
  }
}