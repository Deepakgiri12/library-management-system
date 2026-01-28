const {BookModel,UserModel}=require('../Models')
const IssuedBook=require('../dtos/book-dto');

// const getAllBooks=()=>{

// }
// const getSingleBookById=()=>{

// }

// module.exports={
//     getAllBooks,
//     getSingleBookById
// }


// router.get('/',(req,res)=>{
//     res.status(200).json({
//         success:true,
//         data:books
//     })
// });
exports.getAllBooks=async (req,res)=>{
    const books=await BookModel.find();

    if(books.length===0){
        return res.status(404).json({
            success:false,
            message:"No books found"
        })
    }
    return res.status(200).json({
        success:true,
        data:books
    })
}

// router.get('/:id',(req,res)=>{
//     const {id}=req.params;
//     const book=books.find((each)=>each.id===Number(id))
//     if(!book){
//         return res.status(404).json({
//             success:false,
//             message:`book ${id} not found `
//         })
//     }
//     res.status(200).json({
//         success:true,
//         data:book
//     })
// });
exports.getSingleBookById=async (req,res)=>{
    const {id}=req.params;
    const book=await BookModel.findById(id);
    if(!book){
        return res.status(404).json({
            success:false,
            message:`book ${id} not found `
        })
    }
    return res.status(200).json({
        success:true,
        data:book
    })
}

// router.get('/issued/for-users',(req,res)=>{
// const usersWithIssuedBooks=users.filter((user)=>{
//     if(user.issuedBook){
//         return user;
//     }
// });
//     const issuedBooks=[];
//    usersWithIssuedBooks.forEach((each)=>{
//     const book=books.find((book)=>book.id===Number(each.issuedBook));
//     if (!book) return;

//     book.issuedBy=each.name;
//     book.issuedDate=each.issuedDate;
//     book.returnDate=each.returnDate;

//     issuedBooks.push(book)
//    })
   
//    if(!issuedBooks===0){
//     return res.status(404).json({
//         success:false,
//         message:"no book issued"
//     })
//    }
// res.status(200).json({
//     success:true,
//     data:issuedBooks
// })
//  });
exports.getAllIssuedBooks=async(req,res)=>{
    const users=await UserModel.find({
        issuedBook:{$exists:true}
    }).populate('issuedBook');

    const issuedBooks=users.map((each)=>{
        return new IssuedBook(each);
    })
    if(issuedBooks.length===0){
        return res.status(404).json({
            success:false,
            message:"no book issued"
        })
    }

    return res.status(200).json({
        success:true,
        data:issuedBooks
    });
};

// router.post('/',(req,res)=>{
//     const{id ,name,author,genre,price,publisher }=req.body;
//     if(!id || !name || !author || !genre || !price || !publisher){
//         return res.status(400).json({
//             success:false,
//             message:"please provide all required fields"
//         })
//     }
//     const book =books.find((each)=>each.id===Number(id));
//     if(book){
//         return res.status(400).json({
//             success:false,
//             message:`book ${id} already exists`
//         })
//     }
//     books.push({id ,name,author,genre,price,publisher});
//     res.status(201).json({
//         success:true,
//         message:"book created successfully"
//     })
// });
exports.addNewBook=async (req,res)=>{
    const {data}=req.body;
    if(!data || Object.keys(data).length===0){
        return res.status(400).json({
            success:false,
            message:"please provide all required fields"
        })
    }

    await BookModel.create(data);

    return res.status(201).json({
        success:true,
        message:"book created successfully",
        data:data
    })

}

// router.put('/:id',(req,res)=>{
//     const {id}=req.params;
//     const {data}=req.body;

//     const book=books.find((each)=>each.id===Number(id));
//     if(!book){
//         return res.status(404).json({
//             success:false,
//             message:`book ${id} not found`
//         })
//     }
//     const updateBook=books.map((each)=>{
//         if(each.id===Number(id)){
//             return{...each,...data};
//         }
//         return each;
//     });
//     res.status(200).json({
//         success:true,
//         message:"book updated successfully",
//         data:updateBook
//     })
// });
exports.updateBookById=async (req,res)=>{
    // const {id}=req.params;
    // const {data}=req.body;
    // if(!data || Object.keys(data).length===0){
    //     return res.status(400).json({
    //         success:false,
    //         message:"please provide data to update"
    //     })
    // }
    // //check if book exists
    // const book=await BookModel.findById(id);
    // if(!book){
    //     return res.status(404).json({
    //         success:false,
    //         message:`book ${id} not found`
    //     })
    // }

    // //update the book
    // Object.assign(book,data);
    // await book.save();
    // return res.status(200).json({
    //     success:true,
    //     message:"book updated successfully",
    //     data:book
    // });

    const updatedBook=await BookModel.findByIdAndUpdate(
        {_id:req.params.id},
        req.body.data,
        {new:true}
    );
    if(!updatedBook){
        return res.status(404).json({
            success:false,
            message:`book ${req.params.id} not found`
        })
    }
    return res.status(200).json({
        success:true,
        message:"book updated successfully",
        data:updatedBook
    });
}

// router.delete('/:id',(req,res)=>{
//     const{id}=req.params;
//     //check if book exists
//     const book=books.find((each)=>each.id===Number(id));
//     if(!book){
//         return res.status(404).json({
//             success:false,
//             message:`book ${id} not found`
//         })
//     }
//     const updateBooks=books.filter((each)=>each.id!==Number(id));
//     res.status(200).json({
//         success:true,
//         message:`book ${id} deleted successfully`,
//         data:updateBooks
//     })      
//  });
exports.deleteBookById=async (req,res)=>{
    const {id}=req.params;
    //check if book exists
    const book=await BookModel.findById(id);
    if(!book){
        return res.status(404).json({
            success:false,
            message:`book ${id} not found`
        })
    }
    await BookModel.findByIdAndDelete(id);
    return res.status(200).json({
        success:true,
        message:`book ${id} deleted successfully`
    });
}




