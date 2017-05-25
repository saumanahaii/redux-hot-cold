// import React from 'react';
// import {shallow} from 'enzyme';

// import GuessCount from './guess-count.js';



// describe('<GuessCount />', () => {
//     it('Displays without dying', () => {
//         shallow(<GuessCount />);
//     });
//     it('renders the correct count', () => {
//         const count = 5;
//         const wrapper = shallow(<GuessCount count={count} />);

//        
//     });
// });
import React from 'react';
import {Provider} from 'react-redux';
import {shallow, mount} from 'enzyme';
import store from '../store';
import GuessCount from './guess-count.js';
import {newGame, makeGuess} from '../actions';



describe('<GuessCount />', () => {
  it('Displays without dying', () => {
    shallow(<Provider store={store}><GuessCount /></Provider>);
  });
  it('Should fire the callback on submit', () => {
    const wrapper = mount(<Provider store={store}><GuessCount /></Provider>);
    let props = wrapper.props();
    props.store.dispatch(newGame());
    let count = props.store.getState().guesses.length;
    expect(wrapper.text()).toEqual(`Guess #${count}!`);
    count++;
    props.store.dispatch(makeGuess(1));
    expect(wrapper.text()).toEqual(`Guess #${count}!`);

    

    // expect(props.store.getState().guesses[0]).toEqual(val.toString());
  });
});
