import React from 'react';
import {shallow} from 'enzyme';
import store from '../store';
import {Provider} from 'react-redux';
import GuessSection from './guess-section.js';



describe('<GuessSection />', () => {
  it('Displays without dying', () => {
    shallow(<Provider store={store}><GuessSection /></Provider>);
  })
})
