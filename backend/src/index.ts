import server from './app/server';

if (!process.env.PORT) {
    throw new Error('Environment variable PORT is undefined');
}

server.listen(process.env.PORT, () => {
    console.log(`Server is up on port ${process.env.PORT}`);
});
