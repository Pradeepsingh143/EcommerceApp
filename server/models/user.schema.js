import mongoose from 'mongoose';
const {schema} = mongoose;

const userSchema = schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            maxLenght: [45, "Name must be less than 45"],
            trim : true,
        }
    }
)