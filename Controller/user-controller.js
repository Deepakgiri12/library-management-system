const {UserModel,BookModel}=require('../Models')

// router.get('/',(req,res)=>{
//     res.status(200).json({
//         success:true,
//         data:users
//     })
// });
exports.getAllUsers=async (req,res)=>{
    const users=await UserModel.find();
    if(!users){
        return res.status(404).json({
            success:false,
            message:"no users found"
        })
    }
    res.status(200).json({
        success:true,
        data:users
    });
}

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
exports.getSingleUserById=async(req,res)=>{
    const {id}=req.params;
    const user=await UserModel.find(
        {_id:id}
    )
    if(!user){
        return res.status(404).json({
            success:false,
            message:`user ${id} not found`
        })
    }
    res.status(200).json({
        success:true,
        data:user
    });
}

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
exports.createUser=async(req,res)=>{
    const{data}=req.body;
    if(!data){
        return res.status(400).json({
            success:false,
            message:"please provide all required fields"
        })
    }
    //check if user already exists
    const user=await UserModel.findOne(
        {_id:data.id}
    );
    if(user){
        return res.status(400).json({
            success:false,
            message:`user ${data.id} already exists`
        })
    }
    await UserModel.create(data);
    res.status(201).json({
        success:true,
        message:"user created successfully"
    });
}

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
exports.updateUserById=async(req,res)=>{
    const{id}=req.params;
    const {data}=req.body;
    //check if user exists
    const user=await UserModel.findOne(
        {_id:id}
    );
    if(!user){
        return res.status(404).json({
            success:false,
            message:`user ${id} not found`
        })
    }
    await UserModel.updateOne(
        {id:id},
        {$set:data}
    );
    return res.status(200).json({
        success:true,
        message:`user ${id} updated successfully`
    });
}

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

//router.get('/subscription/:id',(req,res)=>{
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
exports.deleteUserById=async(req,res)=>{
    const{id}=req.params;
    //check if user exists
    const user=await UserModel.findById(id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:`user ${id} not found`
        })
    }
    await UserModel.findByIdAndDelete(id);
    return res.status(200).json({
        success:true,
        message:`user ${id} deleted successfully`
    });
}

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
exports.getSubscriptionDetails = async (req, res) => {
    const { id } = req.params;

    const user = await UserModel.findById(id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: `user ${id} not found`
        });
    }

    const getDateInDays = (data = '') => {
        const date = data ? new Date(data) : new Date();
        return Math.floor(date / (1000 * 60 * 60 * 24));
    };

    const subscriptionType = (date) => {
        if (user.subscriptionType === 'Basic') return date + 90;
        if (user.subscriptionType === 'Standard') return date + 180;
        if (user.subscriptionType === 'Premium') return date + 365;
        return date;
    };

    const returnDate = getDateInDays(user.returnDate);
    const currentDate = getDateInDays();
    const subscriptionDate = getDateInDays(user.subscriptionDate);
    const subscriptionExpiration = subscriptionType(subscriptionDate);

    let fine = 0;
    if (returnDate < currentDate) {
        fine = subscriptionExpiration <= currentDate ? 200 : 100;
    }

    const data = {
        ...user._doc,
        subscriptionExpired: currentDate > subscriptionExpiration,
        daysLeftForSubscription: subscriptionExpiration - currentDate,
        daysLeftForReturn: returnDate - currentDate,
        isReturnDatePassed: returnDate < currentDate,
        fine
    };

    return res.status(200).json({
        success: true,
        data
    });
};
