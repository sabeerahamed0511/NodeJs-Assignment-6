const router = require('express').Router();
const Blog = require('../models/Blog')

// Your routing code goes here

//GET ALL 
router.get("/blog/all",async (req,res)=>{
    try {
        // const blogRes = await Blog.find();
        // res.send(blogRes);
        res.json({name : "hello"})
    } catch(err) {
        res.status(500).json({message : err.message});
    }
    
})

//GET WITH PAGINATION 
router.get("/blog",async (req,res)=>{
    try {
        const blogRes = await Blog.find({ topic : new RegExp(req.query.search, "i")});
        let page = req.query.page;//
        if(blogRes.length) {
            let pagination = blogRes.slice((page-1)*5, page*5);
            if(pagination.length) {           
                res.json(pagination);
            } else {
                res.json({message : "No search result found"});
            }
        } else {
            res.json({message : "No search result found"});
        }
    } catch(err) {
        res.status(500).json({message : err.message});
    }
    
})

//POST 
router.post("/blog",async (req,res)=>{
    try {
        console.log(req.body)
        const blog = await new Blog(req.body);
        const blogRes = await blog.save();
        res.json(blogRes);
    } catch(err) {
        res.status(401).json({ message : err.message});
    }
    
})

//UPDATE
router.put("/blog/:id", async (req,res)=>{
    try {
        const isValid = await Blog.findById(req.params.id);
        if(isValid) {
            const currBlog = await Blog.findByIdAndUpdate(req.params.id, req.body,  {new : true});
            const resBlog = await currBlog.save();
            res.json(resBlog)
        } else {
            res.json({message : "Invalid ID"})
        }
    } catch(err) {
        res.status(401).json({ message : err.message});
    }
    
})

//DELETE ONE 
router.delete("/blog/:id", async (req,res)=>{
    try {
        const isValid = await Blog.findById(req.params.id);
        if(isValid) {
            await Blog.findByIdAndDelete(req.params.id);
            res.json(isValid)
        } else {
            res.json({message : "Invalid ID"})
        }
        
    } catch(err) {
        res.status(401).json({ message : err.message});
    }
    
})

//DELETE ALL 
router.delete("/blog", async (req,res)=>{
    try {
        await Blog.deleteMany();
        res.json({message : "Deleted all files.."})
    } catch(err) {
        res.status(401).json({ message : err.message});
    }
    
})



module.exports = router;