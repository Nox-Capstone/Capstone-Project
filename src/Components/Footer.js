import React, { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <h3>Nox Big Boys</h3>
                <p>WHOPPER 🍔 WHOPPER 🍔 WHOPPER 🍔 WHOPPER 🍔 JUNIOR 🧒 DOUBLE 2️⃣ TRIPLE 3️⃣ WHOPPER 🍔 FLAME 🔥 GRILLED TASTE 🍖 WITH PERFECT 👌 TOPPERS 👆 I RULE 👑 THIS DAY 🍔</p>
                <ul className="social-media-links">
                    <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                    <li><a href="#"><i className="fa fa-github"></i></a></li>
                    <li><a href="#"><i className="fa fa-twitch"></i></a></li>
                    <li><a href="#"><i className="fa fa-steam"></i></a></li>
                </ul>
            </div>
            <div className="footer-bottom">
                <p>copyright &copy;2023 Nox designed by <span>Michael Carico</span></p>
            </div>
        </footer>
    )
}

export default Footer;