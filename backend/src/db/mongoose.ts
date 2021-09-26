import mongoose from 'mongoose';

// Returns void on a successful connection,
// otherwise returns the error
export const connect = async (): Promise<void> => {
    if (!process.env.MONGODB_URI) {
        throw new Error('Environment variable MONGODB_URI is undefined');
    }

    await mongoose.connect(process.env.MONGODB_URI);

    // An error occurred after a successful initial connection
    mongoose.connection.on('error', (err) => {
        console.log(err);
    });
};

export default connect;
