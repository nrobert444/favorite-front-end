import React, { Component } from 'react'
import request from 'superagent';
import { withRouter } from 'react-router-dom';

export default withRouter(class List extends Component {

    makeFavorite = async (char) => {

        const fave = await request.post(`https://serene-ridge-65358.herokuapp.com/api/me/favorites`, {
            name: char.name,
            status: char.status,
            species: char.species,
        })
        .set(`Authorization`, this.props.user.token );

        console.log('fave', fave.body)

    }
    renderButtonOrStar = (char) => {
        const isOnFavoritesList = this.props.favorites.find(person => char.name === person.name);
        if(!isOnFavoritesList) {
        return <button onClick={ (e) => this.makeFavorite(char)}>Make Favorite</button>
        }

    //     return <span>⭐</span>
    }

    render() {
        return (
            <div className='flex-contain'>
                {
                    this.props.characters.map(char => <div key={char.name} className='char-container'>
                    <div>Name: {char.name}</div>
                    <div>Status: {char.status}</div>
                    <div>Species: {char.species}</div>
                    {
                        this.props.location.pathname !== '/favorites' 
                            && this.renderButtonOrStar(char)
                    }
                </div>)
                }
            </div>
        )
    }
})
