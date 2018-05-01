import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';

import addSong from '../queries/addSong';
import fetchSongs from '../queries/fetchSongs';

class SongCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
    };
  }

  onSubmit(event) {
    event.preventDefault();

    console.log(this.props);

    this.props
      .mutate({
        variables: { title: this.state.title },
        refetchQueries: [{ query: fetchSongs }],
      })
      .then(() => hashHistory.push('/'))
      .catch(e => {
        console.warn(e);
      });
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input
            value={this.state.title}
            onChange={event => this.setState({ title: event.target.value })}
          />
        </form>
      </div>
    );
  }
}

export default graphql(addSong)(SongCreate);
