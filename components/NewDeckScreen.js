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

class NewDeckScreen extends React.Component {

  state = {
    title: ''
  }

  handleAddDeck = () => {
    this.state.title
    ? this.props.actions.asyncAddDeck(this.state.title)
    : alert('Please enter a title for the new deck.')
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'space-around', padding: 10 }}>
        <Text style={{alignSelf: 'center'}}>Add New Deck</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(title) => this.setState({title})}
          value={this.state.text}
        />
        <KeyboardAvoidingView behavior='position'>
          <Button title='Add Deck' onPress={this.handleAddDeck}/>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    decks: state.decks
  };
}

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(null, mapActionsToProps)(NewDeckScreen);
