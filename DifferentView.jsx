import React from 'react'
import { addProduct, deleteProduct,fixProduct,fetchProduct} from './main.js'
import './styles/product-styles.css'

export default class DifferentView extends React.Component {
    
        constructor() {
            super()
    
            this.state ={
                id: '', name: '', price: '', description: '',
                brand: '', producer: '', imageUrl: ''
        
            }
        }
    
        add() {
            this.props.dispatch(addProduct({
                name: this.state.name, id: this.state.id, price: this.state.price,
                description: this.state.description, brand: this.state.brand, producer: this.state.producer,
                imageUrl: this.state.imageUrl
            }))
        }
    
        handleDelete(_id) {
            if (confirm('Do you want to delete?')) {
                this.props.dispatch({
                    type: 'DELETE_PRODUCT',
                    payload: _id
                })
                this.props.dispatch(deleteProduct(_id))
    
            }
        }
        handleView(_id){
            this.props.dispatch({type:'VIEW_PRODUCT',payload: _id})
            //View the only product without interfere with the fetched data
        }
        handleUpdate(_id) {
    
        var id = prompt("id")
        var name = prompt("name")
        var price = prompt("price")
        var description = prompt("description")
        var brand = prompt ("brand") 
        var producer = prompt ("producer")
        var imageUrl = prompt ("image URL")
    
        this.props.dispatch(fixProduct({_id ,name: name, id: id, price: price,
            description: description, brand:brand, producer:producer,
            imageUrl: imageUrl}))
    
    
        }
        
        handleChange(e) {
            let change = {}
            change[e.target.name] = e.target.value
            this.setState(change)
        }
        
    
        render() {
            return (
                <div class="container">
                    <div class='header'>
                    <h1>Product Form</h1>
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
                        <tr>
                            <td>Price</td>
                            <td><input type="text" name='price' value={this.state.price}
                            onChange={this.handleChange.bind(this)} /></td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td><input type="text" name='description' value={this.state.description}
                            onChange={this.handleChange.bind(this)} /></td>
                        </tr>
                        <tr>
                            <td>Brand</td>
                            <td><input type="text" name='brand' value={this.state.brand}
                            onChange={this.handleChange.bind(this)} /></td>
                        </tr>
                        <tr>
                            <td>Producer</td>
                            <td><input type="text" name='producer' value={this.state.producer}
                            onChange={this.handleChange.bind(this)} /></td>
                        </tr>
                        <tr>
                            <td>Image</td>
                            <td><input type="text" name='imageUrl' value={this.state.imageUrl}
                            onChange={this.handleChange.bind(this)} /></td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="footer">
                    <input type='button' class='button' value='Add Product' onClick={this.add.bind(this)}/>
                    </div>
                
                    <div class='header'><h1>Product List</h1></div>
                    <div class="grid">
                        {this.props.products.map((i) =>
                        
                        <div>
                                <br/>
                                <table  style={{width:"100%", textAlign:"left"}}>
                                <tbody>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th>Brand</th>
                                    <th>Producer</th>
                                </tr>
                                <tr>
                                    <td>{i.id}</td>
                                    <td>{i.name}</td>
                                    <td>{i.price}</td>
                                    <td>{i.description}</td>
                                    <td>{i.brand}</td>
                                    <td>{i.producer}</td>
                                </tr>
                                </tbody>
                                </table>
                
                            <img class="image2" src={i.imageUrl} />
                            <br/>
                                <div class="footer">
                                <input type='button' class="button" value='Delete' onClick={() => this.handleDelete(i._id)}/>
                                <input type='button' class="button" value='Update' onClick={() => this.handleUpdate(i._id)}/>
                                <input type='button' class="button" value='View' onClick={() => this.handleView(i._id).bind(this)}/></div>
            
                            </div>
                            
                        )}</div>
                </div>
                
            )
        }
    }