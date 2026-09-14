import {Schema,model,models} from 'mongoose';
const schema=new Schema({ownerId:{type:Schema.Types.ObjectId,ref:'User',required:true,index:true},name:{type:String,required:true},species:{type:String,required:true},breed:String,sex:String,birthDate:Date,approximateAge:Number,color:String,weight:Number,size:String,neutered:Boolean,microchip:String,allergies:[String],conditions:[String],continuousMedications:[String],photoUrl:String},{timestamps:true});
export const Pet=models.Pet||model('Pet',schema);
