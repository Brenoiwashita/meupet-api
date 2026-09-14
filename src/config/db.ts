import mongoose from 'mongoose';
let cached=false;
export async function connectDb(){ if(cached || mongoose.connection.readyState===1)return; const uri=process.env.MONGODB_URI; if(!uri)throw new Error('MONGODB_URI não configurada'); await mongoose.connect(uri,{dbName:process.env.MONGODB_DB_NAME||'dogs'}); cached=true; }
