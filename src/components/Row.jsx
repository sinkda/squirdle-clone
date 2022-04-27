import React from 'react';
import Title from './Title';

class Row extends React.Component
{
    findLayout(str)
    {
        const layouts = {
            'c': './images/correct.png',
            'd': './images/down.png',
            'u': './images/up.png',
            'w': './images/wrong.png',
            'p': './images/wrongpos.png'
        };
    
        return layouts[str];
    }

    render()
    {
        let row = [];

        for(let i = 0; i < 5; i++)
        {
            let src = this.findLayout(this.props.layout.charAt(i));
            row.push(<img src={src} alt="Pokeball" key={i} className="h-14 w-14 my-2 mx-2 md:h-auto md:w-auto" />);
        }
    
        return (<div className="flex flex-col">
            
            <div className="flex flex-row">
                { row }
            </div>

            <Title header={this.props.header} pokemon={this.props.pokemon} />
        </div>);
    }
}

export default Row;