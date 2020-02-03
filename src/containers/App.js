import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import { robots } from '../robots';
import './App.css'
import Scroll from '../components/Scroll'

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        //buscando json desde un api
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => { return response.json(); })
            .then(users => { this.setState({ robots: users }); })
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })

        //        console.log(filteredRobots);

    }

    render() {
        //const {robot.state} = this.state; // puede ser usado para reemplazar this.state
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
        })
        // if else statement
        return !this.state.robots.length ?
            <h1 className='tc'>Loading...</h1> :
            (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <CardList robots={filteredRobots} />
                    </Scroll>
                </div>
            );

    }

}

export default App;