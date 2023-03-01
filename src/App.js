import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component"
import CarRatingsList from "./components/ratings-list.component";
import CreateCarRating from "./components/create-rating.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Routes>
          <Route path='/' element={ <CarRatingsList/> } />
          <Route path='/create' element={ <CreateCarRating/> } />
          <Route path='/user' element={ <CreateUser/> } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;