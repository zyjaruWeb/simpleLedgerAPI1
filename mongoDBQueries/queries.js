// db.collection.aggregate([
//     {
//       $group: {
//         _id: "$user_id",
//         balance: {
//           $sum: "$amount.numberDecimal"
//         },
//         income: {
//           $sum: {
//             $cond: [
//               {
//                 $gt: [
//                   "$amount.numberDecimal",
//                   0
//                 ]
//               },
//               "$amount.numberDecimal",
//               0
//             ]
//           }
//         }
//       }
//     },
    
//   ])