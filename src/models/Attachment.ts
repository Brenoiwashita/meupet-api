import {Schema,model,models} from 'mongoose';
const schema=new Schema({ownerId:{type:Schema.Types.ObjectId,ref:'User',required:true,index:true},petId:{type:Schema.Types.ObjectId,ref:'Pet',required:true,index:true},name:String,mimeType:String,size:Number,data:Buffer},{timestamps:true});
export const Attachment=models.Attachment||model('Attachment',schema);
