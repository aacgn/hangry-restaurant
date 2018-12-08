import React from 'react';

export default class MealListView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return ( 
            <div className="meal-list">
                <div className="meal-list__image" style={ { backgroundImage: `url(${ this.props.url})`}}>
                </div>
    
                <div className="meal-list__info">
                    <div className="meal-list__name">
                        { this.props.name }
                    </div>
                    <div className="meal-list__data">
                        { this.props.description }
                    </div>
                </div>
            </div>
        );
    }
}
