import mongoose from 'mongoose';
import Service from './models/Service.js';
import dotenv from 'dotenv';

dotenv.config();

const checkServices = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const services = await Service.find({});
        console.log(`Found ${services.length} services:`);
        services.forEach(s => {
            console.log(`- Name: ${s.name}, Status: ${s.status}, Facility: ${s.facilityId}, CreatedBy: ${s.createdBy}`);
        });

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkServices();
