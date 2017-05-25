import React from 'react';
import {mount, shallow} from 'enzyme';
import store from '../store';
import {Provider} from 'react-redux';
import GuessList from './guess-list.js';
import {makeGuess} from '../actions';



describe('<GuessList />', () => {
    it('Displays without dying', () => {
        shallow(<Provider store={store}><GuessList /></Provider>);
    });
    it('should display list passed in', () =>{
        const testArr = [5, 4, 1, 6, 3];
        const wrapper = mount(<Provider store={store}><GuessList /></Provider>);
        let props = wrapper.props();
        testArr.forEach(testGuess => {
          return props.store.dispatch(makeGuess(testGuess));
        });
        const guess = wrapper.find('li');
        testArr.forEach((val, index) => {
          expect(guess.at(index).text()).toEqual(val.toString());
      });
    });
});
