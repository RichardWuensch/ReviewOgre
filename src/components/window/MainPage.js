import React from 'react';
import './MainPage.css';
import logo from '../../assets/media/favicon_ogre.png'

function MainPage() {
    return (
        <div className={"main-page"}>
            <div>
                <img src={logo} alt={"icon"}/>
                <h1>ReviewOgre Reloaded</h1>
            </div>
            <p>Sort your review peers in groups for better Technical Reviews! Visit the HowTo Guide to learn more about this platform</p>
        </div>
    );
}

export default MainPage;
