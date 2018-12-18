import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'

import apiKey from './config';
import axios from 'axios';
import NotFound from './Components/NotFound';
import Photos from './Components/Photos';
import Navigation from './Components/Navigation';

class App extends Component {
state = {
  photos: [],
  loading: true,
}

// Fetches Flickr API, and loads object containing 16 images that match the keyword into photos state.
performSearch = text => {
  this.setState({
    loading: true
  });
  axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${text}&per_page=16&sort=relevance&content_type=1&format=json&nojsoncallback=1`)
  .then(response => {
    this.setState({
      photos: response.data.photos.photo,
      loading: false
   });
})
.catch(error => {
  // eslint-disable-next-line no-console
  console.error('Error fetching Flickr API data', error);
});    
}


render() {
  // Creates url object from browser history.
  const history = createHistory();
  // Parses out just the search text from the url object.
  let searchText = history.location.pathname.replace(/[^\w\s]/gi, '').replace("search", '');

  return (
    // Builds app routes and sends parsed 16 Flickr photos object to Photos component
    <BrowserRouter>
    <div className="container">
      <Navigation />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/kittens" />} />
        <Route path="/kittens" render={() => <Photos data={this.state.photos} search={this.performSearch} text="kittens" loading={this.state.loading}/>} />
        <Route path="/puppies" render={() => <Photos data={this.state.photos} search={this.performSearch} text="puppies" loading={this.state.loading}/>} />
        <Route path="/red panda" render={() => <Photos data={this.state.photos} search={this.performSearch} text="red panda" loading={this.state.loading}/>} />
        <Route exact path="/search/:text" render={() => <Photos data={this.state.photos}  search={this.performSearch} text={searchText} loading={this.state.loading}/>} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
  );
}

}

export default App;
