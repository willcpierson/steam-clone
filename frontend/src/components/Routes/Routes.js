import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

// May need editing, user should be able to access whole website except for purchase of games, 
// and viewing their list of games

export const AuthRoute = ({ component: Component, path, exact }) => {
  const loggedIn = useSelector(state => !!state.session.user);

  return (
    <Route path={path} exact={exact} render={(props) => (
      !loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to="/games" />
      )
    )} />
  );
};

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const loggedIn = useSelector(state => !!state.session.user);

  return (
    <Route
      {...rest}
      render={props =>
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};