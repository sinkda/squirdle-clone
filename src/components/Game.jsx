// import Row from './Row';
import pokedex from '../assets/pokedex.json';
import React from 'react';
import Row from './Row';
import Guess from './Guess';


class Game extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            pokemon: [],
            rows: []
        };      
    }

    renderRows()
    {
        return (<Row layout="cccud" />);
    }

    componentDidMount() {
        let length = Object.keys(pokedex).length;
        let random = parseInt(Math.random() * length);
        let name = Object.keys(pokedex)[random];
        let pick = pokedex[name];

        this.setState({
            pokemon: [name, pick]
        });
    }

    render() {

        return (
            <div className="flex flex-col items-center justify-center mt-8 w-fit">
                <div className="grid grid-flow-col w-full text-blue-200">
                    <span className="text-center w-full">Gen</span>
                    <span className="text-center w-full">Type 1</span>
                    <span className="text-center w-full">Type 2</span>
                    <span className="text-center w-full">Height</span>
                    <span className="text-center w-full">Width</span>
                </div>
                
                <div>
                    { this.renderRows() }
                </div>

                <div>
                    <Guess />
                </div>
            </div>
            );
    }
}


export default Game;