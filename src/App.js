import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, HashRouter } from 'react-router-dom';
import Header from './common/header';
import Home from './pages/home';
import Detail from './pages/detail';
import Login from './pages/login';
import Write from './pages/write';
import Register from './pages/register';
import UserCenter from './pages/userCenter';
import Discover from './pages/discover';
import MessagePoint from './pages/messagePoint';
import Exchange from './pages/exchange';
import store from './store';

class App extends Component {
  render() {
    return (
    	<Provider store={store}>
      	<BrowserRouter>
      		<div>
            <Header />
      			<Route path='/' exact component={Home}></Route>
            <Route path='/home' exact component={Home}></Route>
            <Route path='/login' exact component={Login}></Route>
            <Route path='/write' exact component={Write}></Route>
      			<Route path='/detail/:id' exact component={Detail}></Route>
            <Route path='/register' exact component={Register}></Route>
            <Route path='/userCenter' exact component={UserCenter}></Route>
            <Route path='/discover' exact component={Discover}></Route>
            <Route path='/messagePoint' exact component={MessagePoint}></Route>
            <Route path='/exchange/:toUserId/:userName' exact component={Exchange}></Route>
      		</div>
      	</BrowserRouter>
      </Provider>
    );
  }
}

export default App;
