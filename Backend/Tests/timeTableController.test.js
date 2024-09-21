const request = require('supertest');
const app = require('../app'); // Assuming your Express app is exported from 'app.js'

let newTimetableId; // Variable to store the newly created timetable ID
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWZlZDdhZmNkNzY2OGE4YzE5NWUzZWEiLCJ1c2VybmFtZSI6ImplZXdhIiwiYWNjZXNzTGV2ZWwiOiJhZG1pbiIsImlhdCI6MTcxMTIwNDY0M30.PHf8RxJHPXF6jCGRCFvLT_biyu8QFjN-K_Vt8Xl-vDs";

describe('POST /api/timetables', () => {
    it('should create a new timetable', async () => {
      const newTimetable = {
        C_name: 'New Course',
        day: 'Monday',
        startTime: '2024-03-25T09:00:00.000Z',
        endTime: '2024-03-25T11:00:00.000Z',
        faculty: 'New Faculty',
        location: 'Locationxxxxxxxxxxxxx101'
      };

      const response = await request(app)
        .post('/api/timetables')
        .set('Authorization', `Bearer ${token}`)
        .send(newTimetable);

      expect(response.status).toBe(201);
      
      newTimetableId = response.body._id;
    }, 10000); // 10 seconds timeout
});

describe('GET /api/timetables', () => {
    it('should return all timetables', async () => {
        const response = await request(app)
            .get('/api/timetables')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        // Add further assertions based on your application logic
    }, 10000);
});

describe('GET /api/timetables/:id', () => {
    it('should return the timetable with the specified id', async () => {
        const response = await request(app)
            .get(`/api/timetables/${newTimetableId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        // Add further assertions based on your application logic
    }, 10000);
});

describe('PATCH /api/timetables/:id', () => {
    it('should update the timetable with the specified id', async () => {
        const updatedTimetableData = {
            C_name: 'New Course',
            day: 'new Tuesday',
            startTime: '2024-08-25T09:00:00.000Z',
            endTime: '2024-08-25T11:00:00.000Z',
            faculty: 'Updated Faculty',
            location: 'Updated Location'
        };

        const response = await request(app)
            .patch(`/api/timetables/${newTimetableId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedTimetableData);

        expect(response.status).toBe(200);
        // Add further assertions based on your application logic
    }, 10000);
});

describe('DELETE /api/timetables/:id', () => {
    it('should delete the timetable with the specified id', async () => {
        const response = await request(app)
            .delete(`/api/timetables/${newTimetableId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        // Add further assertions based on your application logic
    }, 10000);
});
