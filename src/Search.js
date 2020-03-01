import React, { Component } from 'react'
import List from './List.js';
import request from 'superagent';

export default class Search extends Component {
    state = {
        characters: [],
        favorites: [],
        input: '',
    }
    componentDidMount = async() =>{
        const faves = await request.get(`https://serene-ridge-65358.herokuapp.com/api/me/favorites`)
        .set(`Authorization`, this.props.user.token);

        this.setState({favorites: faves})
        console.log(this.favorites)

    }

    handleSearch = async(e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const data = await request.get(`https://serene-ridge-65358.herokuapp.com/api/rickmorty?search=${this.state.input}`)

        this.setState({characters: data.body.results,
            loading: false,
        });

    }

    render() {
        return (
            <div>
                <div className='search-bar'>
                    <form onSubmit={this.handleSearch}>
                    <h1>Favorite Rick and Morty Characters</h1>
                    <input value={this.state.input} onChange={(e) => this.setState({ input: e.target.value })} />
                    <button disabled={this.state.loading} className='myButton'>Search</button>
                    </form>
                </div>
                {
                    this.state.loading
                    ? "Loading!!"
                    : <List 
                    characters={this.state.characters} 
                    favorites={this.state.favorites} 
                    user={this.props.user} />
                }
            </div>
        )
    }
}
