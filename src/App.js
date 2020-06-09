import React from 'react';
import { connect } from 'react-redux';

import { Router, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { PrivateRoute } from './components/PrivateRoute';
import { HomePage } from './containers/HomePage';
import { history } from './helpers';
import { Header } from './components/Header';
import { RegisterPage } from './containers/RegisterPage';
import { LoginPage } from './containers/LoginPage';
import { CreateArticle } from './containers/CreatArticle';
import { ArticlePage } from './containers/ArticlePage';
import { ProfilePage } from './containers/ProfilePage';
import { Settings } from './containers/Settings';

import { userActions } from './actions';

import { ToastContainer } from 'react-toastify';
import NotFound from './components/NotFound/NotFound';

import './App.css';

class App extends React.Component {


  componentDidMount() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.isLoggedin = true;
      this.props.setLoginUser(user);
    }

  }

  constructor(props) {
    super(props)

    this.logoutUser = this.logoutUser.bind(this);
  }

  logoutUser() {
    localStorage.removeItem("user");
    this.props.logout();
    history.push('/')

  }

  render() {

    const { user } = this.props;
    user ? this.isLoggedin = true : this.isLoggedin = false;


    return (
      <Router history={history}>
        <div className="App">
          <ToastContainer
            autoClose={5000}

          />
          <Header isLoggedin={this.isLoggedin} user={user} logout={this.logoutUser} />

          <Switch>
            <Route path={['/', '/articles', '/Articles/ ']} exact component={HomePage} />

            <Route path={['/login', '/articles/login', '/Articles/login ']} component={LoginPage} />
            <Route path='/register' component={RegisterPage} />
            <Route exact path="/article" component={CreateArticle} />
            <PrivateRoute exact path="/edit/article/:slug" component={CreateArticle} />
            <Route exact path="/article/:slug" component={ArticlePage} />

            <Route path="/profile/:username" component={ProfilePage} />
            <PrivateRoute path="/settings" component={Settings} />
            <Route component={NotFound} />
          </Switch>

        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.login.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(userActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
