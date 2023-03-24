const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
    },
	email: {
		type: String,
        unique: true,
    },
	createdAt:{
		type: Date,
        default: Date.now
    },
    password: { 
        type: String, 
    }, 
    contactNo: { 
        type: Number, 
        required: false
    }, 
    role: { 
        type: String,
        enum: {
            ADMIN: 'ADMIN',
            MODERATOR: 'MODERATOR',
            USER: 'USER'
        },
    },
});

module.exports = User = mongoose.model("User", UserSchema);