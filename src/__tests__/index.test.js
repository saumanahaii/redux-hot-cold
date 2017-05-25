import {mount} from 'enzyme';
import React from 'react';
import reducer from '../reducer';
import 'react-dom';
import 'enzyme';
import {Provider} from 'react-redux';
import Game from '../components/game';
import {newGame, makeGuess, toggleInfoModal} from '../actions';
import store from '../store';

describe('TESTING', ()=>{
  describe('Reducer Tests', ()=>{
    it('Testing default state...',()=>{
      const state = reducer(undefined, 'Um...');
      expect(state.guesses).toEqual([]);
      expect(state.feedback).toEqual('Make your guess!');
      expect(typeof state.correctAnswer).toEqual('number');
    });

    it('Testing the New Game Action',()=>{
      let state = reducer(undefined,'whaa...');
      const c1= state.correctAnswer;
      state = reducer(state,newGame());
      const c2= state.correctAnswer;
      expect(c1===c2).toEqual(false);
      state = reducer(state,makeGuess(5));
      expect(state.guesses.length).toEqual(1);
      state = reducer(state,newGame());
      expect(state.guesses.length).toEqual(0);
    });

    it('Testing the Make Guess Action',()=>{
      let state = reducer(undefined,'who...');
      const c = state.correctAnswer;
      state = reducer(state,makeGuess(5));
      expect(state.guesses.length).toEqual(1);
      state = reducer(state,makeGuess(c));
      expect(state.guesses.length).toEqual(2);
      expect(state.feedback).toEqual('You got it!');
    });

    it('Testing the Toggle Infomodal Action...',()=>{
      let state = reducer(undefined,'where am I?...');
      expect(state.showInfoModal).toEqual(false);
      state = reducer(state,toggleInfoModal());
      expect(state.showInfoModal).toEqual(true);
    });
  });

  describe('Action tests', ()=>{
    const wrapper = mount(
    <Provider store={store}>
      <Game />
    </Provider>);
    let props = wrapper.props();
    let dispatch = props.store.dispatch;
    let currentState = props.store.getState;

    it('Testing the Make Guess Action', () => {
      dispatch(newGame());
      expect(currentState().guesses.length).toEqual(0);
      dispatch(makeGuess(5));
      expect(currentState().guesses[0]).toEqual(5);
      let answer = currentState().correctAnswer;
      dispatch(makeGuess(answer-10));
      expect(currentState().feedback).toEqual('You\'re Warm');


      function generateExpectedFeedback(guess){
        let dif = Math.abs(guess - currentState().correctAnswer);
        let feedback = dif === 0 ? 'You got it!' : dif < 10 ? 'You\'re Hot!' : dif < 30 ? 'You\'re Warm' : dif < 50 ? 'You\'re Cold...' : 'You\'re Ice Cold...';
        return feedback;
      }
      function testGuess(num){
        for (let i=0; i< num; i++){
          let guess = Math.floor(Math.random()*100);
          dispatch(makeGuess(guess));
          expect(currentState().feedback).toEqual(generateExpectedFeedback(guess));
        }
      }
      testGuess(10);

    });

    it('Testing the New Game Action', () =>{
      dispatch(newGame());
      expect(currentState().guesses.length).toEqual(0);
      dispatch(makeGuess(5));
      dispatch(makeGuess(10));
      expect(currentState().guesses.length).toEqual(2);
      dispatch(newGame());
      expect(currentState().guesses.length).toEqual(0);

    });
    it('Testing the Toggle Info Modal Action', ()=>{
      dispatch(newGame());
      expect(currentState().showInfoModal).toEqual(false);
      dispatch(toggleInfoModal());
      expect(currentState().showInfoModal).toEqual(true);
      dispatch(toggleInfoModal());
      expect(currentState().showInfoModal).toEqual(false);
    });
  });


});


