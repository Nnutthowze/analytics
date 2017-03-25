import React from 'react';
import ReactDom from 'react-dom';
import HomePage from './components/HomePage';
import LoginPage from './containers/LoginPage';
import SignUpPage from './containers/SignUpPage';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

const Links = () => (
  <nav>
    <NavLink exact to="/">Home</NavLink>
    <NavLink to="/login">Sign In</NavLink>
    <NavLink to="/signup">Sign Up</NavLink>
  </nav>
);

const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Router>
      <div>
        <Links />
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
      </div>
    </Router>
  </MuiThemeProvider>
);

ReactDom.render(<App />, document.getElementById('react-app'));
