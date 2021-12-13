import React from 'react'
import { Navbar, Alignment, Button } from "@blueprintjs/core";
import {Link}  from "react-router-dom";

export default function header(props) {
    return (
        <div>
            <Navbar>
                <Navbar.Group align={Alignment.LEFT}>
                    <Navbar.Heading>To Do List</Navbar.Heading>
                    <Navbar.Divider />
                    <Button className="bp3-minimal" icon="home"  align={Alignment.RIGHT} >
                        <Link to='/'>home</Link>
                    </Button>
                    <Button className="bp3-minimal" icon="document"  align={Alignment.RIGHT} >
                        <Link to='/setting'>setting</Link>
                    </Button>                    
                </Navbar.Group>
            </Navbar>

           
        </div>
    )
}
