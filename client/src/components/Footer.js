import React from "react";
import "./Footer.scss";

function getYear() {
    return new Date().getFullYear();
}

export function Footer() {
    return (
        <div className="footer">
            <div className="footer-text-style"> &copy;{getYear()} Powered by DOT, <a className="link" href='https://prod.y-box.online/'
            > Design Only Together</a>
            <strong className="ps-5">
            </strong>
            , <a className="link" href='https://www.linkedin.com/in/yeun-kim-58a76218a/'>Designer : Yeun Kim</a> | <a className="link" href='https://www.linkedin.com/in/david-zwart-88514083/'>Developer : David Zwart</a>
        </div>
      </div >
    );
};

export default Footer;
