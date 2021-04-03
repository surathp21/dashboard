import React, { Fragment }  from "react";
import { format, subDays, addDays } from "date-fns";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Dashboard from "./Container/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import { Counter } from "./features/counter/Counter";

import MainLayout from "./layouts/MainLayout";
import EmptyLayout from "./layouts/EmptyLayout";

const NotFound = () => {
  return <div>NotFound</div>;
};



const DashboardRoute = ({ component: Component, ...rest }) => {
  console.log({...rest});
  
  return (
    <Route
      {...rest}     
      
      render={(matchProps) =>{
          
          console.log("matchProps", matchProps);
          return (
        
        <MainLayout>
          <Component {...matchProps} />
        </MainLayout>
      )}
      }
    />
  );
};

const EmptyRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <EmptyLayout>
          <Component {...matchProps} />
        </EmptyLayout>
      )}
    />
  );
};

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isUserLoggedIn: localStorage.getItem("isUserLoggedIn") || false
        }
    }

    render(){
        
    console.log("login status", this.state.isUserLoggedIn);
        return (
            <Router>
              <Switch>
                
                    <Fragment>              
                        <EmptyRoute exact path="/"  component={Login} />
                         <DashboardRoute exact path="/dashboard" component={Dashboard} />
                        <DashboardRoute exact path="/table" component={Counter} />
                        {/* <Route path="/dashboard" component={AppWrapper} /> */}

                        <EmptyRoute component={NotFound} />
                    </Fragment>
                 
              </Switch>
            </Router>
        );
    
    } 
}

// class AppWrapper extends Component{
//   render(){

//   if(/*not login*/)
//     return <Redirect to="/login" />

//    return(
//      <div>
//        App wrapper
//        <Route path='/Welcome' component={Welcome} />
//      </div>
//    );
//   }
// }

export default App;