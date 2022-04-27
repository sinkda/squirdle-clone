import React from 'react';
import reactStringReplace from 'react-string-replace';
import pokedex from '../assets/pokedex.json';

class Autocomplete extends React.Component
{
    constructor(props)
    {
        super(props);

        this.handleAutocompleteClick = this.handleAutocompleteClick.bind(this);

        this.state = {
            suggestions: null,
            showAutocomplete: false
        };
    }

    setAutocompleteState(state)
    {
        this.setState({
            showAutocomplete: state
        });
    }

    searchPokemonByName(search)
    {
        let searchLimit = 5;

        let found = Object.keys(pokedex).filter(element => element.toLowerCase().includes(search.toLowerCase()));
        let output = found.slice(0, searchLimit);

        this.populateSearch(output, search);
    }

    populateSearch(found, criteria)
    {   
        const suggestions = found.map((value, index) => {
             
            return (
            <div key={index} className="flex flex-col border-b-2 border-b-slate-800 hover:bg-slate-200 hover:cursor-pointer"
                    onClick={() => this.handleAutocompleteClick(value)}>
                <div>
                    {reactStringReplace(value, criteria, (match, i) => (<span className="font-bold" key={i}>{match}</span>))}
                </div>
                <div className="text-xs grid grid-cols-2 p-1">
                    <div><span className="font-semibold">Gen:</span> {pokedex[value][0]}</div>
                    <div><span className="font-semibold">Type:</span> {pokedex[value][1]} / {(pokedex[value][2] !== '') ? pokedex[value][2] : 'None'}</div>
                    <div><span className="font-semibold">Height:</span> {pokedex[value][3]}m</div>
                    <div><span className="font-semibold">Weight:</span> {pokedex[value][4]}kg</div>
                </div>
            </div>
            );
        });

        this.setState({
            suggestions: suggestions
        });

        this.setAutocompleteState(true);
    }

    handleAutocompleteClick(name)
    {
        this.props.handleAutocompleteClick(name);

        this.setAutocompleteState(false);
    }

    render() {
        return (
            <div className="relative z-10">
                { this.state.showAutocomplete && 
                    (<div className="absolute left-0 right-0 top-1 bg-white border-slate-900 flex flex-col rounded" ref={this.autocompleteRef}>
                        { this.state.suggestions }
                    </div>)
                }
            </div>
        );
    }
}

export default Autocomplete;