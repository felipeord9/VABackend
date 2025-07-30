const express = require("express");
const passport = require('passport')
const UserController = require("../../controllers/userController");
const { checkRoles } = require('../../middlewares/authHandler')

const router = express.Router();

/* router.use(
  passport.authenticate('jwt', { session: false }), 
  checkRoles('admin')
) */

router
  .get("/",
    passport.authenticate('jwt', { session: false }), 
    checkRoles('admin'),
     UserController.findAllUsers
  )
  .get("/instaladores", UserController.findAllInstallers)
  .get("/:id",
    passport.authenticate('jwt', { session: false }), 
    checkRoles('admin'),
    UserController.findOneUser
  )
  .get("/email/:email",
    passport.authenticate('jwt', { session: false }), 
    checkRoles('admin'),
    UserController.findUserByEmail
  )
  .post('/',
    passport.authenticate('jwt', { session: false }), 
    checkRoles('admin'),
    UserController.createUser
  )
  .patch('/:id',
    passport.authenticate('jwt', { session: false }), 
    checkRoles('admin'),
    UserController.updateUser
  )
  .delete('/:id',
    passport.authenticate('jwt', { session: false }), 
    checkRoles('admin'),
    UserController.deleteUser
  );

module.exports = router