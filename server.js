// /////registration form data 
// const express = require('express')
// const cors = require('cors')

// const app = express()
// app.use(express.json())
// app.use(cors())

// const { MongoClient } = require('mongodb')

// const uri = "mongodb+srv://admin:admin@cluster0.aqmkc3t.mongodb.net/?retryWrites=true&w=majority";

// const client = new MongoClient(uri);
// client.connect();

// // // registration form data
// // const db = client.db("s16");
// // const col = db.collection("user");

// var db = client.db("S_16");
// // var db1=client.db("In-Sem");
// var col = db.collection("Registration");
// // var col1=db1.collection("Exam");

// ///registration form data
// app.post('/insert',(request,response) => {
//   response.send(request.body);
//   console.log(request.body)
//   col.insertOne(request.body)
//   console.log("Documents Inserted");

// })
// app.get('/',(request,response) => {
//   response.send('This is a Server')
// })
// app.get('/check', (request,response)=> {

//   async function run () {
//     try {
//       console.log(request.query.un);
//       const result = await col.findOne({email:request.query.un})
//       if (result != null) {
//         console.log(result.email);
//         if (result.password === request.query.pw) {
//           response.send("pass");
//         }
//         else {
//           response.send("fail");
//         }
//       }
//       else {
//         response.send("fail");
//       }
//     }
//     finally {
    
//     }
//   }
//   run().catch(console.dir);
// })

// app.listen(8081)
// //localhost:8081
// console.log("server started")







//////exp5 //////


// run only one at a time




const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const { MongoClient } = require('mongodb')

const uri = "mongodb+srv://admin:admin@cluster0.aqmkc3t.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);
client.connect();
var db = client.db("In-Sem");
var col = db.collection("Exam");

// register into mongoDB
app.post('/insert_stu',(req,res)=>{
  console.log(req.body)
  col.insertOne(req.body)
  res.send(req.body)

})
app.get('/show_one_stu',(req,res)=>{
  async function find(){
    try{
      const result=await col.findOne()
      console.log(result)
      if(result==null)
      {
        res.send({"Data_retrieval":"Fail"})
      }else{
          res.send(result);
        }
      }
      finally{}
    }
    find().catch(console.dir)
  })

  app.get('/show_all',(req,res)=>{
    async function find(){
      try{
        const result=await col.find().toArray()
        console.log(result)
        if(result==null)
        {
          res.send({"Data_retrieval":"Fail"})
        }else{
            res.send(result);
          }
        }
        finally{}
      }
      find().catch(console.dir)
    })

    app.get('/show_all_gt1',(req,res)=>{
      async function find(){
        try{
          const result=await col.find({stu_id:{$gte:1},$or:[{stu_dept:"CSE"},{stu_dept:"ECE"}]}).toArray()
          console.log(result)
          if(result==null)
          {
            res.send({"Data_retrieval":"Fail"})
          }else{
              res.send(result);
            }
          }
          finally{}
        }
        find().catch(console.dir)
      })

      /////exp 8
      app.patch('/update_stu',(req,res)=>{
         const doc={
            $set:{stu_dept:"BT",stu_address:"Vaddeswaram"
            }
         }
         col.updateOne({stu_id:2100032572},doc)
         res.send("Updated Succesfully")
        })
          //inserting document

        app.post('/insert_student',(req,res)=>{
            const doc={stu_name:"Aman",stu_dept:"CSE-H",stu_address:"KLU-Hostel" }
          
         col.insertOne(doc)
         res.send("Inserted Succesfully")
          })
            /// 
          app.delete('/delete_student',(req,res)=>{
            //  const doc={
            //     $set:{stu_dept:"BT",stu_address:"Vaddeswaram"
            //     }
            //  }
             col.deleteOne({stu_id:2100032607})
             res.send("Deleted Succesfully")
            })
app.listen(8082)
console.log("Server Started")
//localhost:8081
