import React from 'react'
import {add, deletee,fix,fetchC} from './main.js'
import './styles/product-styles.css'

export default class Catagories extends React.Component {

    constructor() {
        super()

        this.state ={
            id: '', name: ''
    
        }
    }
    handleChange(e) {
        let change = {}
        change[e.target.name] = e.target.value
        this.setState(change)
    }
    addC() {
        this.props.dispatch(add({
            name: this.state.name, id: this.state.id
        }))
    }

    handleDeleteC(_id) {
        if (confirm('Do you want to delete?')) {
            this.props.dispatch({
                type: 'DELETE_PRODUCT',
                payload: _id
            })
            this.props.dispatch(deletee(_id))

        }
    }
    handleViewC(_id){
        this.props.dispatch({type:'VIEW',payload: _id})
        //View the only product without interfere with the fetched data
    }
    handleUpdateC(_id) {

    var id = prompt('product ID')
    var name = prompt('name of the product')


    this.props.dispatch(fix({_id ,name: name, id: id}))


    }
    
    
    

    render() {
        return (
            <div class="container">
                <div class='header'>
                <h1>Catagories Form</h1>
                </div>
                <table style={{ width:"50%",borderWidth:"2px", borderColor:"#dddddd"}}>
                    <tbody>
                    <tr>
                    <td>ID</td>
                    <td><input type="text" name='id' value={this.state.id}
                        onChange={this.handleChange.bind(this)} /></td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td><input type="text" name='name' value={this.state.name}
                        onChange={this.handleChange.bind(this)} /></td>
                    </tr>
                

                    </tbody>
                </table>
                <div class="footer">
                <input type='button' class='button' value='Add Product' onClick={this.addC.bind(this)}/>
                
                </div>
            
                <div class='header'><h1>Catagories List</h1></div>
                    {this.props.catagories.map((i) =>
                    
                    <div class="list">
                            <br/>
                            <table  style={{width:"100%", textAlign:"left"}}>
                            <tbody>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                
                            </tr>
                            <tr>
                                <td>{i.id}</td>
                                <td>{i.name}</td>
                                
                            </tr>
                            </tbody>
                            </table>
            
                        
                        <br/>
                            <div class="footer">
                            <input type='button' class="button" value='Delete' onClick={() => this.handleDeleteC(i._id)}/>
                            <input type='button' class="button" value='Update' onClick={() => this.handleUpdateC(i._id)}/>
                            <input type='button' class="button" value='View' onClick={() => this.handleViewC(i._id).bind(this)}/></div>
                            <button onClick ={()=> location.reload()}>ReNew</button>
                        </div>
                        
                    )}
                
            </div>
            
        )
    }
}

