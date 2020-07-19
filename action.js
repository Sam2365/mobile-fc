import { GET_DECKS, ADD_DECK, ADD_CARD } from './reducer'
import { AsyncStorage } from 'react-native';

const storageKey = 'STORAGE_KEY'

export const getData = () => {
    return async dispatch => {
        let res = await AsyncStorage.getItem(storageKey);
        let data = await JSON.parse(res) || {};
        dispatch(initialData(data))
    }
}
const initialData = (state) => {
    return {
        type: GET_DECKS,
        state
    }
}


export const addDeck = (deck) => {
    return async (dispatch, getState) => {
        const state = getState().cards
        const data = { ...state, [deck]: { title: deck, questions: [] } };
        await AsyncStorage.setItem(storageKey, JSON.stringify(data))
        dispatch(add_deck(deck))
    }
}

const add_deck = (deck) => {
    return {
        type: ADD_DECK,
        deck
    }
}


export const addCard = (deck, card) => {
    return async (dispatch, getState) => {
        const state = getState().cards
        const stateDeck = state[deck]
        const cards = { ...state, [deck]: { ...stateDeck, questions: [...stateDeck['questions'], card] } };
        await AsyncStorage.setItem(storageKey,JSON.stringify(cards));
        dispatch(add_card(deck, card))
    }
}

const add_card = (deck, card) => {
    return {
        type: ADD_CARD,
        deck,
        card
    }
}

export const getScore = (deck, score) => {
    return {
        type: "GET_SCORE",
        deck,
        score
    }
}

export const setScore = (deck, score) => {
    return {
        type: "SET_SCORE",
        deck,
        score
    }
}
