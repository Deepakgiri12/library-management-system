const express=require('express');
const router=express.Router();
const books=require('../data/books.json');
const users=require('../data/users.json');

/**
 * Route:/books
 * Method:GET
 * Description:get all the list of all books in the system
 * Access:public
 * Parameters:none
 */
router.get('/',(req,res)=>{
    res.status(200).json({
        success:true,
        data:books
    })
});

/**
 * Route:/books/:id
 * Method:GET
 * Description:get a  book by id
 * Access:public
 * Parameters:id
 */
router.get('/:id',(req,res)=>{
    const {id}=req.params;
    const book=books.find((each)=>each.id===Number(id))
    if(!book){
        return res.status(404).json({
            success:false,
            message:`book ${id} not found `
        })
    }
    res.status(200).json({
        success:true,
        data:book
    })
});


/**
 * Route:/books
 * Method:POST
 * Description:create/register a new book
 * Access:public
 * Parameters:none
 */
router.post('/',(req,res)=>{
    const{id ,name,author,genre,price,publisher }=req.body;
    if(!id || !name || !author || !genre || !price || !publisher){
        return res.status(400).json({
            success:false,
            message:"please provide all required fields"
        })
    }
    const book =books.find((each)=>each.id===Number(id));
    if(book){
        return res.status(400).json({
            success:false,
            message:`book ${id} already exists`
        })
    }
    books.push({id ,name,author,genre,price,publisher});
    res.status(201).json({
        success:true,
        message:"book created successfully"
    })
});

/**
 * Route:/books/:id
 * Method:PUT
 * Description:update a book by id
 * Access:public
 * Parameters:id
 */
router.put('/:id',(req,res)=>{
    const {id}=req.params;
    const {data}=req.body;

    const book=books.find((each)=>each.id===Number(id));
    if(!book){
        return res.status(404).json({
            success:false,
            message:`book ${id} not found`
        })
    }
    const updateBook=books.map((each)=>{
        if(each.id===Number(id)){
            return{...each,...data};
        }
        return each;
    });
    res.status(200).json({
        success:true,
        message:"book updated successfully",
        data:updateBook
    })
});

/**
 * Route:/books/:id
 * Method:DELETE
 * Description:deleting a book by their id
 * Access:public
 * Parameters:ID
 */
router.delete('/:id',(req,res)=>{
    const{id}=req.params;
    //check if book exists
    const book=books.find((each)=>each.id===Number(id));
    if(!book){
        return res.status(404).json({
            success:false,
            message:`book ${id} not found`
        })
    }
    const updateBooks=books.filter((each)=>each.id!==Number(id));
    res.status(200).json({
        success:true,
        message:`book ${id} deleted successfully`,
        data:updateBooks
    })      
 });


 /**
  * Route:/books/issued/for-users
  * Method:GET
  * Description:get all issued books
  * Access:public
  * Parameters:none
  */
 router.get('/issued/for-users',(req,res)=>{
//const issuedBooks=books.filter((each)=>each.issued===true);
const usersWithIssuedBooks=users.filter((user)=>{
    if(user.issuedBook){
        return user;
    }
});
    const issuedBooks=[];
   usersWithIssuedBooks.forEach((each)=>{
    const book=books.find((book)=>book.id===Number(each.issuedBook));
    if (!book) return;

    book.issuedBy=each.name;
    book.issuedDate=each.issuedDate;
    book.returnDate=each.returnDate;

    issuedBooks.push(book)
   })
   
   if(!issuedBooks===0){
    return res.status(404).json({
        success:false,
        message:"no book issued"
    })
   }
res.status(200).json({
    success:true,
    data:issuedBooks
})
 });

module.exports=router;