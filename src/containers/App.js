import React from 'react';
import Home from '../components/Home/Home';
import Advocacy from '../components/Advocacy/Advocacy';
import Recommendations from '../components/Recommendations/Recommendations';
import Blog from '../components/Blog/Blog';
import Contact from '../components/Contact/Contact';
import classes from './App.module.css';
import { Switch, Route } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import addRecommendation from '../components/Auth/Additions';

function App() {

  return (
    <div className={classes.App}>
      <Navbar/>
      <Switch>
        <Route path="/advocacy" component={Advocacy} />
        <Route path="/recommendations" component={Recommendations} />
        <Route path="/xyz" component={addRecommendation} />
        <Route path="/blog" component={Blog} />
        <Route path="/contact" component={Contact} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
