import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom'
import Photo from './Photo';
import NoResults from './NoResults';


class Photos extends PureComponent {

  componentDidMount = () => {
    // Lifts App.js state to search for image keyword
    this.props.history.listen(location => this.props.search(location.pathname.replace(/[^\w\s]/gi, '').replace("search", '')));
    this.props.search(this.props.text);
  }

  render() {
    const results = this.props.data;
    let photos;
    if (results.length) {
     // Maps each photo in the 16 photo Flickr object received from App.js and passes them to Photo.js
     photos = results.map(photo =>
        <Photo key={photo.id} url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_n.jpg`} pathId={photo.id} />
      );
    } else {
      photos = <NoResults />
    }
    // Returns loading Flickr animated logo icon while waiting for API fetch, once fetch is successful it displays image thumbnail gallery to the page 
    return (
      <ul className="photo-list">
        {this.props.loading ? <img className="loading" src={require("../images/flickr.svg")} alt="Loading Flickr..." /> : photos}
      </ul>
    );
  }

}

export default withRouter(Photos);