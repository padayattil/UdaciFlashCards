import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  TouchableNativeFeedback } from 'react-native';

import * as actions from  '../actions';

class NewCardScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Text style={{fontWeight: 'bold', fontSize: 20}}>New Card</Text>
  });

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
      this.props.actions.asyncAddCard(deck.id, this.state.question, this.state.answer)
        .then(() => this.props.navigation.goBack());
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', padding: 10 }}>
        <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', padding: 10 }}>
          <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', padding: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>{'Enter the question'}</Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              placeholder='Question'
              onChangeText={(question) => this.setState(state => Object.assign({}, state, {question}))}
              value={this.state.question}
            />
          </View>
          <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', padding: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>{'Enter the answer'}</Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              placeholder='Answer'
              onChangeText={(answer) => this.setState(state => Object.assign({}, state, {answer}))}
              value={this.state.answer}
            />
          </View>
        </View>
        <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'flex-end', padding: 10 }}>
          <TouchableNativeFeedback onPress={() => this.handleAddCard()}>
            <View style={{ backgroundColor: '#4CAF50', height: 50, marginVertical: 10, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: 'white' }}>Submit</Text>
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

export default connect(mapStateToProps, mapActionsToProps)(NewCardScreen);
