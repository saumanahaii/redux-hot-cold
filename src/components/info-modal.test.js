import React from 'react';
import {shallow} from 'enzyme';
import store from '../store';
import {Provider} from 'react-redux';
import InfoModal from './info-modal.js';



describe('<InfoModal />', () => {
  it('Displays without dying', () => {
    shallow(<Provider store={store}><InfoModal /></Provider>);
  })
})
