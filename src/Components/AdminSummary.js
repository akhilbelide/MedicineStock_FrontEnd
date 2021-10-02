import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import {hosturl} from '../config'
import './AdminSummary.css'
import Modal from './Modal'

class AdminSummary extends Component{

    constructor(props) {
        super(props)
        this.state = {
            data:[],
            totalprice:0
        }
    }

    componentDidMount(){
        //this.setState({data:this.props.location.upddata, totalprice:this.props.location.state.totalprice})
        this.setState({data:this.props.location.state.upd,totalprice:this.props.location.state.totalPrice})
        console.log(this.props.location)
    }
    
    render(){
        
        return(
            <div>
                {
                    console.log(this.state)
                }
                <div>
                    <h3>
                        Summary
                    </h3>
                    <div className='SubBox'>
                            <div className="NameSumryBox" style={{color:'gray'}}>Name</div>
                            <div className="PrQnTtl">
                                <div className="Quant" style={{color:'gray'}}>qt</div>
                                        
                                <div className="Pr" style={{color:'gray'}}>price</div> 
                                        
                                <div className="SubTtl" style={{color:'gray'}}>total</div>
                            </div>
                    </div>
                    {
                        this.state.data.map((i,index)=>
                            (
                                <div className='SubBox'>
                                    <div className="NameSumryBox">{i.name}</div>
                                    <div className="PrQnTtl">
                                        <div className="Quant">{(i.prevStock-i.units+i.newStock)}</div>
                                        
                                        <div className="Pr">{i.price}</div> 
                                        
                                        <div className="SubTtl">{(i.prevStock-i.units+i.newStock)*i.price}</div>
                                    </div>
                                </div>
                            )
                        )
                    }
                    <div className="Total">Total - {this.state.totalprice}</div>
                </div>
            </div>
        )
    }
}


export default withRouter(AdminSummary)
