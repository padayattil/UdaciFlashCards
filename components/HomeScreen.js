import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, Button, TouchableNativeFeedback } from 'react-native';

import * as actions from  '../actions';

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Text>FlashCards</Text>,
    headerRight: (
      <Button
        onPress={() => navigation.navigate('NewDeck')}
        title="+"
      />
    ),
  });

  componentDidMount() {
    this.props.actions.asyncGetDecks();
  }

  gotoPage = () => {
    this.props.navigation.navigate('DeckDetail');
  }

  render() {
    const decks = Object.values(this.props.decks);
    return (
      <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'space-around' }}>
        {
          decks.length !== 0
          ? decks.map((deck => <TouchableNativeFeedback key={deck.id} onPress={() => this.gotoPage()}><View style={{backgroundColor: 'red'}}><Text>{deck.title}</Text></View></TouchableNativeFeedback>))
          : <View><Text>No decks to show.</Text></View>
        }
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    decks: state.decks
  }
}

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapActionsToProps)(HomeScreen);
