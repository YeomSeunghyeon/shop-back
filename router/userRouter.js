const express=require('express');
const db = require('../lib/db');
var router=express.Router()

router.get('/list',(req,res)=>{

   db.query('select*from user',(err,user)=>{
    res.send(user);
   
   });
});
router.post('/login',(req,res)=>{
   const id= req.body.id
   const pwd=req.body.pwd
   db.query('SELECT * FROM user WHERE id = ? AND password = ?', [id, pwd], (err, results) => {
      if (err) {
          console.error('Database query error: ', err);
          res.status(500).send('Internal Server Error');
          return;
      }

      if (results.length > 0) {
          req.session.user = results[0]; // 세션에 사용자 정보 저장
          res.send({ status: 200, sessionId: req.session.user.id });
      } else {
          res.status(401).send('Invalid credentials');
      }
}) });
router.post("/join",(req,res)=>{
    const id=req.body.id
    const pwd=req.body.pwd
    const name=req.body.name
    const tel=req.body.tel
    const is_admin=req.body.is_admin
    db.query("insert into user values (?,?,?,?,?)",[id,pwd,name,tel,is_admin],(err,results)=>{
        if(err){
            res.status(500).send('Internal Server Error');
            return;
        }
        else if(results){
            res.status(200).send('success');
        }else {
            res.status(401).send('Invalid credentials');
        }
    })
})
router.get("/itemList",(req,res)=>{
const {menu}=req.query
 db.query("select*from item where menu=?",[menu],(err,results)=>{
    if (err) {
        console.error('Database query error: ', err);
        res.status(500).send('Internal Server Error');
        return;
    }

    if (results.length > 0) {
        results = results.map(item => ({
            ...item,
            img: `/public/${item.img}`
        }));
        res.send({ status: 200, results });

    } else {
        res.status(401).send('Invalid credentials');
    }
 })
})
router.get("/item",(req,res)=>{
    const {num}=req.query
    db.query("select*from item where num=?",[num],(err,item)=>{
    res.send(item)

    })
})
router.post("/putBasket",(req,res)=>{
    const user=req.body.user;
    const menu=req.body.menu;
    db.query("insert into basket(user,menu) values (?,?)",[user,menu],(err,results)=>{
        if(err){
            res.status(500).send('Internal Server Error');
            return;
        }
        else if(results){
            res.status(200).send('success');
        }else {
            res.status(401).send('Invalid credentials');
        }
    })
})
router.get("/getBasket",(req,res)=>{
    const {user}=req.query;
    db.query("select*from basket where user=?",[user],(err,basket)=>{
        res.send(basket);
    })
})
module.exports=router;