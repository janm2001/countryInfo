const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt')

//user data that will go to db
const userSchema = mongoose.Schema({
   
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    }

},{timestamps:true});

//register static

userSchema.statics.signup = async function(email,password){

    //validation
    if(!email || !password){
        throw Error('All fields must be filled');
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid');
    }

    if(!validator.isStrongPassword(password)){
        throw Error("Password is not strong enough!");
    }

    const exists = await this.findOne({email})

    if(exists){
        throw Error('Email already in use');
    }

    //securing the password (if the db is leaked)
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    const user = await this.create({email,password: hash})

    return user


}

//login static
userSchema.statics.login = async function(email,password){
    //validation
    if(!email || !password){
        throw Error('All fields must be filled');
    }

    const user = await this.findOne({email})

    if(!user){
        throw Error('Incorrect email');
    }
    //checking if the crypted password is the same with normal password
    const match = await bcrypt.compare(password,user.password);

    if(!match){
        throw Error('Incorrect password');
    }

    return user;

}


const User = mongoose.model("User",userSchema);

module.exports = User;