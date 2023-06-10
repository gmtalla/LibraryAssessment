//2 parameters in order - array of author objects and an integer of a single author object
//returns author object that has the matching ID
//test passed
function findAuthorById(authors, id) {
  let found = null;
  
  for(let i =0; i<authors.length;i++){
    const author = authors[i];
    if(authors[i].id === id) found = author;
  }
  return(found);
}

//2 params in order array of book objects and string id of single book object, returns book with matching id 
//test passed
function findBookById(books, id) {
  let found = null;
  
  for(let i =0; i<books.length;i++){
    const book = books[i];
    if(books[i].id === id) found = book;
  }
  return(found);
}

//single param array of book objects
//returns an array with two arrays inside of it. All of the inputted books are present in either the first or second array.
//first array contains book objects that represent the books _that are currently checked out
//second array contains book objects that represent the books _that have been returned (1st tran obj in borrows array)
//test passed
function partitionBooksByBorrowedStatus(books) {
  
  let checkedOut = [];
  
  for (i = 0; i < books.length; i++) {
    if (books[i].borrows[0].returned === true) (
    checkedOut.push(books[i]))
  }
  
  let booksReturned = [];
  
  for (i = 0; i < books.length; i++) {
    if (books[i].borrows[0].returned === false) (
    booksReturned.push(books[i]))
  }
  return final = [booksReturned,checkedOut]
}



///2 params, in order - book object and an array of all account objects
//returns an array of ten or fewer acct obj that rep the accts given by the IDs in the provided books 'borrows' array
//each acct obj should include the 'returned' entry from the corresponding transaction obj in the 'borrows' array
function getBorrowersForBook(book, accounts) {

  let combinedAccounts = [];
  //for first 10 book.borrow.id 
    for (let i = 0; i < book.borrows.length && i < 10; i++) {
      //find matching accounts.id .. 
      
     const matchingAcct = accounts.find(account => account.id === book.borrows[i].id);
      matchingAcct.returned = book.borrows[i].returned
      combinedAccounts.push(matchingAcct) 
    }
    //return combinedAccounts;
    return(combinedAccounts);
  }
  



module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
