import React from "react";
import "./Footer.scss";

function getYear() {
    return new Date().getFullYear();
}

export function Footer() {
    return (
        <div className="footer">
            <div className="footer-text-style"> &copy;{getYear()} Powered by DOT, <a href='https://prod.y-box.online/'
            > Design Only Together</a>
            <strong className="ps-5">
            </strong>
            , Designer : Yeun Kim | Developer : David Zwart
        </div>
      </div >
    );
};

export default Footer;
