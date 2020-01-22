var studentcontroller = require('../controllers/student-controller')
    express = require('express'),
    router = express.Router()



router.route('/')
    .post(studentcontroller.create)
    .patch(studentcontroller.getmatches)
    .get(studentcontroller.getall)
    .delete(studentcontroller.delete)

router.route('/:studentid')
    .get(studentcontroller.read)
    .patch(studentcontroller.addMatch)
    .put(studentcontroller.updateStudent)





router.param('studentid', studentcontroller.studentByID)



module.exports = router
