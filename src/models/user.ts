import mongoose,{Schema,Document,Model}from "mongoose";


interface IUser extends Document {
    name: string;
    email: string;
    passwordHash: string;
    street: string;
    isAdmin: boolean;
    password: string;
}

const userSchema: Schema<IUser> = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    passwordHash: {
        type: String
    },
    street: {
        type: String
    },
    isAdmin:{
        type:Boolean
    },
    password:{
        type:String
    }
    
});

userSchema.virtual('id').get(function(this:Document) {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true,
});

export const User: Model<IUser> = mongoose.model('User', userSchema);
export default userSchema;