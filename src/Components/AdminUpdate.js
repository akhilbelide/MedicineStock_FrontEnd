import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import './AdminUpdate.css'
import {hosturl} from '../config'

class AdminUpdate extends Component{

    constructor(props) {
        super(props)
        this.state = {
            data:[],
            updated:[]
        }
    }

    componentDidMount(){
        fetch(hosturl + '/admin/get')
        .then(resp => resp.json())
        .then(data => this.setState({data: data.data}))
        .catch(err => console.log(err))
    }

    onSubmit(){

        fetch(hosturl + '/admin/update',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  data:this.state.updated
              })
        })
        .then(resp => console.log(resp.json()))
    }

    addtoUpdate=(index)=>{
        let newdata=[...this.state.data]
       
        let updateddata=[...this.state.updated]
        let flag=0

        for(let i=0;i<updateddata.length;i++){
            if(updateddata[i].name===newdata[index].name){
                updateddata[i].units+=1
                flag=1
                break
            }
        }
        if(flag===0){
            newdata[index].units+=1
            updateddata.push(newdata[index])
        }
        this.setState({data:newdata,updated:updateddata})
    }

    removefromUpdate=(index)=>{
        let newdata=[...this.state.data]
        let updateddata=[...this.state.updated]
        let flag=0

        for(let i=0;i<updateddata.length;i++){
            if(updateddata[i].name===newdata[index].name){
                updateddata[i].units-=1
                flag=1
                break
            }
        }
        if(flag===0){
            newdata[index].units-=1
            updateddata.push(newdata[index])
        }

        this.setState({data:newdata, updated:updateddata})
    }

    searchHandler=(e)=>{
        const searchString=e.target.value
        
        fetch(hosturl+ '/admin/search',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  data:searchString
              })
        })
        .then(resp => resp.json())
        .then(data => this.setState({data: data.data}))
        .catch(err => console.log(err))

    }


    onValueChange=(index)=>(e)=>{

        let newdata=[...this.state.data]
        newdata[index].units=parseInt(e.target.value)

        let updateddata=[...this.state.updated]
        let flag=0

        for(let i=0;i<updateddata.length;i++){
            if(updateddata[i].name===newdata[index].name){
                updateddata[i].units=parseInt(e.target.value)
                flag=1
                break
            }
        }
        if(flag===0){
            updateddata.push(newdata[index])
        }

        this.setState({data:newdata , updated:updateddata})
    }


    render(){
        const {name, units} = this.state
        return(
            <div className='PageUpdate'>
                {
                    <div className='SearchDiv'>  
                        <input type='text' name='search' onChange={this.searchHandler} placeholder="Search here"/>
                    </div>
                }

                {
                    this.state.data.map((i,index) => 
                        (
                        <div className='MainBox'>
                            <div className='NameBox'>{i.name}</div>

                            <div className='UpdateBox'>
                                <div className='Sub' onClick={()=>{this.removefromUpdate(index)}}>
                                    -
                                </div>
                                <div className='TextBox'>
                                    <input type="number" name='quantity' value={i.units} onChange={this.onValueChange(index)} className='InputField'/>
                                </div>
                                <div className='Plus' onClick={()=>{this.addtoUpdate(index)}}>
                                    +
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

export default withRouter(AdminUpdate)