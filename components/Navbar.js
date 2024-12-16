



import React from "react";
import CountdownOffer from "./CountdownOffer";
import MiddleNavbar from "./MiddleNavbar";
import BottomNavabr from "./BottomNavabr";
import MobileMenu from "./MobileOpenMenu";

const Navbar = () => {


    return (
        <>
            <MobileMenu />
            <CountdownOffer />
            <MiddleNavbar />
            <BottomNavabr />
        </>

    );
};

export default Navbar;
