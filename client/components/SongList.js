/**
 * GraphQL + React Strategy
 *
 * 1. Identify data required
 * 2. Write query in Graphiql (for practice) and in component file
 * 3. Bond query + component
 * 4. Access data!
 */
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import fetchSongs from '../queries/fetchSongs';
import deleteSong from '../queries/deleteSong';

class SongList extends Component {
  onSongDelete(id) {
    this.props
      .mutate({
        variables: { id },
        // refetchQueries: [{ query: fetchSongs }],
      })
      .then(() => {
        this.props.data.refetch();
      });
  }

  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => {
      return (
        <li key={id} className="collection-item">
          <Link to={`songs/${id}`}>{title}</Link>
          <i
            className="material-icons"
            onClick={() => {
              this.onSongDelete(id);
            }}
          >
            delete
          </i>
        </li>
      );
    });
  }

  render() {
    console.log(this.props);

    if (this.props.data.loading) {
      return <div>Loading</div>;
    }
    return (
      <div>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

export default graphql(deleteSong)(graphql(fetchSongs)(SongList));
