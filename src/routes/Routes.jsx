import React, { lazy, Suspense, useEffect } from 'react';
import { Switch, Redirect, HashRouter, Route } from 'react-router-dom';
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
  const UseTerms = lazy(() => import('pages/UseTerms'))
  const CloseFriends = lazy(() => import('pages/CloseFriends'))
  const AddCloseFriends = lazy(() => import('pages/AddCloseFriends'))

  useEffect(() => {
    gtm.initialize('G-DXXF86J5D9');
  }, []);

  return (
    <Suspense fallback={<LoadingScreen />}>
      <HashRouter>
        <Route exact path='/404' component={Error404} />
        <GuestRoute exact path='/home' component={LandingPage} />
        <GuestRoute exact path='/cadastrar' component={SignUp} />
        <GuestRoute exact path='/close-friends' component={CloseFriends} />
        <GuestRoute exact path='/login' component={Login} />
        <GuestRoute exact path='/adicionar-close-friends' component={AddCloseFriends} />
        <GuestRoute exact path='/esqueci-minha-senha' component={ForgotPassword} />
        <GuestRoute exact path='/nova-senha' component={NewPassword} />
        <GuestRoute exact path='/termos-de-uso' component={UseTerms} />
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
      </HashRouter>
    </Suspense>
  );
}