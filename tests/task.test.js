const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const { set } = require('../src/app')

const { userOneId, userOne, setupDatabase, userTwoId, userTwo, taskOne, taskTwo, taskThree } = require('./fixtures/db')
beforeEach(setupDatabase)

test('Should create a task for a user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'From my test'
        })
        .expect(201)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)

})

test('Should get all tasks for a user', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    expect(response.body.length).toEqual(2)

})

test('Should not be allowed to delete other users tasks', async () => {
    const response = await request(app)
        .delete(`/task/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()

})
test('Should not create task with invalid description/completed', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send({
            completed: 4
        })
        .expect(500)


})
