import {
  ADD_DECK,
  ADD_CARD,
  EVALUATE_CARD,
  RECEIVE_DECKS } from '../actions';

export default function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {...action.decks}
    case ADD_DECK:
      return {...state, ...{[action.deck.id]: action.deck}}
    case ADD_CARD: {
      const card = {
        deck_id: action.card.deck_id,
        id: action.card.id,
        question: action.card.question,
        answer: action.card.answer,
        correctness: null
      }
      const deck_cards = {...state[action.card.deck_id], ...{[card.id]: card}}
      return {...state, ...{[action.card.deck_id]: {...deck_cards}}}
    }
    case EVALUATE_CARD: {
      const card = {...state[action.card.deck_id][action.card.card_id], ...{correctness: action.card.correctness}}
      const deck_cards = {...state[action.card.deck_id], ...{[card.id]: card}}
      return {...state, ...{[action.card.deck_id]: {...deck_cards}}}
    }
    default:
      return state
  }
}
