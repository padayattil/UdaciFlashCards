import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, Button, TouchableNativeFeedback } from 'react-native';

import * as actions from  '../actions';

class QuizScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Text style={{fontWeight: 'bold', fontSize: 20}}>Quiz</Text>
  });

  state = {
    view: 'question'
  }

  handleShowAnswer() {
    this.setState({view: 'answer'});
  }

  handleEvaluateCard(deck_id, card_id, correctness) {
    this.props.actions.asyncEvaluateCard(
      deck_id,
      card_id,
      correctness
    ).then(() => this.setState({view: 'question'}));
  }

  handleResetDeck(deck) {
    this.props.actions.asyncResetDeck(deck)
      .then(() => this.setState({view: 'question'}));
  }

  render() {
    const deck = this.props.decks[this.props.navigation.getParam('deck_id')];
    const unAnsweredCards = Object.values(deck.cards).filter(card => card.correctness === null);

    if(unAnsweredCards.length !== 0) {
      const card = unAnsweredCards[0];
      if(this.state.view === 'question') {
        return (
          <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', padding: 10 }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10, backgroundColor: '#D3D3D3' }}>
              <Text>{card.question}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'flex-end', padding: 10 }}>
              <TouchableNativeFeedback onPress={() => this.handleShowAnswer()}>
                <View style={{ backgroundColor: '#4CAF50', height: 50, marginVertical: 10, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: 'white' }}>Show Answer</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        );
      } else {
        return (
          <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'space-between', padding: 10 }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10, backgroundColor: '#D3D3D3' }}>
              <Text style={{textAlign: 'center'}}>{card.answer}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', padding: 10 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>How was your guess?</Text>
              <View style={{ alignItems: 'stretch', justifyContent: 'flex-start'}}>
                <TouchableNativeFeedback onPress={() => this.handleEvaluateCard(card.deck_id, card.id, 'correct')}>
                  <View style={{ backgroundColor: '#4CAF50', height: 50, marginVertical: 10, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: 'white' }}>Correct</Text>
                  </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => this.handleEvaluateCard(card.deck_id, card.id, 'wrong')}>
                  <View style={{ backgroundColor: '#4CAF50', height: 50, marginVertical: 10, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: 'white' }}>Wrong</Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
          </View>
        );
      }
    }
    const answers = Object.values(deck.cards).map(card => card.correctness === 'correct' ? 1 : 0)
    const score = answers.reduce((p,q) => p+q, 0)
    return (
      <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'space-between', padding: 10 }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10, backgroundColor: '#D3D3D3' }}>
          <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>{`Score`}</Text>
          <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 40}}>{`${score} out of ${answers.length}`}</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', padding: 10 }}>
          <TouchableNativeFeedback onPress={() => this.handleResetDeck(deck)}>
            <View style={{ backgroundColor: '#4CAF50', height: 50, marginVertical: 10, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: 'white' }}>Restart Quiz</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => this.props.navigation.goBack()}>
            <View style={{ backgroundColor: '#4CAF50', height: 50, marginVertical: 10, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: 'white' }}>Back to Deck</Text>
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

export default connect(mapStateToProps, mapActionsToProps)(QuizScreen);
