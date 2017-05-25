import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import store from '../store';
import Header from './header.js';



describe('<Header />', () => {
  it('Displays without dying', () => {
    mount(<Provider store={store}><Header /></Provider>);
  })
})
