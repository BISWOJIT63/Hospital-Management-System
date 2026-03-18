const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/hospital_management', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    const db = mongoose.connection.db;
    const collections = await db.collections();
    for (let c of collections) {
        const indexes = await c.indexes();
        const hasDoctorId = indexes.some(i => i.name === 'doctorId_1');
        if (hasDoctorId) {
            console.log(`Collection ${c.collectionName} has doctorId_1 index!`);
            console.log(indexes);
        }
    }
    process.exit(0);
}).catch(e => {
    console.error(e);
    process.exit(1);
});
