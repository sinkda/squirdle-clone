import React from 'react';
import Autocomplete from './Autocomplete';
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
        this.autoCompleteRef = React.createRef();

        this.defaultState = {
            outlineErrorState: 'outline-none outline-1 hover:outline-blue-200'          
        };

        this.stateChanges = {
            outlineErrorState: 'outline outline-red-600 outline-2'
        }

        this.state = this.defaultState;
    }

    handleAutocompleteClick(name)
    {
        this.inputRef.current.value = name;
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

        // TODO: Implement on Autocomplete
        if(search === '')
            this.autoCompleteRef.current.setAutocompleteState(false);
        else
            this.autoCompleteRef.current.searchPokemonByName(search);
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

        // TODO: IMplement on Autocomplete
        this.setState(this.defaultState);
        this.autoCompleteRef.current.setAutocompleteState(false);
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

                <Autocomplete ref={this.autoCompleteRef} handleAutocompleteClick={this.handleAutocompleteClick}/>
            </div>
        );
    }
}

export default Guess;