import React from 'react'
import Home from './Home.jsx'
import DifferentView from './DifferentView.jsx'
import Catagories from './Catagories.jsx'
import { connect } from 'react-redux'

class App extends React.Component {
    render() {
        let currentPath = window.location.pathname
        return (
            <div>
                <div class="jumbotron text-center" style={{margin: 0,backgroundColor: '#ff5148',fontFamily:'Caveat'}}>
                    <h1>Welcome to my Product Viewing Page!</h1>
                    <p>You can Add, Delete or Edit whaterver you want!</p>
                </div>

                <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
                    <a class="navbar-brand" href='/home'>Home</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" href="/changeView">DifferentView</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href='/catagories'>Catagories</a>
                            </li>

                        </ul>
                    </div>
                </nav>

                {currentPath.includes('/changeView') ?
                    <DifferentView dispatch={this.props.dispatch} products={this.props.products} /> :
                    currentPath.includes('/catagories') ?
                        <Catagories dispatch={this.props.dispatch} catagories={this.props.catagories} /> :

                        <Home dispatch={this.props.dispatch} products={this.props.products} />


                }
            </div>
        )
    }
}
//


function mapStateToProps(centralState) {
    return {
        products: centralState.products,
        catagories: centralState.catagories
    }
}
export default connect(mapStateToProps)(App)
