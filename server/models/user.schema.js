import mongoose from 'mongoose';
const {schema, model} = mongoose;
import AuthRoles from '../utils/authRoles'
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'
import crypto from 'crypto'

const userSchema = schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            maxLenght: [45, "Name must be less than 45"],
            trim : true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minLength: [8, "Password must be at least 8 characters"],
            select: false
        },
        role: {
            type: String,
            enum : Object.values(AuthRoles),
            default: AuthRoles.USER
        },
        forgotPasswordToken: String,
        forgotPasswordExpiry: Date,
    },
    {
        timestamps: true
    }
)

// pre hooks mongoose
userSchema.pre("save", async function(next){
   if (!this.modified("password")) return next();
   this.password = await bcrypt.hash(this.password, 10)
   next()
})

module.exports = model('user', userSchema)