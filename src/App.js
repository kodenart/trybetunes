import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false,
    };
  }

  logIn = () => {
    this.setState({ loggedIn: true });
  }

  render() {
    const { loggedIn } = this.state;
    return (
      <div>
        <p>TrybeTunes</p>

        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
            >
              {loggedIn
                ? <Redirect to="/search" /> : <Login logIn={ this.logIn } /> }

            </Route>
            <Route exact path="/search" component={ Search } />
            <Route exact path="/album/:id" component={ Album } />
            <Route exact path="/favorites" component={ Favorites } />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/profile/edit" component={ ProfileEdit } />
            <Route path="/" component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
