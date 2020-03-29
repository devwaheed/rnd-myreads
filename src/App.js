import React from 'react'
import {Route, Switch} from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import './App.css'
import { Search } from './components/Search'
import { Home } from './components/Home'
import { getBooks, addOrUpdateBook } from './common'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount(){
    this.getAllBooks();
  }

  getAllBooks = () =>{
    BooksAPI.getAll().then(books => {
      this.setState({books: books});
    })
  }

  updateShelve = (shelve, book) =>{
    book.shelf = shelve;
    addOrUpdateBook(book);
    BooksAPI.update(book, shelve)
      .then(r => {
        this.getAllBooks();
      })
      .catch(e => console.log(e));
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
