function findAccountById(accounts, id) {
  
  let found = null;
   
  for (let i = 0; i< accounts.length;i++) {
    const account = accounts[i];
    if (account.id === id) found = account;
  }
  return(found);
}
  
//test passed
function sortAccountsByLastName(accounts) {
  
  accounts.sort((accountA, accountB) => (accountA.name.last > accountB.name.last ? 1 : -1));
  return(accounts);
}

//Test Passed
function getTotalNumberOfBorrows(account, books){
  let total = 0;
  
  for (let i = 0; i < books.length;i++) {
     
    for (let j = 0; j < books[i].borrows.length; j++) {
     
      if(account.id === books[i].borrows[j].id) {
        total++
      }
    }
  } 
  return total;
}
 
 
//STATUS was able to get expected book and author and return one object, think test is failing because properties not in expected spot?
function getBooksPossessedByAccount(account, books, authors) {
  
 let checkedBooks = {};
 let checkedAuthors = {};
 let bookAuthor = {};
 let finalResult = [];

  //if currently checked out by given account
  for(let i= 0; i< books.length;i++){
    if(books[i].borrows[0].returned === false && books[i].borrows[0].id === account.id) {
      
      for (j = 0; j < authors.length; j++) {
       if (authors[j].id === books[i].authorId) {
        
        let checkedBooks = books[i]
        let checkedAuthors = authors[i]
        
            const finalObj = {
              id: checkedBooks.id,
              title:checkedBooks.title,
              genre:checkedBooks.genre,
              authorId:checkedBooks.authorId,
              author: {
                id:checkedAuthors.id,
                name: {
                  first: checkedAuthors.name.first,
                  last: checkedAuthors.name.last,
                }
              },
              borrows: [
                {
                  id: checkedBooks.borrows.id,
                  returned: checkedBooks.borrows.returned,
                },
              ]
            }
            finalResult.push(finalObj);
       }      
      }
    }
    
    }
    return(finalResult);
  } 
  


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
