import Burgers from './Burgers';
import React from 'react'
import Slide from './Slide';


export const Home = () => {
    return (
        <>
        <div className='container'> 
        <Slide/>
            <Burgers/> 
        </div>
        
        </>
    )
}
