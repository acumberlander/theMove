import React from 'react';
import './App.scss';
import MyNavbar from '../Components/MyNavbar/MyNavbar';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import Home from '../Components/Pages/Home/Home';
import FoodAndDrink from '../Components/Pages/FoodAndDrink/FoodAndDrink';
import Leisure from '../Components/Pages/Leisure/Leisure';
import NightLife from '../Components/Pages/NightLife/NightLife';
import Entertainment from '../Components/Pages/Entertainment/Entertainment';
import Events from '../Components/Pages/Events/Events';
import Attractions from '../Components/Pages/Attractions/Attractions';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <React.Fragment>
            <MyNavbar />
                <div className="d-flex justify-content-center">
                  <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/home' component={Home} />
                    <Route path='/foodanddrink' component={FoodAndDrink} />
                    <Route path='/leisure' component={Leisure} />
                    <Route path='/nightlife' component={NightLife} />
                    <Route path='/entertainment' component={Entertainment} />
                    <Route path='/events' component={Events} />
                    <Route path='/attractions' component={Attractions} />
                  </Switch>
                </div>
            </React.Fragment>
          </BrowserRouter>
    </div>
  );
}

export default App;
