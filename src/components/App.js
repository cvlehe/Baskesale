import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import ajax from '../ajax';
import DealDetail from './DealDetail';
import DealList from './DealList';
import SearchBar from './SearchBar';

class App extends React.Component {
  state = {
    deals: [],
    dealsFromSearch: [],
    currentDealId: null,
  };

  async componentDidMount() {
    const deals = await ajax.fetchInitialDeals();
    this.setState({ deals });
  }

  searchDeals = async searchTerm => {
    let dealsFromSearch = [];
    if (searchTerm) {
      dealsFromSearch = await ajax.fetchDealsSearchResults(searchTerm);
    }
    console.log(dealsFromSearch);

    this.setState({ dealsFromSearch });
  };

  setCurrentDeal = dealId => {
    this.setState({ currentDealId: dealId });
  };

  unsetCurrentDeal = () => {
    this.setState({ currentDealId: null });
  };

  currentDeal = () => {
    return this.state.deals.find(deal => deal.key === this.state.currentDealId);
  };

  render() {
    if (this.state.currentDealId) {
      return (
        <DealDetail
          onBack={this.unsetCurrentDeal}
          initialDealData={this.currentDeal()}
        />
      );
    }

    const dealsToDisplay =
      this.state.dealsFromSearch.length > 0
        ? this.state.dealsFromSearch
        : this.state.deals;
    if (dealsToDisplay.length > 0) {
      return (
        <View style={{ flex: 1, paddingTop: 50 }}>
          <SearchBar searchDeals={this.searchDeals} />
          <DealList deals={dealsToDisplay} onItemPress={this.setCurrentDeal} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 40,
  },
});

export default App;
