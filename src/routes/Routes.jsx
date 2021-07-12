import React, { lazy, Suspense, useEffect } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { AuthRoute, GuestRoute } from 'components/Auth';
import { ResponsiveDrawer, Error404, LoadingScreen } from 'components'
import gtm from 'utils/googleAnalytics';

export default function Routes() {
  const Login = lazy(() => import('pages/Login'));
  const SignUp = lazy(() => import('pages/SignUp'));
  const LandingPage = lazy(() => import('pages/LandingPage'));
  const Momentum = lazy(() => import('pages/Momentum'));
  const Blog = lazy(() => import('pages/Blog'));
  const Post = lazy(() => import('pages/Blog/Post'));
  const ForgotPassword = lazy(() => import('pages/ForgotPassword'))
  const NewPassword = lazy(() => import('pages/ForgotPassword/NewPassword'))
  const Profile = lazy(() => import('pages/Profile'))

  useEffect(() => {
    gtm.initialize('G-DXXF86J5D9');
  }, []);

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        <Route exact path='/404' component={Error404} />
        <GuestRoute exact path='/home' component={LandingPage} />
        <GuestRoute exact path='/cadastrar' component={SignUp} />
        <GuestRoute exact path='/login' component={Login} />
        <GuestRoute exact path='/esqueci-minha-senha' component={ForgotPassword} />
        <GuestRoute exact path='/nova-senha' component={NewPassword} />
        <AuthRoute
          path='/'
          render={(props) => (
            <ResponsiveDrawer {...props}>
              <Suspense fallback={<LoadingScreen />}>
                <Switch>
                  <Redirect exact from='/' to='/blog' />
                  <Route exact path='/blog' component={Blog} />
                  <Route exact path='/momentum' component={Momentum} />
                  <Route exact path='/perfil' component={Profile} />
                  <Route path='/post/:id' component={Post} />
                  <Redirect to='/404' />
                </Switch>
              </Suspense>
            </ResponsiveDrawer>
          )}
        />
      </Switch>
    </Suspense>
  );
}