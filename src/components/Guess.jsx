import React from 'react';
import pokedex from '../assets/pokedex.json';


class Guess extends React.Component
{
    constructor(props)
    {
        super(props);

        this.handleKeyPress = this.handleKeyPress.bind(this);

        this.state = {
            suggestions: null
        };
    }

    searchPokemonByName(name)
    {
        let searchLimit = 5;

        let keys = Object.keys(pokedex);
        let found = keys.filter(element => element.toLowerCase().startsWith(name.toLowerCase()));

        let output = found.slice(0, searchLimit);

        return output;
    }

    populateSearch(found, criteria)
    {   
        // const suggestions = found.map((value, index) => (<div key={index}>{
            
        //     // TODO:  Fix with a JSX Appropriate string replace
        //     value.replace(
        //         criteria,  
        //         '<span className="font-semibold">{criteria}</span>'
        //     )

        // }</div>)) ;

        // this.setState({
        //     suggestions: suggestions
        // });
    }

    handleKeyPress(e)
    {
        let found = this.searchPokemonByName(e.target.value);
        this.populateSearch(found, e.target.value);
    }

    render() {
        return (
            <div className="mt-6 relative">
                <label htmlFor="guess" className="text-blue-200 text-lg">Guess a Pokemon</label>
                <input type="text" onKeyDown={this.handleKeyPress} className="w-full p-2 mt-2 outline-none hover:outline-1 hover:outline-blue-200" name="guess" />

                <div className="absolute left-0 right-0 top-20 bg-white border-slate-900 flex flex-col">
                    { this.state.suggestions }
                </div>
            </div>
        );
    }
}

export default Guess;