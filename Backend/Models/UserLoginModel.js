import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['User', 'Admin'],
            default: 'User'
        }
    },
    {
        timestamps: true
    }
);

UserSchema.pre('save', function(next) {
    if (this.username.toLowerCase() === 'admin') {
        this.role = 'Admin';
    }
    next();
});

export const User = mongoose.model('User', UserSchema, 'User');
export default User;