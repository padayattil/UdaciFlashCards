import {
  RECEIVE_DECKS,
  ADD_DECK,
  DELETE_DECK,
  ADD_CARD,
  EVALUATE_CARD } from '../actions';
import { filteredObject } from '../utils';

export default function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {...state, ...action.decks}
    case ADD_DECK:
      return {...state, ...{[action.deck.id]: action.deck}}
    case DELETE_DECK:
      return filteredObject(state, (deck) => deck.id !== action.deck_id)
    case ADD_CARD: {
      const card = {
        deck_id: action.card.deck_id,
        id: action.card.id,
        question: action.card.question,
        answer: action.card.answer,
        correctness: null
      }
      const deck_cards = {...state[action.card.deck_id].cards, ...{[card.id]: card}}
      const deck = {...state[action.card.deck_id], ...{cards: deck_cards}}
      return {...state, ...{[deck.id]: deck}}
    }
    case EVALUATE_CARD: {
      const card = {...state[action.card.deck_id].cards[action.card.id], ...{correctness: action.card.correctness}}
      const deck_cards = {...state[card.deck_id].cards, ...{[card.id]: card}}
      const deck = {...state[card.deck_id], ...{cards: deck_cards}}
      return {...state, ...{[deck.id]: deck}}
    }
    default:
      return state
  }
}
