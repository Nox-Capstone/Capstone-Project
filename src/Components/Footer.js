import React, { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <h3>Nox</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices dui sapien eget mi. Tortor id aliquet lectus proin nibh nisl condimentum id. Tellus id interdum velit laoreet id donec ultrices tincidunt. Duis ut diam quam nulla porttitor massa id.</p>
                <ul className="social-media-links">
                    <div className="sprites">
                        <li><a href="https://www.linkedin.com/in/michael-carico-b73328193/" target='_blank'><i className="fa fa-linkedin"></i></a></li>
                        <li><a href="https://www.linkedin.com/in/ethan-cornwell/" target='_blank'><i className="fa fa-linkedin"></i></a></li>
                        <li><a href="https://www.linkedin.com/in/walterlopez18/" target='_blank'><i className="fa fa-linkedin"></i></a></li>
                    </div>
                    <li><a href="https://github.com/Nox-Capstone/Capstone-Project" target='_blank'><i className="fa fa-github"></i></a></li>
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