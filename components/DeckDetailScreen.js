import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableNativeFeedback } from 'react-native';

class DeckDetail extends React.Component {

  handleStartQuiz = (deck_id) => {
    this.props.navigation.navigate('Quiz', {deck_id});
  }

  handleAddCard = (deck_id) => {
    this.props.navigation.navigate('NewCard', {deck_id});
  }

  render() {
    const deck = this.props.decks[this.props.navigation.getParam('deck_id')];
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
        <Text>{deck.title}</Text>
        <Text>n cards</Text>
        <TouchableNativeFeedback onPress={() => this.handleAddCard(deck.id)}>
          <View style={{backgroundColor: 'blue'}}><Text>Add Card</Text></View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={() => this.handleStartQuiz(deck.id)}>
          <View style={{backgroundColor: 'yellow'}}><Text>Start Quiz</Text></View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback>
          <View style={{backgroundColor: 'red'}}><Text>Delete Stack</Text></View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { decks: state.decks };
}

export default connect(mapStateToProps)(DeckDetail);
