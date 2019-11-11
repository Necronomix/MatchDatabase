import React, { Component } from 'react';

export class FetchData extends Component {
    displayName = FetchData.name

    constructor(props) {
        super(props);
        this.state = { matches: [], loading: true };

        fetch('api/MatchData/MatchInfo')
            .then(response => response.json())
            .then(data => {
                this.setState({ matches: data, loading: false });
            });
    }


    static splitDateTime(dateText, takeDate = true) {
        let splitIndex = dateText.indexOf('T');

        if (splitIndex + 1 > dateText.length) {
            return '';
        }

        let date = dateText.substring(takeDate ? 0 : splitIndex + 1, takeDate ? splitIndex : dateText.length);
        return date 
    }


    static renderForecastsTable(matches) {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Home Team</th>
                        <th>Away Team</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {matches.map(match => 
                        <tr key={match.id}>
                            <td>{FetchData.splitDateTime(match.matchDate)}</td>
                            <td>{FetchData.splitDateTime(match.matchDate, false)}</td>
                            <td>{match.homeTeam.name}</td>
                            <td>{match.awayTeam.name}</td>
                            <td>{match.homeGoals + " - " + match.awayGoals}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchData.renderForecastsTable(this.state.matches);

        return (
            <div>
                <h1>Weather forecast</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }
}
