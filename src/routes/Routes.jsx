import React, { lazy, Suspense } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { AuthRoute, GuestRoute } from 'components/Auth';
import { ResponsiveDrawer, Error404, LoadingScreen } from 'components'

function Routes() {
  const Login = lazy(() => import('pages/Login'));
  const Home = lazy(() => import('pages/Home'))

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        <Route exact path='/404' component={Error404} />
        <GuestRoute exact path='/login' component={Login} />
        <AuthRoute
          path='/'
          render={(props) => (
            <ResponsiveDrawer {...props}>
              <Suspense fallback={<LoadingScreen />}>
                <Switch>
                  <Redirect exact from='/' to='/home' />
                  <Route exact path='/home' component={Home} />
                </Switch>
              </Suspense>
            </ResponsiveDrawer>
          )}
        />
        <Redirect to='/404' />
      </Switch>
    </Suspense>
  );
}

export default Routes;