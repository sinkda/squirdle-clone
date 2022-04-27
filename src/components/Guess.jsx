import React from 'react';
import reactStringReplace from 'react-string-replace';
import pokedex from '../assets/pokedex.json';


class Guess extends React.Component
{
    constructor(props)
    {
        super(props);

        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleAutocompleteClick = this.handleAutocompleteClick.bind(this);
        this.handleGuess = this.handleGuess.bind(this);
        this.transitionGuessError = this.transitionGuessError.bind(this);

        this.inputRef = React.createRef();

        this.defaultState = {
            suggestions: null,
            autocompleteState: 'hidden',
            outlineErrorState: 'outline-none outline-1 hover:outline-blue-200'          
        };

        this.stateChanges = {
            autocompleteState: 'flex',
            outlineErrorState: 'outline outline-red-600 outline-2'
        }

        this.state = this.defaultState;
    }

    searchPokemonByName(search)
    {
        let searchLimit = 5;

        let found = Object.keys(pokedex).filter(element => element.toLowerCase().includes(search.toLowerCase()));

        let output = found.slice(0, searchLimit);

        return output;
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
                    <div><span className="font-semibold">Height:</span> {pokedex[value][3]}</div>
                    <div><span className="font-semibold">Weight:</span> {pokedex[value][4]}</div>
                </div>
            </div>
            );
        });

        this.setState({
            suggestions: suggestions
        });
    }

    handleAutocompleteClick(name)
    {
        this.inputRef.current.value = name;

        this.setState({
            autocompleteState: this.defaultState.autocompleteState
        });
    }

    handleKeyPress(e)
    {
        let search = '';

        // catch Enter for submit
        if(e.keyCode === 13)
        {
            e.preventDefault();
            this.handleGuess();
            return;
        }

        // Catch for non-alphabetical keys (like Backspace, Delete, etc.)
        if(e.keyCode >= 65 && e.keyCode <= 90)
            search = e.target.value + e.key;
        else
            search = e.target.value;      

        if(search === '')
            this.setState({
                autocompleteState: this.defaultState.autocompleteState
            });
        else
        {
            let found = this.searchPokemonByName(search);
            this.populateSearch(found, search);
    
            this.setState({
                autocompleteState: this.stateChanges.autocompleteState
            });
        }
    }

    handleGuess()
    {
        if(!pokedex.hasOwnProperty(this.inputRef.current.value))
        {
            this.setState({
                outlineErrorState: this.stateChanges.outlineErrorState
            });

            setTimeout(this.transitionGuessError, 3000);
            return;
        }

        this.props.handleGuess(this.inputRef.current.value);

        this.setState(this.defaultState);
        this.inputRef.current.value = '';
    }

    transitionGuessError()
    {
        this.setState({
            outlineErrorState: this.defaultState.outlineErrorState
        });
    }

    render() {
        return (
            <div>
                <div className="mt-6">
                    <label htmlFor="guess" className="text-blue-200 text-lg">Guess a Pokemon</label>
                    <div className="flex flex-row items-center w-full h-full mt-2">
                        <input type="text" onKeyDown={this.handleKeyPress} className={`p-2 ${this.state.outlineErrorState} transition duration-200 ease-in-out`} 
                            name="guess" ref={this.inputRef} placeholder="Who's That Pokemon?" autoComplete="off"/>
                        <button className='shadow-md bg-blue-400 hover:bg-blue-600 text-white rounded-r-xl p-1 h-11 transition-all duration-200 ease-in-out' onClick={this.handleGuess}>Guess!</button>
                    </div>
                </div>

                <div className="relative z-10">
                    <div className={`absolute left-0 right-0 top-1 bg-white border-slate-900 flex-col ${this.state.autocompleteState} rounded`} ref={this.autocompleteRef}>
                        { this.state.suggestions }
                    </div>
                </div>
            </div>
        );
    }
}

export default Guess;