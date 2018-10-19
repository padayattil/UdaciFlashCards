import * as API from '../utils/storage'

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const DELETE_DECK = 'DELETE_DECK';
export const ADD_CARD = 'ADD_CARD';
export const EVALUATE_CARD = 'EVALUATE_CARD';

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck
  }
}

export function deleteDeck(deck_id) {
  return {
    type: DELETE_DECK,
    deck_id
  }
}

export function addCard(card) {
  return {
    type: ADD_CARD,
    card
  }
}

export function evaluateCard(card) {
  return {
    type: EVALUATE_CARD,
    card
  }
}

export function asyncGetDecks() {
  return (dispatch) => {
    return API.getDecks()
      .then((decks) => {
        dispatch(receiveDecks(decks));
      })
  }
}

export function asyncAddDeck(title) {
  return (dispatch) => {
    return API.addDeck(title)
      .then((deck) => {
        dispatch(addDeck(deck));
        return deck;
      })
  }
}

export function asyncAddCard(deck_id, question, answer) {
  return (dispatch) => {
    return API.addCard(deck_id, question, answer)
      .then((card) => dispatch(addCard(card)))
  }
}

export function asyncEvaluateCard(deck_id, card_id, correctness) {
  return (dispatch) => {
    return API.evaluateCard(deck_id, card_id, correctness)
      .then((card) => dispatch(evaluateCard(card)))
  }
}

export function asyncResetDeck(deck) {
  return (dispatch) => {
    return API.resetDeck(deck)
      .then((deck) => {
        dispatch(receiveDecks({[deck.id]: deck}))
        return deck;
      })
  }
}

export function asyncDeleteDeck(deck_id) {
  return (dispatch) => {
    return API.deleteDeck(deck_id)
      .then(() => dispatch(deleteDeck(deck_id)));
  };
}
