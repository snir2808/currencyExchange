import React from 'react'
import {useHistory} from 'react-router-dom';
import {AnimatePresence, motion} from 'framer-motion';
import Logo from "./../media/logo_transparent.png";

export default function Welcome() {
    const history = useHistory();
    const pageTransition = {
        in: {
            opacity: 1,
            y:0
        },
        out: {
            opacity: 0,
            y:'-100%vh'
        }
    }
    setTimeout(function(){
        history.push('/Home'); }, 2000);
    return (
        <motion.div
        initial='out'
        animate='in'
        exit='out'
        variants={pageTransition}
        style= {{backgroundColor: 'white'}}
        >
            <img className='logo' src={Logo}/>
        </motion.div>
    )
}
