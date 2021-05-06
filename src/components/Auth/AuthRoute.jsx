import { Redirect } from 'react-router-dom';
import { useSession } from 'contexts/session';
import PropTypes from 'prop-types';

function AuthRoute({ component: Component, render, ...rest }) {
  const {user} = useSession();

  if (!user) {
    return <Redirect to='/home' />;
  }

  return render ? render({ ...rest }) : <Component {...rest} />;
}

AuthRoute.propTypes = {
  component: PropTypes.any,
  render: PropTypes.func,
};

export default AuthRoute;