import React from 'react'
import {Route, Switch} from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import './App.css'
import { Search } from './components/Search'
import { Home } from './components/Home'
import { getBooks, addOrUpdateBook } from './common'

class BooksApp extends React.Component {
  state = {
    books: getBooks()
  }

  updateShelve = (shelve, book) =>{
    book.shelve = shelve;
    addOrUpdateBook(book);

    this.setState({books: getBooks()})
  }

  render() {

    return (
      <div className="app">
       <Switch>
          <Route path='/' exact >
            <Home onShelveChange={this.updateShelve} books={this.state.books}/>
          </Route>
          <Route path='/search'>
            <Search onShelveChange={this.updateShelve} shelveBooks={this.state.books}/>
          </Route>
       </Switch>
     </div>    
    )
  }
}

export default BooksApp
