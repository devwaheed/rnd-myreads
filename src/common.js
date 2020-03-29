

const storageKey = 'rndBooks';
export const isReading = 'currentlyReading';
export const wantToRead = 'wantToRead';
export const read = 'read';


export const addOrUpdateBook = (book) => {
    let books = getBooks().filter(b => b.id !== book.id);
    books = [...books, book];
    localStorage.setItem(storageKey, JSON.stringify(books));
}

export const getBooks = () => {
    const books = localStorage.getItem(storageKey);
    return books !== null ? JSON.parse(books) : [];
}

export const getBookShelve = (books, bookId) => {
    const book = books.find(b => b.id === bookId);
    return book ? book.shelve : null;
}