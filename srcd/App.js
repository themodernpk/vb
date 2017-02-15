/**
 * Created by taranjeet.s on 1/6/2017.
 */
import React,{ Component } from 'react';
import { View,Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import reducers from './reducers';
import RouterComponent from './Router';
import ReduxThunk from 'redux-thunk';
import { Header } from './components/common';

class App extends Component{
    componentWillMount() {
    }
    //provider can have only one provider
    render(){

        return (
            <Provider store={createStore(reducers,{},applyMiddleware(ReduxThunk))}>
                <RouterComponent />
            </Provider>
        )
    }
};
export default App;