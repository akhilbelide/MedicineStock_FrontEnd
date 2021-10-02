import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import {hosturl} from '../config'
import './AdminAdd.css'
import Modal from './Modal'

class AdminAdd extends Component{

    constructor(props) {
        super(props)
        this.state = {
            name:'',
            units:'',
            price:'',
            show:false
        }
    }
    
    handleModal=()=>{  
        this.setState({...this.state, show:!this.state.show})  
    }

    onChange = (e) => {
        this.setState({ ...this.state,[e.target.name]: e.target.value });
    }

    clearFields=()=>{
        this.setState({...this.state,name:'',units:0, price:''})
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
        .then(resp => {
            this.handleModal()
            this.clearFields()
        })
      }
    
    render(){
        const {name, units, price}=this.state
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
                
                {this.state.show && 
                <Modal onClose={()=>{this.handleModal()}}>
                   
                        Added Successfully!!!
                    
                </Modal>
                }

                <div className='UnitsDiv'>
                    <div className='lbl2'> 
                        <label>No. of units</label>
                    </div>
                    <div className='inp2'> 
                        <input type="text" name="units" value={units} onChange={this.onChange}/>
                    </div>
                </div>

                <div className='PriceDiv'>
                    <div className='lbl3'> 
                        <label>Price</label>
                    </div>
                    <div className='inp3'> 
                        <input type="text" name="price" value={price} onChange={this.onChange}/>
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
