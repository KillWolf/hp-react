import React from 'react';
import Home from '../components/Home/Home';
import Advocacy from '../components/Advocacy/Advocacy';
import Recommendations from '../components/Recommendations/Recommendations';
import Blogs from '../components/Blog/Blogs';
import Blog from '../components/Blog/Blog/Blog';
import Contact from '../components/Contact/Contact';
import classes from './App.module.css';
import { Switch, Route } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import AuthContainer from '../components/Auth/AuthContainer';

function App() {

  return (
    <div className={classes.App}>
      <Navbar />
      <Switch>
        <Route path="/advocacy" component={Advocacy} />
        <Route path="/recommendations" component={Recommendations} />
        <Route path="/xyz" component={AuthContainer} />
        <Route path="/blogs" component={Blogs} />
        <Route path="/blog" component={Blog} />
        <Route path="/contact" component={Contact} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
