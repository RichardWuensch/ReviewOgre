import React from 'react';
import './MainPage.css';
import logo from '../../assets/media/favicon_ogre.png'
import download from '../../assets/media/download.svg'
import file from '../../assets/media/file-earmark.svg'

function MainPage() {
    return (
        <div className={"main-page"}>
            <div className={"title-box"}>
                <img src={logo} alt={"icon"} height={100} width={100}/>
                <span className={"title-text"}>ReviewOgre Reloaded</span>
            </div>
            <h2 className={"title-subheadline"}>Sort your review peers in groups for better Technical Reviews!</h2>
            <span className={"title-subheadline"} style={{fontSize:12}}>Visit the <a href="url">HowToGuide</a> to learn more about this platform</span>
            <div className={"button-group"}>
                <div className={"button-container-green"}>
                    <img src={download} alt={"icon1"}/>
                    <span className={"button-text"}>Import Configuration</span>
                </div>
                <div className={"button-container-green"}>
                    <img src={download} alt={"icon2"}/>
                    <span className={"button-text"}>Load Configuration</span>
                </div>
                <div className={"button-container-white"}>
                    <img src={file} alt={"icon3"}/>
                    <span className={"button-text"}>Save Configuration</span>
                </div>
            </div>

        </div>
    );
}

export default MainPage;
