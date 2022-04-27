import React from 'react';
import Title from './Title';

class Finale extends React.Component
{
    render() {
        return (
            <div className="flex flex-col items-center">
                <div className="text-lg font-bold underline decoration-blue-500 text-blue-200">
                    {(this.props.status === 'win') &&
                      (<span>You Win!</span>)
                    }

                    {(this.props.status !== 'win') &&
                      (<span>Sorry, you didn't win :(</span>)
                    }
                </div>

                <div className="text-md text-white">
                    <div>
                        The winning Pokemon was: <Title header={this.props.pokemon[0]} pokemon={this.props.pokemon[1]} />
                    </div>
                </div>

                <div>
                    <button className="bg-blue-500 rounded-lg shadow-lg px-4 py-2 my-4 text-white hover:bg-blue-600 transition duration-200 ease-in-out" 
                            onClick={() => this.props.newGame()}>Start New Game</button>
                </div>
            </div>
        );
    }
}

export default Finale;