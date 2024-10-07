const fs = require('fs');
const { Parser } = require('json2csv');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

// Function to generate users
const generateUsers = (num) => {
    const users = [];
    for (let i = 0; i < num; i++) {
        const password = bcrypt.hashSync(faker.internet.password(), 10);
        users.push({
            userId: i + 1,
            userName: faker.name.fullName(),
            email: faker.internet.email(),
            password: password,
            role: Math.random() > 0.99 ? 'Admin' : 'Employee',
            designation: faker.name.jobTitle(),
            gender: Math.random() > 0.5 ? 'Male' : 'Female',
            joinDate: faker.date.past().toISOString().split('T')[0],
        });
    }
    return users;
};

// Function to generate trainings
const generateTrainings = (num) => {
    const trainings = [];
    const domains = ['DataEngineering', 'FullStack', 'DataScience', 'DevOps', 'SoftSkills'];
    for (let i = 0; i < num; i++) {
        trainings.push({
            trainingId: i + 1,
            trainingName: faker.company.catchPhrase(), // Updated to use catchPhrase()
            description: faker.lorem.sentence(),
            domainName: domains[Math.floor(Math.random() * domains.length)],
            domainId: Math.floor(Math.random() * 5) + 1,
            duration: Math.floor(Math.random() * 20) + 1,
            startDate: faker.date.future().toISOString().split('T')[0],
        });
    }
    return trainings;
};

// Function to generate responses
const generateResponses = (num, users, trainings) => {
    const responses = [];
    for (let i = 0; i < num; i++) {
        responses.push({
            responseId: i + 1,
            userId: users[Math.floor(Math.random() * users.length)].userId,
            trainingId: trainings[Math.floor(Math.random() * trainings.length)].trainingId,
            score: Math.floor(Math.random() * 101),
            responseDate: faker.date.recent().toISOString().split('T')[0],
        });
    }
    return responses;
};

// Function to generate organisation reviews
const generateOrganisationReviews = (num, users, trainings) => {
    const reviews = [];
    for (let i = 0; i < num; i++) {
        reviews.push({
            reviewId: i + 1,
            userId: users[Math.floor(Math.random() * users.length)].userId,
            trainingId: trainings[Math.floor(Math.random() * trainings.length)].trainingId,
            organisationScore: Math.floor(Math.random() * 101),
            discipline: Math.random() > 0.5,
            hardWorking: Math.random() > 0.5,
            communication: Math.random() > 0.5,
        });
    }
    return reviews;
};

// Main function to orchestrate the data generation and CSV creation
const main = () => {
    const users = generateUsers(300);
    const trainings = generateTrainings(100);
    const responses = generateResponses(10000, users, trainings);
    const organisationReviews = generateOrganisationReviews(10000, users, trainings);

    // Convert data to CSV format
    const usersCsv = new Parser().parse(users);
    const trainingsCsv = new Parser().parse(trainings);
    const responsesCsv = new Parser().parse(responses);
    const reviewsCsv = new Parser().parse(organisationReviews);

    // Write CSV files to the filesystem
    fs.writeFileSync('users.csv', usersCsv);
    fs.writeFileSync('trainings.csv', trainingsCsv);
    fs.writeFileSync('responses.csv', responsesCsv);
    fs.writeFileSync('organisationReviews.csv', reviewsCsv);
};

// Run the main function
main();
