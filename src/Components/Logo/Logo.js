import React from "react";
import Tilt from 'react-tilt'
import brain from './brain.png'
import './Logo.css'
import '../Rank/Rank.css'
const Logo = () =>{
    return (
        <div className="Rank-Center ml4 mt-0 mv0">
           <Tilt className="Tilt br2 shadow-5 " options={{ max : 50 }} style={{ height: 180, width: 180 }} >
            <div className="Tilt-inner center center-align " style={{height:'100%'}}><img  className='mt2' alt='logo' src={brain} width='70%' height='70%'/></div>
            </Tilt>
        </div>
    )
}
export default Logo