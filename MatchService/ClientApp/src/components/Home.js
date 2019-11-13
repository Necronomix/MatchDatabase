import React, { Component } from 'react';

export class Home extends Component {
  displayName = Home.name

  render() {
    return (
      <div>
            <h1>Soccer database</h1>
        <hr/>
            <p>Welcome to the greatest match database available</p>
            <img width="50%" src={process.env.PUBLIC_URL + '/soccer-3568170_1280.jpg'} alt="Image found from https://pixabay.com/fi/photos/jalkapallo-urheilu-pallo-3568170/" />
            <p>Enjoy the great functionalities provided! Soon to be added login for storing your preferences and GDPR compliance</p>
<br/>
            <a href="/fetchdata">Move to the database</a>
      </div>
    );
  }
}
