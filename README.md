# MatchDatabase
Written by Tero Paavolainen using Visual Studio ASP.NET React Template. Developed in Visual Studio 2019.

ASP.NET database for displaying historical matches.

Frontend developed with React

## Structure

Simple .NET backend that reads the data from JSON file and then serves either all of the match details or a single match detail with an id.

Frontend uses React to serve a simple table of the match data in a single page app.

## Discussion
I was wondering a bit on the solution on how to implement the showing of all the matches and where to implement the search functionality.
Since it was a requirement that all of the items are shown, I figured that the best approach is to download data once on the page load and then do the search from that data on front.

I also wanted to implement an additional page since the React template has a lot of things implemented, unfortunately there was not that much interesting data to showcase about the singular matches and the events that happen in them would require some additional knowledge of how the matches are displayed.

Time spent on the project:
Monday 5:00
Tuesday 2:25
Wednesday 3:10

Totalling 10:45