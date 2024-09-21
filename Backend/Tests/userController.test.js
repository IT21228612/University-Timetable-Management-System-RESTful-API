const request = require('supertest');
const app = require('../app'); // Assuming your Express app is exported from 'app.js'

let newUser; // Variable to store the newly created user's ID
// Variable to store the authentication token of an admin user
let adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWZlZDdhZmNkNzY2OGE4YzE5NWUzZWEiLCJ1c2VybmFtZSI6ImplZXdhIiwiYWNjZXNzTGV2ZWwiOiJhZG1pbiIsImlhdCI6MTcxMTIwNDY0M30.PHf8RxJHPXF6jCGRCFvLT_biyu8QFjN-K_Vt8Xl-vDs"; 

describe('POST /api/users/register', () => {
    it('should register a new user', async () => {
        const userData = {
            UserName: 'testuser',
            email: 'testuser@example.com',
            password: 'testpassword',
            accessLevel: 'student',
            name: 'Test User'
        };

        const response = await request(app)
            .post('/api/users/register')
            .send(userData);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User registered successfully');
        newUser = response.body.user._id; // Access _id from the user object
    }, 10000); // 10 seconds timeout
});

describe('POST /api/users/login', () => {
    it('should log in the registered user', async () => {
        const loginData = {
            UserName: 'testuser',
            password: 'testpassword'
        };

        const response = await request(app)
            .post('/api/users/login')
            .send(loginData);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Login successful');
        expect(response.body.token).toBeTruthy();
        //adminToken = response.body.token;
    }, 10000); // 10 seconds timeout
});

describe('GET /api/users', () => {
    it('should get all users', async () => {
        const response = await request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    }, 10000); // 10 seconds timeout
});

describe('GET /api/users/:id', () => {
    it('should get a user by ID', async () => {
        const response = await request(app)
            .get(`/api/users/${newUser}`)
            .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(200);
        
    }, 10000); // 10 seconds timeout
});

describe('PUT /api/users/:id', () => {
    it('should update a user by ID', async () => {
        const updatedUserData = {
            name: 'Updated User Name',
            email: 'updateduser@example.com'
        };

        const response = await request(app)
            .put(`/api/users/${newUser}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send(updatedUserData);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(updatedUserData.name);
        expect(response.body.email).toBe(updatedUserData.email);
    }, 10000); // 10 seconds timeout
});

describe('PATCH /api/users/:id/access-level', () => {
    it('should change user\'s access level by ID', async () => {
        const updatedAccessLevel = 'admin';

        const response = await request(app)
            .patch(`/api/users/${newUser}/access-level`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ accessLevel: updatedAccessLevel });

        expect(response.status).toBe(200);
        expect(response.body.accessLevel).toBe(updatedAccessLevel);
    }, 10000); // 10 seconds timeout
});

describe('DELETE /api/users/:id', () => {
    it('should delete a user by ID', async () => {
        const response = await request(app)
            .delete(`/api/users/${newUser}`)
            .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User deleted successfully');
    }, 10000); // 10 seconds timeout
});


