import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TextInput } from 'react-native';
import debounce from 'lodash.debounce';

class SearchBar extends React.Component {
  static propTypes = {
    searchDeals: PropTypes.func.isRequired,
  };
  state = {
    searchTerm: '',
  };

  debouncedSearchDeals = debounce(this.props.searchDeals, 300);

  handleChange = searchTerm => {
    this.setState({ searchTerm }, () =>
      this.debouncedSearchDeals(this.state.searchTerm),
    );
  };

  render() {
    return (
      <TextInput
        placeholder="Search..."
        style={styles.input}
        onChangeText={this.handleChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    paddingStart: 20,
    height: 40,
  },
});

export default SearchBar;
