import React, { Component } from 'react'
import List from './List.js';
import request from 'superagent';

export default class Search extends Component {
    state = {
        characters: [],
        input: '',
    }

    handleSearch = async() => {
        const data = await request.get(`https://serene-ridge-65358.herokuapp.com/api/rickmorty?search=${this.state.input}`)

        this.setState({characters: data.body.results,
        });
    }

    render() {
        return (
            <div className='search-bar'>
                <input value={this.state.input} onChange={(e) => this.setState({ input: e.target.value })} />
                <button className='myButton' onClick={this.handleSearch} >Search</button>
                <List characters={this.state.characters} />
            </div>
        )
    }
}
