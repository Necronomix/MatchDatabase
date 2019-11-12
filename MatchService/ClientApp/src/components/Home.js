import React, { Component } from 'react';

export class Home extends Component {
  displayName = Home.name

  render() {
    return (
      <div>
        <h1>Soccer database</h1>
            <p>Welcome to the greatest match database available</p>
<br/>
            <a href="/fetchdata">Move to the database</a>
      </div>
    );
  }
}
