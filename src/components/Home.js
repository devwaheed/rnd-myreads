import React from 'react';
import { isReading, wantToRead, read } from '../common';
import { Book } from './Book';
import { withRouter } from 'react-router-dom';


 class HomePage extends React.Component{
    
    render(){
        const { books } = this.props;
        console.log(books)
        return (
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            books
                                .filter(book => book.shelf === isReading)
                                .map(b => (
                                    <li key={b.id}>
                                        <Book book={b} onShelveChange={this.props.onShelveChange}/>
                                    </li>)
                                )
                        }
                        
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {
                            books
                                .filter(book => book.shelf === wantToRead)
                                .map(b => (
                                    <li key={b.id}>
                                        <Book book={b} onShelveChange={this.props.onShelveChange}/>
                                    </li>)
                                )
                        }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {
                            books
                                .filter(book => book.shelf === read)
                                .map(b =>(
                                    <li key={b.id}>
                                        <Book book={b} onShelveChange={this.props.onShelveChange}/>
                                    </li>)
                                )
                    }
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
            
              <button onClick={()=> {this.props.history.replace('/search')}}>Add a book</button>
            </div>
          </div>
     
        );
    }

}


const Home = withRouter(HomePage);
export {Home};