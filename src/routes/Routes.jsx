import { 
    BrowserRouter, 
    Route, 
    Switch, 
    Redirect 
} from 'react-router-dom';
import Login from 'pages/Login';
import Home from 'pages/Home';
import { useSession } from 'contexts/session'

const PrivateRoute = ({component: Component, ...rest}) => {
    const { user } = useSession();

    return(
        <Route {...rest} render={ props => 
                user ? 
                <Component {...props}/>:
                <Redirect to={{pathname: "/",state: {from: props.location}}}/>
            }
        />
    );
};

 export default function Routes(){
     return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}/>
                <PrivateRoute exact path="/home" component={Home}/>
                <Route path="*" component={() => "404 PAGE NOT FOUND"} />
            </Switch>
        </BrowserRouter>
     )
 };