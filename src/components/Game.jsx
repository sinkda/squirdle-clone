// import Row from './Row';
import pokedex from '../assets/pokedex.json';
import React from 'react';
import Row from './Row';
import Guess from './Guess';
import Finale from './Finale';
import { toHaveAccessibleDescription } from '@testing-library/jest-dom/dist/matchers';


class Game extends React.Component
{
    constructor(props) {
        super(props);

        this.startNewGame = this.startNewGame.bind(this);
        this.handleGuess = this.handleGuess.bind(this);
        this.handleWinCondition = this.handleWinCondition.bind(this);
        this.handleLoseCondition = this.handleLoseCondition.bind(this);

        this.maxGuesses = 8;

        this.defaultState = {
            pokemon: [],
            rows: [],
            currentGuess: 1,
            playing: (<Guess handleGuess={this.handleGuess} />)
        };   
        
        this.state = this.defaultState;
    }

    componentDidMount() {
        this.startNewGame();
    }

    startNewGame()
    {

        let length = Object.keys(pokedex).length;
        let random = parseInt(Math.random() * length);
        let name = Object.keys(pokedex)[random];
        let pick = pokedex[name];

        this.setState({
            pokemon: [name, pick],
            rows: [],
            currentGuess: 1,
            playing: this.defaultState.playing
        });


    }

    handleGuess(guess)
    {
        this.setState({
            currentGuess: this.state.currentGuess + 1
        })

        // handle win condition
        if(guess === this.state.pokemon[0])
        {
            let rows = this.state.rows;
            rows.push(<Row layout='ccccc' key={this.state.currentGuess} header={guess} />)
            this.setState({
                rows: rows
            });

            this.handleWinCondition();
            return;
        }

        // populate the new row.
        let pokemon = pokedex[guess];
        let layoutString = this.calculateGuessLayout(pokemon);

        let rows = this.state.rows;
        rows.push(<Row layout={layoutString} key={this.state.currentGuess} header={guess} pokemon={pokemon} />)
        this.setState({
            rows: rows
        });

        // see if that was our last guess
        if(this.state.currentGuess === this.maxGuesses)
            this.handleLoseCondition();

    }

    calculateGuessLayout(guess)
    {
        let layoutString = '';
        
        layoutString += this.compareGeneration(guess[0]);
        layoutString += this.compareTypes(guess[1], guess[2]);
        layoutString += this.compareHeight(guess[3]);
        layoutString += this.compareWeight(guess[4]);

        return layoutString;
    }

    compareGeneration(guess)
    {
        let gen = this.state.pokemon[1][0];

        if(gen === guess)
            return 'c';
        else if(gen > guess)
            return 'u';
        else
            return 'd';
    }

    compareTypes(type1, type2)
    {
        let pokemonType1 = this.state.pokemon[1][1];
        let pokemonType2 = this.state.pokemon[1][2];

        let layoutString = '';

        // find for type1
        if(type1 === pokemonType1)
            layoutString += 'c';
        else if(type1 === pokemonType2)
            layoutString += 'p';
        else
            layoutString += 'w';

        // find for type2
        if(type2 === pokemonType2)
            layoutString += 'c';
        else if(type2 === pokemonType1)
            layoutString += 'p';
        else
            layoutString += 'w';

        return layoutString;
    }

    compareHeight(height)
    {
        let pokemonHeight = this.state.pokemon[1][3];

        if(pokemonHeight === height)
            return 'c';
        else if(pokemonHeight > height)
            return 'u';
        else;
            return 'd';
    }

    compareWeight(weight)
    {
        let pokemonWeight = this.state.pokemon[1][4];

        if(pokemonWeight === weight)
            return 'c';
        else if(pokemonWeight > weight)
            return 'u';
        else;
            return 'd';
    }

    handleWinCondition()
    {
        this.setState({
            playing: (<Finale status='win' pokemon={this.state.pokemon} />)
        });
    }

    handleLoseCondition()
    {
        this.setState({
            playing: (<Finale status='lose' pokemon={this.state.pokemon} newGame={this.startNewGame} />)
        });
    }


    render() {

        return (
            <div className="flex flex-col flex-1 items-center justify-start mt-3 w-fit">
                <div>
                    { this.state.playing }
                </div>

                <div className="grid grid-flow-col w-full text-blue-200 mt-6">
                    <span className="text-center w-full">Gen</span>
                    <span className="text-center w-full">Type 1</span>
                    <span className="text-center w-full">Type 2</span>
                    <span className="text-center w-full">Height</span>
                    <span className="text-center w-full">Weight</span>
                </div>
                
                <div>
                    { this.state.rows }
                </div>

                
            </div>
            );
    }
}


export default Game;