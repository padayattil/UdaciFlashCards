import React from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';

class DeckDetail extends React.Component {

  handleStartQuiz = (deck) => {
    this.props.navigation.navigate('Quiz', {deck});
  }

  handleAddCard = (deck) => {
    this.props.navigation.navigate('NewCard', {deck});
  }

  render() {
    const deck = this.props.navigation.getParam('deck');
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
        <Text>{deck.title}</Text>
        <Text>n cards</Text>
        <TouchableNativeFeedback onPress={() => this.handleAddCard(deck)}>
          <View style={{backgroundColor: 'blue'}}><Text>Add Card</Text></View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={() => this.handleStartQuiz(deck)}>
          <View style={{backgroundColor: 'yellow'}}><Text>Start Quiz</Text></View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback>
          <View style={{backgroundColor: 'red'}}><Text>Delete Stack</Text></View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

export default DeckDetail;
