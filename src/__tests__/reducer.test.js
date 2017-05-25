//import {mount} from 'enzyme';
import reducer from '../reducer'
import {newGame, makeGuess, toggleInfoModal} from '../actions'

describe('REDUCER TESTING', ()=>{
  it('Testing default state...',()=>{
    const state = reducer(undefined, "Um...");
    expect(state.guesses).toEqual([]);
    expect(state.feedback).toEqual('Make your guess!');
    expect(typeof state.correctAnswer).toEqual('number');
  });

  it('Testing the New Game Action',()=>{
    let state = reducer(undefined,"whaa...")
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
    let state = reducer(undefined,"who...")
    const c = state.correctAnswer;
    state = reducer(state,makeGuess(5))
    expect(state.guesses.length).toEqual(1);
    state = reducer(state,makeGuess(c));
    expect(state.guesses.length).toEqual(2);
    expect(state.feedback).toEqual('You got it!');
  });

  it('Testing the Toggle Infomodal Action...',()=>{
    let state = reducer(undefined,"where am I?...");
    expect(state.showInfoModal).toEqual(false);
    state = reducer(state,toggleInfoModal());
    expect(state.showInfoModal).toEqual(true);
  });

})
