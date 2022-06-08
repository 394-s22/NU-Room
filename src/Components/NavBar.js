import * as React from 'react';

const NavBar = ({displayPage, setDisplayPage}) => {
    
    return (
        <nav>
            <h2>NU-Room</h2>
            <button onClick ={() => setDisplayPage("Form")}>Form</button>
            <button onClick ={() => setDisplayPage("Matches")} data-cy="navbarMatch">Matches</button>
        </nav>
    )

}

export default NavBar;