import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import React from 'react';
import NavbarComp from './navbar';
import Post from './post';

function App() {
  return (
    <>
             <React.StrictMode>
          <Router>                   
                    <Switch>
                        <Route path="/" exact>
                          <NavbarComp/>
                        </Route>
                        <Route path="/:id" render={
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
