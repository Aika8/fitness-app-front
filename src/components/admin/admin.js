import React from "react";
import Navbar from "./navbar";
import Nav from './nav';
const Admin = () => {
    return (
        <div id="wrapper">

        <Navbar/>
        <div id="content-wrapper" class="d-flex flex-column">

            <div id="content">
                <Nav/>
              
            <div/>
        </div>
        </div>
        </div>
    )
}

export default Admin;