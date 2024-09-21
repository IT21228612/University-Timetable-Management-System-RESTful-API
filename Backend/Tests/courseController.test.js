const request = require('supertest');
const app = require('../app');

let newCourseId ; // Variable to store the newly created course ID
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWZlZDdhZmNkNzY2OGE4YzE5NWUzZWEiLCJ1c2VybmFtZSI6ImplZXdhIiwiYWNjZXNzTGV2ZWwiOiJhZG1pbiIsImlhdCI6MTcxMTIwNDY0M30.PHf8RxJHPXF6jCGRCFvLT_biyu8QFjN-K_Vt8Xl-vDs"

describe('POST /api/courses', () => {
    it('should create a new course', async () => {
      const newCourse = {
        C_name: 'New Course',
        C_code: 'NEW101',
        C_description: 'This is a new course',
        C_credits: 3,
        C_faculty: 'New Faculty'
      };

      
      const response = await request(app)
        .post('/api/courses')
        .set('Authorization', `Bearer ${token}`)
        .send(newCourse);

      expect(response.status).toBe(201);
      expect(response.body.C_name).toBe(newCourse.C_name);
      newCourseId = response.body._id;

    }, 10000); // 10 seconds timeout
});



describe('GET /api/courses', () => {
    it('should return all courses', async () => {
        
       
        // Make a GET request to '/api/courses' endpoint with the auth token
        const response = await request(app)
            .get('/api/courses')
            .set('Authorization', `Bearer ${token}`);

        // Assert that the response status is 200
        expect(response.status).toBe(200);

    }, 10000);
});

describe('GET /api/courses/:id', () => {
    it('should return the course with the specified id', async () => {
        // Make a GET request to '/api/courses/:id' endpoint with the auth token
        const response = await request(app)
            .get(`/api/courses/${newCourseId}`)
            .set('Authorization', `Bearer ${token}`);

        // Assert that the response status is 200
        expect(response.status).toBe(200);

        
    }, 10000);
});

describe('PATCH /api/courses/:id', () => {
    it('should update the course with the specified id', async () => {
        const updatedCourseData = {
            C_name: 'Updated Course Name',
            C_code: 'UPDATED101',
            C_description: 'This is the updated course description',
            C_credits: 4,
            C_faculty: 'Updated Faculty'
        };

        // Make a PATCH request to '/api/courses/:id' endpoint with the auth token and updated course data
        const response = await request(app)
            .patch(`/api/courses/${newCourseId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedCourseData);

        // Assert that the response status is 200
        expect(response.status).toBe(200);

        
    }, 10000);
});

describe('PATCH /api/courses/:id/update-faculty', () => {
    it('should update the faculty of the course with the specified id', async () => {
        const updatedFaculty = 'Updated Faculty';

        // Make a PATCH request to '/api/courses/:id/update-faculty' endpoint with the auth token and updated faculty
        const response = await request(app)
            .patch(`/api/courses/${newCourseId}/update-faculty`)
            .set('Authorization', `Bearer ${token}`)
            .send({ faculty: updatedFaculty });

        // Assert that the response status is 200
        expect(response.status).toBe(200);

        
    }, 10000);
});




describe('DELETE /api/courses/:id', () => {
    it('should delete the course with the specified id', async () => {
        // Make a DELETE request to '/api/courses/:id' endpoint with the auth token
        const response = await request(app)
            .delete(`/api/courses/${newCourseId}`)
            .set('Authorization', `Bearer ${token}`);

        // Assert that the response status is 200
        expect(response.status).toBe(200);

        // Assert that the response body contains the success message
        expect(response.body.message).toBe('Course deleted successfully');
    }, 10000);
});


