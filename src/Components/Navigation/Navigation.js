import React from "react";

const Navigation = ({onRouteChange ,isSignedIn}) =>{
   if(isSignedIn){
       return (
    <nav style={{display:'flex',justifyContent:'flex-end'}} className='ma4 mv0'>
        <p onClick = {() => onRouteChange('signout')} className='f3 pointer underline grow'>Sign Out</p>
    </nav>
       )
   }else{
       return (
    <nav style={{display:'flex',justifyContent:'flex-end'}} className='ma4 mv0'>
        <p onClick = {() => onRouteChange('signin')} className='f3 pointer underline pa3 link dim black grow'>Sign In</p>
        <p onClick = {() => onRouteChange('register')} className='f3 pointer underline pa3 link dim black grow'>Register</p>
    </nav>
       )
   }
        
    
}

export default Navigation