import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  KeyboardAvoidingView,
  Text,
  TextInput,
  Button } from 'react-native';

import * as actions from  '../actions';

class NewCardScreen extends React.Component {

  state = {
    question: '',
    answer: ''
  }

  handleAddCard() {
    const deck = this.props.decks[this.props.navigation.getParam('deck_id')];
    if (!this.state.question) {
      alert('Please enter a question for the new card.');
    } else if (!this.state.answer) {
      alert('Please enter the answer for the new card.');
    } else {
      this.props.actions.asyncAddCard(deck.id, this.state.question, this.state.answer);
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'space-around', padding: 10 }}>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(question) => this.setState(state => Object.assign({}, state, {question}))}
          placeholder='Question'
          value={this.state.question}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(answer) => this.setState(state => Object.assign({}, state, {answer}))}
          placeholder='Answer'
          value={this.state.answer}
        />
        <KeyboardAvoidingView behavior='position'>
          <Button title='Submit' onPress={() => this.handleAddCard()} />
        </KeyboardAvoidingView>
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

export default connect(mapStateToProps, mapActionsToProps)(NewCardScreen);
