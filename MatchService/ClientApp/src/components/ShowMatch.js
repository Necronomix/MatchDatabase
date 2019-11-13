import React, { Component } from 'react';
import { HelperFunctions } from './HelperFunctions';

export class ShowMatch extends Component {

    constructor(props) {
        super(props);

        let matchData = props.match ? props.match : null;
        let closingHandler = props.onMatchClosed ? props.onMatchClosed : null;

        this.state = { match: matchData, onClose: closingHandler };
    }


    handleCloseButton() {
        if (this.state.onClose) {
            this.state.onClose();
        }
    }


    static renderLogos(match) {
        return (<div className="row">
            <div className="col-sm-2">
                {HelperFunctions.renderLogoIfValidUrl(match.homeTeam.logoUrl, "100%", "100%")}
            </div>
            <div className="col-sm-1">
                <p className="huge-text">VS</p>
            </div>
            <div className="col-sm-2">
                {HelperFunctions.renderLogoIfValidUrl(match.awayTeam.logoUrl, "100%", "100%")}
            </div>
        </div>)
    }


    static renderScores(match) {
        return (<div className="row">
            <div className="col-sm-2 huge-text text-center">
                {match.homeGoals}
            </div>
            <div className="col-sm-1">
            </div>
            <div className="col-sm-2 huge-text text-center">
                { match.awayGoals }
            </div>
        </div>)
    }


    renderMatchData(match) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <p className="huge-text">{HelperFunctions.takeDateFromDateTime(match.matchDate)}</p>
                    </div>
                    <div className="col-sm-3">
                        <p className="huge-text">{HelperFunctions.takeTimeFromDateTime(match.matchDate)}</p>
                    </div>
                    <div className="col-sm-1 col-right">
                        <button onClick={this.handleCloseButton.bind(this)}>X</button>
                    </div>
                </div>
                <hr />
                {ShowMatch.renderLogos(match)}
                {ShowMatch.renderScores(match)}
                <hr />
                //This page is mostly here to showcase the ability to do additional, parametrized query from the data
                <br/>
                //Data in the matches was not really worthwhile to showcase to the end user
            </div >
        );
    }


    render() {
        let contents = this.state.match
            ? this.renderMatchData(this.state.match)
            : <p><em>No match selected</em></p>;


        return (
            <div>
                {contents}
            </div>
        );
    }
}