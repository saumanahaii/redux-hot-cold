import React from 'react';
import {Provider} from 'react-redux';
import {shallow, mount} from 'enzyme';
import store from '../store';
import GuessForm from './guess-form.js';
import {newGame} from '../actions';



describe('<GuessForm />', () => {
  it('Displays without dying', () => {
    shallow(<Provider store={store}><GuessForm /></Provider>);
  });
  it('Should fire the callback on submit', () => {
    const val = 9;
    // const callback = jest.fn();
    const wrapper = mount(<Provider store={store}><GuessForm /></Provider>);
    wrapper.find('input[type="text"]').node.value = val;
    let props = wrapper.props();
    props.store.dispatch(newGame());
    wrapper.simulate('submit');

    expect(props.store.getState().guesses[0]).toEqual(val.toString());
  });
});
