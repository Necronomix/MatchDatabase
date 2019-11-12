import React, { Component } from 'react';

export class ShowMatch extends Component {

    constructor(props) {
        super(props);

        let matchData = props.match ? props.match : null;

        this.state = { match: matchData };

        //fetch('api/MatchData/MatchInfo')
        //    .then(response => response.json())
        //    .then(data => {
        //        this.setState({ matches: data, loading: false });
        //    });
    }

    static renderMatchData(match) {
        return (
            <div class="container">
                <p>hehei</p>
            </div>
);
    }


    render() {
        let contents = this.state.match
            ? ShowMatch.renderMatchData(this.state.match)
            : <p><em>No match selected</em></p>;


        return (
            <div>
                <h1>Match database</h1>
                {contents}
            </div>
        );
    }
}