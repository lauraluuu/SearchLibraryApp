import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { MyClassComponent } from './components/MyComponents/MyClassComponent';
import MyFunctionalComponent from './components/MyComponents/MyFunctionalComponent';
import LibraryComponent from './components/MyComponents/LibraryComponent';
import './custom.css'


export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
                <Route path='/fetch-data' component={FetchData} />
                <Route path='/myClassComponent' component={MyClassComponent} />
                <Route path='/myFunctionalComponent' component={MyFunctionalComponent} />
                <Route path='/LibraryComponent' component={LibraryComponent} />
            </Layout>
        );
    }
}
