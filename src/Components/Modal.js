import {Fragment} from 'react'
import ReactDOM from 'react-dom'
import  './Modal.css'
import React,{Component} from 'react'

const Backdrop = props => {
    return <div className='backdrop' onClick={props.onClose}></div>
}

const ModalOverlay = props => {
    return <div className='modal'>
        <div className='content'>
            {props.children}
        </div>
    </div>
}

const protalElement=document.getElementById('overlays')

const Modal = props => {
    return <Fragment>
       {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, protalElement)}
       {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, protalElement)}
       </Fragment>
}



export default Modal