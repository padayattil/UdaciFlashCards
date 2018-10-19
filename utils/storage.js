import { AsyncStorage } from 'react-native';

import { generateUID, filteredObject } from './index';

export function getDeckIds() {
  return AsyncStorage.getItem('DECK_IDS')
    .then((value) => (JSON.parse(value) || []))
}

export function getCard(deck_id, card_id) {
  return AsyncStorage.getItem(`CARD.${deck_id}.${card_id}`)
    .then(value => JSON.parse(value));
}

export function getDeck(deck_id) {
  return AsyncStorage.getItem(`DECK.${deck_id}`)
    .then(deckString => JSON.parse(deckString))
    .then(deckData => Promise.resolve(Promise.all(
      deckData.card_ids.map(card_id => getCard(deckData.id, card_id))
    ).then(cards => ({id: deckData.id, title: deckData.title, cards}))));
}

export function getDecks() {
  const decks ={}
  return getDeckIds()
    .then(deck_ids => Promise.resolve(Promise.all(
      deck_ids.map(deck_id => getDeck(deck_id))
    )))
    .then(results => {
      for(deck of results) {
        decks[deck.id] = deck;
      }
      return decks;
    });
}

export function addDeck(title) {
  const deck = {
    id: generateUID(),
    title,
    card_ids: []
  }
  return Promise.all([getDeckIds(), AsyncStorage.setItem(`DECK.${deck.id}`, JSON.stringify(deck))])
    .then(results => results[0])
    .then(deck_ids => AsyncStorage.setItem('CARD_IDS', JSON.stringify([...deck_ids, deck.id])))
    .then(() => ({id: deck.id, title: deck.title, cards: {}}));
}

export function addCard(deck_id, question, answer) {
  const card = {
    id: generateUID(),
    deck_id,
    question,
    answer,
    correctness: null
  }
  return AsyncStorage.setItem(`CARD.${deck_id}.${card.id}`, JSON.stringify(card))
    .then(() => Promise.resolve(getDeck(deck_id)))
    .then(deck => Promise.resolve(
      AsyncStorage.setItem(`DECK.${deck_id}`, JSON.stringify({...deck, ...{card_ids: [...deck.cards, card.id]}}))
    ))
    .then(() => card);
}

export function deleteDeckCards(deck_id, card_ids) {
  return Promise.all(card_ids.map(card_id => AsyncStorage.removeItem(`CARD.${deck_id}.${card.id}`)))
    .then(() => Promise.resolve(getDeck(deck_id)))
    .then(deck => ({...deck, ...{cards: filteredObject(deck.cards, (card) => card_ids.includes(card.id))}}))
    .then(deck => AsyncStorage.setItem(`DECK.${deck.id}`, JSON.stringify(deck)));
}

export function evaluateCard(deck_id, card_id, correctness) {
  return AsyncStorage.getItem(`CARD.${deck_id}.${card_id}`)
    .then(cardString => JSON.parse(cardString))
    .then(card => Object.assign({}, card, {correctness}))
    .then(card => Promise.resolve(
      AsyncStorage.setItem(`CARD.${deck_id}.${card.id}`, JSON.stringify(card)).then(() => card)
    ));
}

export function deleteDeck(deck_id) {
  return getDeck(deck_id)
    .then(deck => Promise.resolve(deleteDeckCards(deck.id, Object.keys(deck.cards))))
    .then(() => Promise.resolve(AsyncStorage.removeItem(`DECK.${deck_id}`)));
}

export function resetDeck(deck) {
  const cards = {}
  for (card_id of Object.keys(deck.cards)) {
    cards[card_id] = Object.assign({}, deck.cards[card_id], {correctness: null})
  }
  const new_deck = Object.assign({}, deck, {cards})
  return Promise.all(Object.values(new_deck.cards).map(card => evaluateCard(card.deck_id, card.id, null)))
    .then(() => new_deck);
}
