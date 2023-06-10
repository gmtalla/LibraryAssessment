//single param -an array of book objects
//returns a number that rep the # of book objs inside of the array

const { sort } = require("../../test/fixtures/authors.fixture")

//test passed
const getTotalBooksCount = (books) => {
  return books.length
}

//single param - an array of accounts
//returns # that rep # of account objects inside of the array
//function getTotalAccountsCount(accounts) {}
const getTotalAccountsCount = (accounts) => {
  return accounts.length
}

//single param - array of books
//returns # rep # of books currently checked out - # can be found by looking at the 1st tran obj in the borrows array of each book
//if the tran says the book has not been returned (returned: false) book is currently being borrowed
function getBooksBorrowedCount(books) {
  let result = 0
  for (let i = 0; i < books.length; i++) {
    //const book = books[i];
    if (books[i].borrows[0].returned === false) {
      result++
    }
  }
  return result
  //console.log(books[0].borrows[1].returned);
}

//helper function!
//single param array of book objects
//returns an array containing five objects or fewer that represents the most common occurring genres, ordered from most common to least.
//Each object in the returned array has two keys:
//The `name` key which represents the name of the genre.
//The `count` key which represents the number of times the genre occurs.
function getMostCommonGenres(books) {
 
  //creating tally with reduce
  const totals = getBookTotals(books)

  const names = Object.keys(totals)
  const counts = Object.values(totals)
  
  let genreObjs = names.map(name => {
    return {name,count:totals[name]}
  }) 
 
  genreObjs.sort((genreA, genreB) => (genreA.count < genreB.count ? 1 : -1))

  return genreObjs.slice(0, 5);
}

function getBookTotals(books) {
  return books.reduce((tally, book) => {
    tally[book.genre] = (tally[book.genre] || 0) + 1
    return tally
  }, {})
}

//single param array of book objects
//returns an array containing five objects or fewer that represents the most popular books in the library
//Popularity is represented by the number of times a book has been borrowed.
//Each object in the returned array has two keys:
//The `name` key which represents the title of the book.
//The `count` key which represents the number of times the book has been borrowed.
function getMostPopularBooks(books) {
  //this is producing array as required need to sort and return subset
  let result = [{ name, count }]

  for (let i = 0; i < books.length; i++) {
    var name = books[i].title
    var count = books[i].borrows.length
    result.push({ name, count })
  }
  //sort descending
  result.sort((bookA, bookB) => (bookA.count < bookB.count ? 1 : -1))

  return result.slice(0, 5)
}

//params array of book objects, array of author objects
//return array of 5 or fewer objects rep most popular author - find all of the books written by the author then adding up the # of
//times those books have been borrowed
function getMostPopularAuthors(books, authors) {

//create an object to store total borrows per author
const borrowsPerAuthor = [];


//iterate over each author 
authors.forEach((author) => {
  //filter books array to get the books with matching authorID
  const matchingBooks = books.filter((book) => book.authorId === author.id);

  //sum the number of times those books have been borrowed 
  const totalBorrows = matchingBooks.reduce((acc,book) => {
    return acc + book.borrows.length;
  }, 0);
  
  //store the total borrows in the borrowsPerAuthor object
  borrowsPerAuthor[author.id] = totalBorrows;
})

//sort descending 
//borrowsPerAuthor.sort((borrowsA, borrowsB) => (borrowsA.count < borrowsB.count ? 1 : -1))
//NEED TO CHANGE TO AN ARRAY SO ABLE TO SORT
let sortable = []

for ( var authorId in borrowsPerAuthor) {
  sortable.push([authorId,borrowsPerAuthor[authorId]])
}
//NOW sort descending (ascending)
sortable.sort((borrowA, borrowB) => (borrowA[1] < borrowB[1] ? 1 : -1))

//slice sorted list to get top 5 
let topFive = sortable.slice(0,5)

/*const finalResult = topFive.map(author => {
  return author 
})*/

let finalResult = []
//iterate over each author id in topFive array
topFive.forEach((topAuth)=> {
  //find author obj matching the author id in topFive
  const final = authors.find(author => author.id == topAuth[0])
  //push matching author obj to array
  const authorName = `${final.name.first} ${final.name.last}`
  finalResult.push({name:authorName,count:topAuth[1]})
}) 


return(finalResult);


}



module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
}
