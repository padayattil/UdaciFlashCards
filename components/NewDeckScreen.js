import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  TouchableNativeFeedback } from 'react-native';

import * as actions from  '../actions';

class NewDeckScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Text style={{fontWeight: 'bold', fontSize: 20}}>New Deck</Text>
  });

  state = {
    title: ''
  }

  handleAddDeck() {
    this.state.title
    ? this.props.actions.asyncAddDeck(this.state.title)
      .then((deck) => this.props.navigation.replace('DeckDetail', {deck_id: deck.id}))
    : alert('Please enter a title for your new deck.')
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', padding: 10 }}>
        <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', padding: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 40, textAlign: 'center' }}>{'Enter a title for your new deck'}</Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            placeholder='Deck Title'
            onChangeText={(title) => this.setState({title})}
            value={this.state.text}
          />
        </View>
        <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', padding: 10 }}>
          <TouchableNativeFeedback onPress={() => this.handleAddDeck()}>
            <View style={{ backgroundColor: '#4CAF50', height: 50, marginVertical: 10, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: 'white' }}>Add Deck</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  }
}

function mapActionsToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(null, mapActionsToProps)(NewDeckScreen);
