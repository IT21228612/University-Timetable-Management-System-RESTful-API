const request = require('supertest');
const app = require('../app');

let newEnrollmentId; // Variable to store the newly created enrollment ID
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWZlZDdhZmNkNzY2OGE4YzE5NWUzZWEiLCJ1c2VybmFtZSI6ImplZXdhIiwiYWNjZXNzTGV2ZWwiOiJhZG1pbiIsImlhdCI6MTcxMTIwNDY0M30.PHf8RxJHPXF6jCGRCFvLT_biyu8QFjN-K_Vt8Xl-vDs";

describe('POST /api/enrollments', () => {
    it('should create a new enrollment', async () => {
        const newEnrollmentData = {
            S_Id: 'jeewa', // Provide a valid student ID
            C_code: 'Chemistry' // Provide a valid course code
        };

        const response = await request(app)
            .post('/api/enrollments')
            .set('Authorization', `Bearer ${token}`)
            .send(newEnrollmentData);

            newEnrollmentId = response.body._id;

        expect(response.status).toBe(201);
        
    }, 10000);
});

describe('GET /api/enrollments', () => {
    it('should return all enrollments', async () => {
        const response = await request(app)
            .get('/api/enrollments')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
    }, 10000);
});

describe('GET /api/enrollments/student/:studentId', () => {
    it('should return enrollments by student ID', async () => {
        const studentId = 'jeewa'; // Provide a valid student ID
        const response = await request(app)
            .get(`/api/enrollments/student/${studentId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
    }, 10000);
});

describe('PUT /api/enrollments/:id', () => {
    it('should update an enrollment by ID', async () => {
        const updatedEnrollmentData = {
            S_Id: 'updatedStudentId', // Provide an updated student ID
            C_code: 'UPDATED_COURSE_CODE' // Provide an updated course code
        };

        const response = await request(app)
            .put(`/api/enrollments/${newEnrollmentId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedEnrollmentData);

        expect(response.status).toBe(200);
      
    }, 10000);
});

describe('DELETE /api/enrollments/:id', () => {
    it('should delete an enrollment by ID', async () => {
        const response = await request(app)
            .delete(`/api/enrollments/${newEnrollmentId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Enrollment deleted successfully');
    }, 10000);
});
