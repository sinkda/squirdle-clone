import React from 'react';

class Title extends React.Component
{
    constructor(props)
    {
        super(props);

        this.handleTitleClick = this.handleTitleClick.bind(this);

        this.state = {
            hintOpen: false
        };
    }

    handleTitleClick()
    {
       this.setState({
           hintOpen: !this.state.hintOpen
       });
    }


    render() {
        return (
            <div className="flex justify-center text-white text-lg underline decoration-2 decoration-blue-200 hover:decoration-blue-400 hover:text-blue-200 
                 transition duration-200 ease-in-out cursor-pointer relative" 
                 onClick={this.handleTitleClick}>
                {this.props.header}

                {this.state.hintOpen && 
                    (<div>
                        <div className="flex flex-col absolute z-10 bottom-0 left-0 right-0 bg-white rounded-lg border-1 border-gray-500 p-4 text-gray-900">
                            <div className="text-xl font-bold">{this.props.header}</div>
                            
                            <div className="text-sm grid grid-cols-2 p-1">
                                <div><span className="font-semibold">Gen:</span> {this.props.pokemon[0]}</div>
                                <div><span className="font-semibold">Type:</span> {this.props.pokemon[1]} / {(this.props.pokemon[2] !== '') ? this.props.pokemon[2] : 'None'}</div>
                                <div><span className="font-semibold">Height:</span> {this.props.pokemon[3]}m</div>
                                <div><span className="font-semibold">Weight:</span> {this.props.pokemon[4]}kg</div>
                            </div>
                        </div>

                        <div className="fixed top-0 bottom-0 left-0 right-0 z-5 bg-black/20"></div>
                    </div>)
                }
            </div>
        );
    }
}

export default Title;