import mongoose from 'mongoose';
const connectDb = async ()=>{
 try {
   await mongoose.connect(process.env.MONGODB_URI).then(()=>{
      console.log('MongoDB connection successful');
   })
  
 } catch (error) {
  console.log('MongoDB connection failed:', error);
 }
}
export default connectDb;