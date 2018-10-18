import * as API from '../utils/storage'

export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';
export const EVALUATE_CARD = 'EVALUATE_CARD';
export const RECEIVE_DECKS = 'RECEIVE_DECKS';

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

export function addCard(card) {
  return {
    type: ADD_CARD,
    card
  }
}

export function evaluateCard(deck_id, card_id, correctness) {
  return {
    type: EVALUATE_CARD,
    card
  }
}

export function asyncGetDecks() {
  return (dispatch) => {
    API.getDecks()
      .then((decks) => {
        dispatch(receiveDecks(decks))
      })
  }
}

export function asyncAddDeck(title) {
  return (dispatch) => {
    API.addDeck(title)
      .then((deck) => {
        dispatch(addDeck(deck))
      })
  }
}

export function asyncAddCard(deck_id, question, answer) {
  return (dispatch) => {
    API.addCard(deck_id, question, answer)
      .then((card) => dispatch(addCard(card)))
  }
}

export function asyncEvaluateCard(deck_id, card_id, correctness) {
  return (dispatch) => {
    API.addEvaludateCard(deck_id, question, answer)
      .then((card) => dispatch(evaluateCard(card)))
  }
}
