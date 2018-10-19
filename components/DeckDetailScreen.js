import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, TouchableNativeFeedback, Alert } from 'react-native';

import * as actions from '../actions';

class DeckDetail extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Text style={{fontWeight: 'bold', fontSize: 20}}>Deck</Text>
  });

  handleStartQuiz(deck) {
    Object.keys(deck.cards).length === 0
    ? alert('Sorry, there are no cards in the deck.')
    : this.props.navigation.navigate('Quiz', {deck_id: deck.id})
  }

  handleAddCard(deck_id) {
    this.props.navigation.navigate('NewCard', {deck_id});
  }

  handleDeleteDeck(deck_id) {
    Alert.alert(
      'Delete Deck',
      'Are you sure you want to delete this deck?',
      [
        {text: 'Delete', onPress: () => this.props.actions.asyncDeleteDeck(deck_id).then(() => this.props.navigation.goBack())},
        {text: 'Cancel', style: 'cancel'},
      ],
      { cancelable: false }
    )
  }

  render() {
    const deck = this.props.decks[this.props.navigation.getParam('deck_id')];
    if (!deck) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
          <Text>Please wait..</Text>
        </View>
      );
    }

    return (
      <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', padding: 10 }}>
        <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', padding: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 40, textAlign: 'center' }}>{deck.title}</Text>
          <Text style={{ fontWeight: 'bold', textAlign: 'center', color: '#A9A9A9' }}>{Object.keys(deck.cards).length} cards</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'flex-start', padding: 10 }}>
          <TouchableNativeFeedback onPress={() => this.handleAddCard(deck.id)}>
            <View style={{ backgroundColor: '#4CAF50', height: 50, marginVertical: 10, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: 'white' }}>Add Card</Text>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback onPress={() => this.handleStartQuiz(deck)}>
            <View style={{ backgroundColor: '#4CAF50', height: 50, marginVertical: 10, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>Start Quiz</Text>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback onPress={() => this.handleDeleteDeck(deck.id)}>
            <View style={{ height: 50, marginVertical: 30, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'red' }}>Delete Deck</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
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

export default connect(mapStateToProps, mapActionsToProps)(DeckDetail);
