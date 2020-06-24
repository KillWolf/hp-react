import React, { useEffect } from 'react';
import logo from '../../assets/images/Logo.png';
import classes from './Navbar.module.css';
import { Link, NavLink} from 'react-router-dom';

const Navbar = (props) => {
    let logoElement = null;
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        logoElement = document.getElementById("Logo");
    });

    function handleScroll() {
        if (window.pageYOffset > 80) {
            logoElement.classList.add(classes.LogoSmall);

        } else {
            logoElement.classList.remove(classes.LogoSmall);
        }
    }
    return (
        <nav className={classes.Nav} id="Nav">
            <div className={classes.NavWrapper}>
                <Link to='/'><img className={classes.Logo} src={logo} id="Logo" alt="" /></Link>
                <ul>
                    <li><NavLink activeClassName={classes.Active} exact to="/">Home</NavLink></li>
                    <li><NavLink activeClassName={classes.Active} to="/Advocacy">Advocacy</NavLink></li>
                    <li><NavLink activeClassName={classes.Active} to="/Recommendations">Recommendations</NavLink></li>
                    <li><NavLink activeClassName={classes.Active} to="/Blog">Blog</NavLink></li>
                    <li><NavLink activeClassName={classes.Active} to="/Contact">Contact</NavLink></li>
                </ul>
            </div>
        </nav>
    )
};

export default Navbar;