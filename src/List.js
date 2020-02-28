import React, { Component } from 'react'

export default class List extends Component {
    render() {
        return (
            <div className='flex-contain'>
                {
                    this.props.characters.map(char => <div className='char-container'>
                    { char.name }
                    </div>)
                }
            </div>
        )
    }
}
