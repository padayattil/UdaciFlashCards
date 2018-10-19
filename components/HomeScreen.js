import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, TouchableNativeFeedback, FlatList } from 'react-native';

import DeckListItem from './DeckListItem';
import * as actions from  '../actions';

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <View style={{marginLeft: 10}}><Text style={{fontWeight: 'bold', fontSize: 20}}>FlashCards</Text></View>,
    headerRight: (
      <TouchableNativeFeedback onPress={() => navigation.navigate('NewDeck')}>
        <View style={{ marginRight: 20, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 30, color: 'black' }}>+</Text>
        </View>
      </TouchableNativeFeedback>
    ),
  });

  componentDidMount() {
    this.props.actions.asyncGetDecks();
  }

  handleViewDeck(deck_id) {
    this.props.navigation.navigate('DeckDetail', {deck_id});
  }

  render() {
    let decks = Object.values(this.props.decks).map(deck => Object.assign({}, deck, {key: deck.id}));
    return (
      <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'space-around', padding: 10 }}>
        {
          decks.length !== 0
          ? (
              <FlatList
                data={decks}
                renderItem={({item}) => <DeckListItem deck={item} onPressHandler={() => this.handleViewDeck(item.id)}/>}
              />
            )
          : (
              <View><Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>No decks to show.</Text></View>
            )
        }
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { decks: state.decks };
}

function mapActionsToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapActionsToProps)(HomeScreen);
