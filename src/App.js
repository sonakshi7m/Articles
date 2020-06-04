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

import { userActions } from './actions';

import { ToastContainer } from 'react-toastify';

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
    this.props.logout(() => { history.push('/') });

  }

  render() {

    const { user } = this.props;
    if (user) {
      this.isLoggedin = true;

    }

    return (
      <Router history={history}>
        <div className="App">
          <ToastContainer
            autoClose={5000}

          />
          <Header isLoggedin={this.isLoggedin} user={user} logout={this.logoutUser} />

          <Switch>
            <Route path='/' exact component={HomePage} />

            <Route path='/login' component={LoginPage} />
            <Route path='/register' component={RegisterPage} />
            <PrivateRoute exact path="/article" component={CreateArticle} />
            <PrivateRoute exact path="/edit/article/:slug" component={CreateArticle} />
            <PrivateRoute exact path="/article/:slug" component={ArticlePage} />

            <PrivateRoute path="/profile/:username" component={ProfilePage} />
            {/* <Route path="/register" component={RegisterPage} /> */}
            {/* <Redirect from="*" to="/" /> */}
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
