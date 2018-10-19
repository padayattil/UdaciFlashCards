import React from 'react';
import { View, Text, TouchableNativeFeedback, Alert } from 'react-native';
import { Foundation } from '@expo/vector-icons';

function DeckListItem(props) {
  return (
    <TouchableNativeFeedback onPress={() => props.onPressHandler()}>
      <View style={{ flexDirection: 'row', alignItems:'center', justifyContent:'flex-start', elevation: 5, backgroundColor: '#D3D3D3', height: 70, marginVertical: 10 }}>
        <View style={{padding: 20}}>
          <Foundation name="list" size={48} color="green" />
        </View>
        <View>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>{props.deck.title}</Text>
          <Text>{Object.keys(props.deck.cards).length} cards</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

export default DeckListItem;
