import './App.css';
import {BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import ListAssignment from './components/ListAssignment';
import GradeAssignment from './components/GradeAssignment';
import AddAssignment from './components/AddAssignment';
import EditAssignment from './components/EditAssignment';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <h2>Gradebook</h2>
      <BrowserRouter>
          <div>
            <Switch>
              <Route path="/listAssignment" component={ListAssignment} />
              <Route path="/gradeAssignment" component={GradeAssignment} />
              <Route path="/assignment" component={EditAssignment} />
              <Route path="/addAssignment" component ={AddAssignment}/>
              <Route path="/" component ={Login}/>
              <Route render={ () => <h1>Page not found</h1>} />
            </Switch>
            
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
