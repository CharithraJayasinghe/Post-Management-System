import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title:{
        type:String,
        require:[true, 'title is required']
    },
    description:{
        type:String,
        require:[true, 'description is required']
    },
    image:{
        type:String,
        require:[true, 'image is required']
    }
},{timestamps:true}

);

const Post = mongoose.model('Post', postSchema);

export default Post;