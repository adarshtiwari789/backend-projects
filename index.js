const path = require('path')
const express = require('express')
const app = express()
const fs = require('fs')
const { log } = require('console')
const { ok } = require('assert')

app.set("view engine" , "ejs")
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use (express.static(path.join(__dirname , "public")))

app.get("/" , function(req, res){
    fs.readdir(`./files` , function(err, files){
        res.render("index" , {files : files})
    })
})

app.get("/files/:filename" , function(req, res){
    fs.readFile(`./files/${req.params.filename}` ,"utf-8" ,function(err, filedata){
        res.render('show', {filename : req.params.filename, data : filedata}  )
    })
})

app.get("/delet/:ok" , function(req, res){
  fs.unlink(`./files/${req.params.ok}`,(err)=>{
    res.redirect('/')
  })
})

app.post("/create" , function(req, res){
  fs.writeFile(`./files/ ${req.body.topic.split(" ").join("")}.txt`, req.body.detail , (err)=>{
    res.redirect('/')
  })

})
app.listen(3000)