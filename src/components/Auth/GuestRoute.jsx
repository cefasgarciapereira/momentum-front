import { Redirect } from 'react-router-dom';
import { useSession } from 'contexts/session';
import PropTypes from 'prop-types';

function GuestRoute({ component: Component, render, ...rest }) {
    const { user } = useSession();

    if (user) {
        return <Redirect to='/' />;
    }

    return render ? render({ ...rest }) : <Component {...rest} />;
}

GuestRoute.propTypes = {
    component: PropTypes.any,
    render: PropTypes.func,
};

export default GuestRoute;