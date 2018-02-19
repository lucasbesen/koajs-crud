export default function routes(router) {
    let studentController = require('../controllers/studentController');

    router.get('/student', studentController.list_all_students);
    router.post('/student', studentController.create_a_student);

    router.get('/student/:studentId', studentController.read_a_student);
    router.put('/student/:studentId', studentController.update_a_student);
    router.delete('/student/:studentId', studentController.delete_a_student);
};