import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import './User.css'
import {hosturl} from '../config'
import Modal from './Modal'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

class User extends Component{

    constructor(props) {
        super(props)
        this.state = {
            data:[],
            updated:[],
            show:false
        }
    }

    handleModal=()=>{  
        this.setState({...this.state, show:!this.state.show})  
    }

    componentDidMount(){
        fetch(hosturl + '/user/get')
        .then(resp => resp.json())
        .then(data => this.setState({...this.state,data: data.data}))
        .catch(err => console.log(err))
    }

    onSubmit(){
     
        fetch(hosturl + '/user/update',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  data:this.state.updated
              })
        })
        .then(resp => {
            this.handleModal()
            console.log(resp.json())
        })
    }

    removefromUpdate=(index)=>{
        let newdata=[...this.state.data]
        let updateddata=[...this.state.updated]
        let flag=0

        for(let i=0;i<updateddata.length;i++){
            if(updateddata[i].name===newdata[index].name){
                updateddata[i].units-=1
                if(updateddata[i].units<=0){
                    updateddata[i].units=0
                }
                flag=1
                break
            }
        }
        if(flag===0){
            newdata[index].units-=1
            if(newdata[index].units<=0){
                newdata[index].units=0
            }
            updateddata.push(newdata[index])
        }

        //this.setState({data:newdata, updated:updateddata})
        this.setState({...this.state,data:newdata, updated:updateddata})
    }

    searchHandler=(e)=>{
        const searchString=e.target.value
        
        fetch(hosturl + '/user/search',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  data:searchString
              })
        })
        .then(resp => resp.json())
        .then(data => this.setState({...this.state,data: data.data}))
        .catch(err => console.log(err))

    }

    render(){
        const {name, units} = this.state
        return(
            <div className='Page'>
                {
                    <div className='SearchDiv'>  
                        <input type='text' name='search' placeholder="Search here" onChange={this.searchHandler}/>
                    </div>
                }
                {this.state.show && 
                <Modal onClose={()=>{this.handleModal()}}>
                    
                        Updated Successfully!!!
                    
                </Modal>
                }
                {
                    this.state.data.map((i,index) => 
                        (
                        <div className='MainBox'>
                            <div className='NameBox'>{i.name}</div>
                            <div className='UpdateBox'>
                                <div  className='Sub' onClick={()=>{this.removefromUpdate(index)}}>
                                    <AiOutlineArrowDown/>
                                </div>
                                <div className='Units'>
                                   {i.units}
                                </div>
                            </div>
                        </div>
                        )
                    )
                }
                <div className='ButtonDiv' onClick={()=>{this.onSubmit()}}>
                    SUBMIT
                </div>
            </div>
        )
    }
}

export default withRouter(User)