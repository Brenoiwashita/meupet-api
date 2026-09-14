import {Schema,model,models} from 'mongoose';
const schema=new Schema({googleSub:{type:String,unique:true,index:true},email:{type:String,required:true},name:String,picture:String},{timestamps:true});
export const User=models.User||model('User',schema);
