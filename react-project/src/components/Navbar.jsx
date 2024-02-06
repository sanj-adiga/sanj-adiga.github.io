import React, { useState, useEffect } from 'react';
import '../App.css';

export default function Navbar() {

    // MAKE A DARK MODE OPTION
    // const [darkMode, setDarkMode] = useState(false);

    // useEffect(() => {
    //     if (darkMode) {
    //     document.body.classList.add('dark-mode');
    //     } else {
    //     document.body.classList.remove('dark-mode');
    //     }
    // }, [darkMode]);

    // const toggleDarkMode = () => {
    //     setDarkMode(!darkMode);
    // };
    return (
            <nav>
                <h3 className="nav-header">sanjana adiga.</h3>
                <a href="#home">home</a>
                <a href="/#about">about</a>
                <a href="/#experience">experience</a>
                <a href="/#projects">projects</a>
                <a href="/writing">writing</a>
                {/* FOR DARK MODE OPTION : FIX THIS */}
                {/* <button onClick={toggleDarkMode}>
                    {darkMode ? 'Light Mode' : 'Dark Mode'}</button> */}
                {/* <div id="toggle" class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"></input>
                    <label class="form-check-label" for="flexSwitchCheckDefault">Dark Mode</label>
                </div> */}
            </nav>
    )
}

