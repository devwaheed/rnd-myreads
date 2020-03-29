import React from 'react';
import {search} from '../BooksAPI';
import { withRouter } from 'react-router-dom';
import { Book } from './Book';
import { getBookShelve } from '../common';

 class SearchPage extends React.Component {
     
    constructor(props){
        super(props);
        this.state = {
            query: '',
            books: []
        }
    }

    handleChange = async event => {
        
        const value = event.target.value;

        this.setState({query: value});
         await this.searchBooks(value);
        
    }

    searchBooks = async (query) => {
        const books = await search(query);
        (Array.isArray(books)) ? this.setState({books: this.addBookShelve(books)}) : this.setState({books: []});
    }

    addBookShelve = (books) => {

        return books.map(b => {
            b.shelf = getBookShelve(this.props.shelveBooks, b.id);
            return b;
        })
    }
    

    render(){
        return (
            <div className="search-books">
                <div className="search-books-bar">
                <button className="close-search" onClick={()=> {this.props.history.replace('/')}}>Close</button>
                <div className="search-books-input-wrapper">
                    {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.handleChange} />

                </div>
                </div>
                <div className="search-books-results">
                <ol className="books-grid">
                    {this.state.books.map(book => (
                        <li key={book.id}>
                         <Book book={book} onShelveChange={this.props.onShelveChange}/>
                      </li>
                    ))}
                </ol>
                </div>
            </div>
        );
    }
}

const Search = withRouter(SearchPage);

export {Search};