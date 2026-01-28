const express=require('express');
const router=express.Router();
const users=require('../data/users.json');
const { getAllUsers, getSingleUserById, createUser, updateUserById, getSubscriptionDetails, deleteUserById } = require('../Controller/user-controller');
/**
 * Route:/users
 * Method:GET
 * Description:get all the list of all user in the system
 * Access:public
 * Parameters:none
 */
// router.get('/',(req,res)=>{
//     res.status(200).json({
//         success:true,
//         data:users
//     })
// });
router.get('/',getAllUsers);

/**
 * Route:/users/:id
 * Method:GET
 * Description:get a  user by id
 * Access:public
 * Parameters:id
 */
// router.get('/:id',(req,res)=>{
//     const {id}=req.params;
//     const user=users.find((each)=>each.id===Number(id))
//     if(!user){
//         return res.status(404).json({
//             success:false,
//             message:`user ${id} not found `
//         })
//     }
//     res.status(200).json({
//         success:true,
//         data:user
//     })
// });
router.get('/:id',getSingleUserById);

/**
 * Route:/users
 * Method:POST
 * Description:create/register a new user
 * Access:public
 * Parameters:none
 */
// router.post('/',(req,res)=>{
//     const{id ,name,username,email,subscriptionType,subscriptionDate}=req.body;
//     if(!id || !name || !username || !email || !subscriptionType || !subscriptionDate){
//         return res.status(400).json({
//             success:false,
//             message:"please provide all required fields"
//         })
//     }
//     const user =users.find((each)=>each.id===Number(id));
//     if(user){
//         return res.status(400).json({
//             success:false,
//             message:`user ${id} already exists`
//         })
//     }
//     users.push({id ,name,username,email,subscriptionType,subscriptionDate});
//     res.status(201).json({
//         success:true,
//         message:"user created successfully"
//     })
// });
router.post('/',createUser);


/**
 * Route:/users/:id
 * Method:PUT
 * Description:updating a user by their id
 * Access:public
 * Parameters:ID
 */
// router.put('/:id',(req,res)=>{
//     const{id}=req.params;
//     const {data}=req.body;

//     //check if user exists
//     const user=users.find((each)=>each.id===Number(id));
//     if(!user){
//         return res.status(404).json({
//             success:false,
//             message:`user ${id} not found`
//         })
//     }
//     const updateUser=users.map((each)=>{
//         if(each.id===Number(id)){
//             return{
//                 ...each,
//                 ...data,
//             }
//         }else{
//             return each
//         }
//     })
//     res.status(200).json({
//         success:true,
//         message:`user ${id} updated successfully`,
//         data:updateUser
//     })
// });
router.put('/:id',updateUserById);

/**
 * Route:/users/id
 * Method:Delete
 * Description:deleting a user by their id
 * Access:public
 * Parameters:id
 */
// router.delete('/:id',(req,res)=>{
//     const{id}=req.params;
//     //check if user exists
//     const user=users.find((each)=>each.id===Number(id));
//     if(!user){  
//         return res.status(404).json({
//             success:false,
//             message:`user ${id} not found`
//         })
//     }
//     const deleteUser=users.filter((each)=>each.id!==Number(id));
//     res.status(200).json({
//         success:true,
//         message:`user ${id} deleted successfully`,
//         data:deleteUser
//     })
// });
router.delete('/:id',deleteUserById);

 /**
  * Route:/users/subscription/:id   
  * Method:GET
  * Description:get subscription details of a user by their id
  * Access:public       
  * Parameters:id
  */
//  router.get('/subscription/:id',(req,res)=>{
//     const{id}=req.params;
//     const user=users.find((each)=>each.id===Number(id));
//     if(!user){
//         return res.status(404).json({
//             success:false,
//             message:`user ${id} not found `
//         })
//     }
//     const getDateInDays=(data='')=>{
//         let date;
//         if(data){
//             date=new Date(data);
//         }else{
//             date=new Date();
//         }
//         let days= Math.floor(date/(1000*60*60*24));
//         return days;
//     }

//     const subscriptionType=(date)=>{
//         if(user.subscriptionType==='Basic'){
//             date=date+90;
//     }else if(user.subscriptionType==='Standard'){
//         date=date+180;
//     }   else if(user.subscriptionType==='Premium'){
//             date=date+365;
//         }
//         return date;
//     }

//    //subscription expiration date in days
//    //january 1,1970 UTC//milliseconds

//    let returnDate=getDateInDays(user.returnDate);
//    let currentDate=getDateInDays();
//     let subscriptionDate=getDateInDays(user.subscriptionDate);
//     let subscriptionExpiration=subscriptionType(subscriptionDate);
//     const data={
//         ...user,
//         subscriptionExpired:currentDate>subscriptionExpiration,
//         daysLeftForExpiration:subscriptionExpiration-currentDate,
//         daysLeftForExpiration:returnDate-currentDate,
//         returnDate:returnDate<currentDate? 'book return date has passed': returnDate,
//         fine:returnDate<currentDate?subscriptionExpiration<=currentDate?200:100:0
//     }
//     res.status(200).json({
//         success:true,
//         data
//     });

// });
router.get('/subscription/:id',getSubscriptionDetails);

module.exports=router;