const express = require('express');
const User = require('../models/User')
const auth = require('../middleware/auth') 

const router = express.Router()

router.post('/users', function(req, res){
    // Create a new user
    try {
        const user = new User(req.body)
        var promise= user.save()
        const token = user.generateAuthToken()
        //res.status(201).send({ user, token })
     
        promise.then((user) => {
            console.log('User saved',user)
            res.redirect("/home");
          
             })
      
    } 
  
    
    catch (error) {
        res.status(400).send(error)
    }
   
})

router.post('/users/login', async(req, res) =>{
    //Login a registered user
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if(user){
            res.redirect("/home")
        }
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }

})

router.get('/users/me', auth, async(req, res) => {
  // View logged in user profile
  //res.send(req.user)
  user=req.user
  res.render('profile', { user });

})

router.post('/users/me/logout', auth, function(req, res) {
  // Log user out of the application
  try {
      req.user.tokens = req.user.tokens.filter((token) => {
          return token.token != req.token
      })
      req.user.save()
      res.send()
      
  } catch (error) {
      res.status(500).send(error)
  }
})

router.post('/users/me/logoutall', auth, async(req, res) => {
  // Log user out of all devices
  try {
      req.user.tokens.splice(0, req.user.tokens.length)
      await req.user.save()
      res.send()
      
  } catch (error) {
      res.status(500).send(error)
  }
})

module.exports = router