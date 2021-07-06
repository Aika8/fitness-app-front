import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import React from 'react';
import NavbarComp from './navbar';
import Post from './post';
import Dashboard from '../components/admin/Dashboard'
import { SnackbarProvider} from 'notistack';
import Login from '../components/admin/login'

function App() {

  const [temp, setTemp] = React.useState(false);

  return (
    <>
             <React.StrictMode>
          <Router>  
                          
                    <Switch>
                        <Route path="/" exact>
                          <NavbarComp/>
                        </Route>

                        <Route path="/login" exact>
                          <Login ChangeTemp={(new_temp)=>{
                            setTemp(new_temp);
                          }}/>
                        </Route>
                        
                        <Route path="/admin" exact>
                        <SnackbarProvider maxSnack={3}>
                          <Dashboard temp={temp} ChangeTemp={(new_temp)=>{
                            setTemp(new_temp);
                          }}/>
                        </SnackbarProvider>
                        </Route>
                        
                        <Route path="/posts/:id" exact render={
                            ({match}) => {
                                const {id} = match.params;
                                return <>
                                <Post postId={id}/>
                                </>
                            }
                        }/> 
                    </Switch>
                    
            </Router>
            </React.StrictMode>
           </>
  );
}

export default App;
