import React, {Component} from 'react';


export default class Search extends Component {
  
  state = {
    text: ''
  }
  
  // Listens to the search input field for when the user enters text
  onSearchChange = e => {
    this.setState({ text: e.target.value });
  }

  
  // Listens for when the user hits enter or clicks the submit button
  // Globally updates the value text via input
  handleSubmit = e => {
    e.preventDefault();
    if (this.text.value === ''){
      return;
    } else {
      this.props.onSubmit(this.state.text);
      e.currentTarget.reset();
    }
  }

  render() {  
    return (
      <div>
      <form className="search-form" onSubmit={this.handleSubmit}>
        <label>Photo Search Input</label>
        <input type="search"
               className="photo-search"
               onChange={this.onSearchChange}
               name="search" 
               ref={input => this.text = input}
               placeholder="Search..."
               autoComplete='off' />
        <button type="submit" id="submit" className="search-button"></button>
      </form>
      </div>
    );
  }
}
