import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';

import * as actions from  '../actions';

class QuizScreen extends React.Component {

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

  handleResetDeck(deck_id) {
    
  }

  render() {
    const deck = this.props.decks[this.props.navigation.getParam('deck_id')];
    const unAnsweredCards = Object.values(deck.cards).filter(card => card.correctness === null);

    if(unAnsweredCards.length !== 0) {
      const card = unAnsweredCards[0];
      if(this.state.view === 'question') {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
            <Text>{card.question}</Text>
            <Button title='Show Answer' onPress={() => this.handleShowAnswer()} />
          </View>
        );
      } else {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
            <Text>{card.answer}</Text>
            <Text>How was your guess?</Text>
            <Button title='Correct' onPress={() => this.handleEvaluateCard(card.deck_id, card.id, 'correct')} />
            <Button title='Wrong' onPress={() => this.handleEvaluateCard(card.deck_id, card.id, 'wrong')} />
          </View>
        );
      }
    }
    const answers = Object.values(deck.cards).map(card => card.correctness === 'correct' ? 1 : 0)
    const score = answers.reduce((p,q) => p+q, 0)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{`Score: ${score} out of ${answers.length}`}</Text>
        <Button title='Reset Deck' onPress={() => this.handleResetDeck(deck.id)} />
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
