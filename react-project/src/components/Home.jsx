import React from 'react'
import Typewriter from 'typewriter-effect';
import { FiMail } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaTwitter, FaSpotify, FaMedium } from "react-icons/fa";
  
  

export default function Home() {
    return (
        <div id="home">
            <div id='typewriter'>
            <Typewriter
            options={{
                wrapperClassName: 'typewriter-wrapper',
                cursorClassName: 'cursorSize',
                strings: ["<h1>hi, i'm sanjana.</h1>"],
                autoStart: true,
                delay: 150,
                loop: 'true'
            }}
            />
            </div>
            <div className="social-links">
                <a href="mailto:adigasanjana@gmail.com" className="mail"><FiMail /></a>
                <a href="https://github.com/sanj-adiga" className="github"><FaGithub /></a>
                <a href="https://www.linkedin.com/in/sanjana-adiga/" className="linkedin"><FaLinkedin /></a>
                <a href="https://twitter.com/Sanjana_Adiga" className="twitter"><FaTwitter /></a>
                <a href="https://medium.com/@sanjanaadiga" className="medium"><FaMedium /></a>
                <a href="https://open.spotify.com/user/sanjana.adiga" className="spotify"><FaSpotify /></a>
            </div>
            <p>Currently I'm...</p>
                
        </div>
    )
}
