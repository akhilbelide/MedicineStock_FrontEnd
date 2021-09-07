import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import './Admin.css'


class Admin extends Component{

    AddHandler=()=>{
        this.props.history.push('/admin/add')
    }

    UpdateHandler=()=>{
        this.props.history.push('/admin/update')
    }

    render(){
        return(
            <div className='PageMain'>
                <div className='Add' onClick={()=>this.AddHandler()}>
                    ADD
                </div>

                <div className='Update' onClick={()=>this.UpdateHandler()}>
                    UPDATE
                </div>
            </div>
        )
    }
}

export default withRouter(Admin)