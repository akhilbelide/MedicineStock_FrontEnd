import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import {hosturl} from '../config'
import './AdminAdd.css'

class AdminAdd extends Component{

    constructor(props) {
        super(props)
        this.state = {
            name:'',
            units:''
        }
    }
       
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = () => {
        // get our form data out of state
        //const { name, units} = this.state;
          
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        };
        fetch( hosturl + '/admin/add', requestOptions)
        .then(console.log('success'))

      }
    
    render(){
        const {name, units}=this.state
        return(
            <div className='PageAdd'>  
                <div className='NameDiv'> 
                    <div className='lbl1'>
                        <label>Medicine Name</label>
                    </div>
                    <div className='inp1'>
                        <input type="text" name="name" value={name} onChange={this.onChange}/>
                    </div>
                </div>              
                
                <div className='UnitsDiv'>
                    <div className='lbl2'> 
                        <label>No. of units</label>
                    </div>
                    <div className='inp2'> 
                        <input type="text" name="units" value={units} onChange={this.onChange}/>
                    </div>
                </div>
                
                <div onClick={()=>{this.onSubmit()}} className='SubmitDiv'> 
                    SUBMIT
                </div>
            </div>
        )
    }
}


export default withRouter(AdminAdd)
