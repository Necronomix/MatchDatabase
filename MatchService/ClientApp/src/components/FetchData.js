import React, { Component } from 'react';

class Query {
    searchQuery = null;
    fromDate = null;
    toDate = null;
}


export class FetchData extends Component {
    displayName = FetchData.name

    constructor(props) {
        super(props);
        this.state = { matches: [], loading: true, searchQuery: new Query() };

        fetch('api/MatchData/MatchInfo')
            .then(response => response.json())
            .then(data => {
                this.setState({ matches: data, loading: false });
            });
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


    static takeDateFromDateTime(dateText) {
        let result = dateText.match('[^T]*');
        return result[0];
    }


    static takeTimeFromDateTime(dateText) {
        let result = dateText.match('(^T)*T[^Z]*');
        //Getting the T out with regex proved a bit annoying to accomplish compared to the importance
        return result[0].replace('T', '');
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


    static renderLogoIfValidUrl(url, classes = '') {
        return url !== null ? <img src={url} class={classes} width="5%" height="5%" /> : null;
    }


    static renderMatchTables(matches, query) {
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
                    {matches.map(match => FetchData.checkQueryStringWithMatch(match, query) && match.homeTeam !== null && match.awayTeam !== null ?
                        <tr key={match.id}>
                            <td>{FetchData.takeDateFromDateTime(match.matchDate)}</td>
                            <td>{FetchData.takeTimeFromDateTime(match.matchDate)}</td>
                            <td>{FetchData.renderLogoIfValidUrl(match.homeTeam.logoUrl)} {match.homeTeam.name}</td>
                            <td>{FetchData.renderLogoIfValidUrl(match.awayTeam.logoUrl)} {match.awayTeam.name}</td>
                            <td>{match.homeGoals + " - " + match.awayGoals}</td>
                        </tr>
                        :
                        null
                    )}
                </tbody>
            </table>
        );
    }


    static renderSearch(bindeable) {
        const labelClasses = "label label-primary";

        return (
            <form>
                <div class="container">
                    <div class="row" >
                        <div class="col-md-1">
                            <label class={labelClasses}>
                                Search:
                            </label>
                        </div>
                        <div class="col-md-2 mb-3" width="40%">
                            <input type="text" size="50" onChange={bindeable.onSearchInput.bind(bindeable)} />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-1">
                            <label width="100%" class={labelClasses}>
                                From
                                </label>
                        </div>
                        <div class="col-md-2">
                            <input type="date" onChange={bindeable.onFromSearchDateChanged.bind(bindeable)} />
                        </div>
                        <div class="col-md-1">
                            <label class={labelClasses}>
                                To

                            </label>
                        </div>
                        <div class="col-md-1.5">
                            <input type="date" onChange={bindeable.onToSearchDateChanged.bind(bindeable)} />
                        </div>
                    </div>
                </div >
            </form >
        );
    }


    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchData.renderMatchTables(this.state.matches, this.state.searchQuery);

        let search = FetchData.renderSearch(this);

        return (
            <div>
                <h1>Match database</h1>
                <p>Search for the games played.</p>
                {search}
                {contents}
            </div>
        );
    }
}
