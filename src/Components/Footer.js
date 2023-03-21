import React, { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import WalterSprite from './sprites/walter-sprite.png';
import MichaelSprite from './sprites/michael-sprite.png';
import EthanSprite from './sprites/avatarEthan.png';

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <h3>Nox</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices dui sapien eget mi. Tortor id aliquet lectus proin nibh nisl condimentum id. Tellus id interdum velit laoreet id donec ultrices tincidunt. Duis ut diam quam nulla porttitor massa id.</p>
                <ul className="social-media-links">
                    <li><a href="https://github.com/Nox-Capstone/Capstone-Project" target='_blank'><i className="fa fa-github"></i></a></li>
                    <p>Follow us on Linkedin!</p>
                    <div className="linkedin-links">
                        <li><a href="https://www.linkedin.com/in/michael-carico-b73328193/" target='_blank'><img className="sprites" src={MichaelSprite}></img></a><p>Michael Carico</p></li>
                        <li><a href="https://www.linkedin.com/in/ethan-cornwell/" target='_blank'><img className="sprites" src={EthanSprite}></img></a><p>Ethan Cornwell</p></li>
                        <li><a href="https://www.linkedin.com/in/walterlopez18/" target='_blank'><img className="sprites" src={WalterSprite}></img></a><p>Walter Lopez</p></li>
                    </div>
                </ul>
            </div>
            <div className="footer-bottom">
                <p>copyright &copy;2023 Nox designed by <span>Michael Carico</span></p>
                <p>Developed by <span>Michael Carico, Ethan Cornwell, Walter Lopez</span></p>
            </div>
        </footer>
    )
}

export default Footer;