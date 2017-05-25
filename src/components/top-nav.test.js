import React from 'react';
import {shallow} from 'enzyme';
import {Provider} from 'react-redux';
import TopNav from './top-nav.js';
import store from '../store';



describe('<TopNav />', () => {
  it('Displays without dying', () => {
    shallow(<Provider store={store}><TopNav /></Provider>);
  })
})
