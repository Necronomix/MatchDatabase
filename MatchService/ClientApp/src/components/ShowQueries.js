import React, { Component } from 'react';
import { ShowMatch } from './ShowMatch';
import { HelperFunctions } from './HelperFunctions';

class Query {
    searchQuery = null;
    fromDate = null;
    toDate = null;
}


export class ShowQueries extends Component {
    displayName = ShowQueries.name

    constructor(props) {
        super(props);
        this.state = { matches: [], selectedMatch: false, loading: true, searchQuery: new Query() };

        fetch('api/MatchData/MatchInfo')
            .then(response => response.json())
            .then(data => {
                this.setState({ matches: data, loading: false });
            });
    }

    resetSelectedMatch() {
        this.setState({ selectedMatch: null });
    }


    selectMatchId(id) {
        fetch('api/MatchData/SingleMatch?id=' + id)
            .then(response => response.json())
            .then(data => {
                this.setState({ selectedMatch: data });
            })
    }


    onFromSearchDateChanged(event) {
        let fromDate = new Date(event.target.value);

        let queryObject = this.state.searchQuery;
        queryObject.fromDate = fromDate;
        this.setState({ searchQuery: queryObject });
    }


    onToSearchDateChanged(event) {
        let toDate = new Date(event.target.value);
        toDate.setHours(23, 59);

        let queryObject = this.state.searchQuery;
        queryObject.toDate = toDate;
        this.setState({ searchQuery: queryObject });
    }


    onSearchInput(event) {
        let search = null;
        if (event.target.value.length > 0) {
            search = event.target.value;
        }

        let queryObject = this.state.searchQuery;

        queryObject.searchQuery = search;

        this.setState({ searchQuery: queryObject });
    }


    /**
     * Since we have to query the whole data anyway, going through data in the front-end makes sense
     * @param {any} match
     * @param {any} query
     */
    static checkQueryStringWithMatch(match, query) {
        if (query === null) {
            return true;
        }

        let queryAsUpper = query.searchQuery !== null ? query.searchQuery.toUpperCase() : '';

        if (!match.homeTeam.name.toUpperCase().includes(queryAsUpper) &&
            !match.awayTeam.name.toUpperCase().includes(queryAsUpper)) {
            return false;
        }

        let dateInMatch = new Date(match.matchDate);

        if (query.fromDate !== null) {
            if (dateInMatch - query.fromDate < 0) {
                return false;
            }
        }

        if (query.toDate !== null) {
            if (dateInMatch - query.toDate > 0) {
                return false;
            }
        }

        return true;
    }





    renderMatchTables(matches, query) {
        let eventHandlerClass = this;
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
                    {matches.map(match => ShowQueries.checkQueryStringWithMatch(match, query) && match.homeTeam !== null && match.awayTeam !== null ?
                        <tr key={match.id}>
                            <td><a onClick={eventHandlerClass.selectMatchId.bind(this, match.id)}>{HelperFunctions.takeDateFromDateTime(match.matchDate)}</a></td>
                            <td>{HelperFunctions.takeTimeFromDateTime(match.matchDate)}</td>
                            <td>{HelperFunctions.renderLogoIfValidUrl(match.homeTeam.logoUrl)} {match.homeTeam.name}</td>
                            <td>{HelperFunctions.renderLogoIfValidUrl(match.awayTeam.logoUrl)} {match.awayTeam.name}</td>
                            <td>{match.homeGoals + " - " + match.awayGoals}</td>

                        </tr>
                        :
                        null
                    )}
                </tbody>
            </table>
        );
    }


    static renderQuestionBox(text, bindeable, bindFunction) {
        return (
            <div className="col-md-3">
                <div className="input-group">
                    <span className="input-group-addon" id="basic-addon1">{text}</span>
                    <input type="date" className="form-control" placeholder="Date" aria-describedby="basic-addon1" onChange={bindFunction.bind(bindeable)} />
                </div>
            </div>)
    }


    static renderSearch(bindeable) {
        //TODO: fix DOM problem with the third div "Warning: Invalid DOM property `class`. Did you mean `className`".
        return (
            <form>
                <div className="container">
                    <div className="row with-margin-bottom">
                        <div className="col-md-6">
                            <p>Search for the games played.</p>
                        </div>
                    </div>
                    <div className="row with-margin-bottom" >
                        <div className="col-md-6">
                            <div className="input-group">
                                <span className="input-group-addon" id="basic-addon1">Search</span>
                                <input type="text" className="form-control" placeholder="Username" aria-describedby="basic-addon1" size="50" onChange={bindeable.onSearchInput.bind(bindeable)} />
                            </div>
                        </div>
                    </div>
                    <div className="row with-margin-bottom">
                        {ShowQueries.renderQuestionBox('From', bindeable, bindeable.onFromSearchDateChanged)}
                        {ShowQueries.renderQuestionBox('To', bindeable, bindeable.onToSearchDateChanged)}
                    </div>
                </div >
            </form >
        );
    }


    renderMatches() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderMatchTables(this.state.matches, this.state.searchQuery);

        let search = ShowQueries.renderSearch(this);

        return (<React.Fragment>{search} {contents}</React.Fragment>);
    }


    renderShowMatch() {
        return (<ShowMatch onMatchClosed={this.resetSelectedMatch.bind(this)} match={this.state.selectedMatch} />);
    }


    render() {
        let window = this.state.selectedMatch ? this.renderShowMatch() : this.renderMatches();

        return (
            <div>
                <h1>Match database</h1>
                {window}
            </div>
        );
    }
}
