package com.yaduvanshi_brothers.api.controller;

import com.yaduvanshi_brothers.api.entity.StudentEntity;
import com.yaduvanshi_brothers.api.entity.UserEntity;
import com.yaduvanshi_brothers.api.service.StudentService;
import com.yaduvanshi_brothers.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private StudentService studentService;

    @GetMapping("/get-all-users-on-this-website")
    public ResponseEntity<?> userListController(){
        List<UserEntity> allUsers = userService.allUsersService();
        return new ResponseEntity<>(allUsers,HttpStatus.OK);
    }

    @PostMapping("/add-user")
    public ResponseEntity<?> userUserByAdminController(@RequestBody UserEntity userDta){
        userService.adduserByAdminService(userDta);
        return new ResponseEntity<>("user added successfully...",HttpStatus.CREATED);
    }

//    @PostMapping("/register")
//    public ResponseEntity<?> register(@RequestBody UserEntity userDta){
//        userService.addOrRegisterUserService(userDta);
//        return ResponseEntity.status(HttpStatus.ACCEPTED).body("registered");
//    }

    @PatchMapping("/update-user-by-id/{id}")
    public ResponseEntity<?> updateUserByIdController(@RequestBody UserEntity updatedData, @PathVariable int id){
        Optional<UserEntity> user = userService.findByuserByIdService(id);
        if(user.isPresent()){
            UserEntity userInDB = user.get();
            userInDB.setUserName(updatedData.getUserName());
            userInDB.setPassword(updatedData.getPassword());
            userInDB.setRoles(updatedData.getRoles());
            userService.updateUserService(userInDB);
            return new ResponseEntity<>("user updated successfully",HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>("user not found",HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/delete-user-by-id/{id}")
    public ResponseEntity<?> deleteUserByIfController(@PathVariable int id){
        Optional<UserEntity> user = userService.findByuserByIdService(id);
        if(user.isPresent()){
            userService.deleteUserByIdService(id);
            return new ResponseEntity<>("user deleted successfully",HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>("user not exist",HttpStatus.NOT_FOUND);

    }


    @GetMapping("/get-all-students")
    public ResponseEntity<?> getAllStudentController(){
        List<StudentEntity> all = studentService.getAllStudentService();
        return new ResponseEntity<>(all,HttpStatus.OK);
    }

    @GetMapping("/get-student-by-id/{id}")
    public ResponseEntity<?> getStudentByIdController(@PathVariable int id){
        Optional<StudentEntity> student = studentService.getStudentByIdService(id);
        return new ResponseEntity<>(student,HttpStatus.OK);
    }

    @PostMapping("/add-new-student")
    public ResponseEntity<?> addStudentController(@RequestBody StudentEntity student){
        studentService.addUserService(student);
        return new ResponseEntity<>("student added successfully",HttpStatus.CREATED);
    }

    @PatchMapping("/update-student-by-id/{id}")
    public ResponseEntity<String> updateStudentById(@PathVariable int id, @RequestBody StudentEntity student) {
        Optional<StudentEntity> studentInDb = studentService.getStudentByIdService(id);
        if (studentInDb.isPresent()) {
            StudentEntity existingStudent = studentInDb.get();
            existingStudent.setRollNo(student.getRollNo());
            existingStudent.setStudentName(student.getStudentName());
            existingStudent.setEmail(student.getEmail());
            existingStudent.setMobile(student.getMobile());
            existingStudent.setAge(student.getAge());
            existingStudent.setAddress(student.getAddress());
            existingStudent.setYear(student.getYear());
            existingStudent.setSemester(student.getSemester());
            existingStudent.setBranch(student.getBranch());

            studentService.updateStudentById(existingStudent);
            return ResponseEntity.ok("Student details updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found");
        }
    }

    @DeleteMapping("/delete-student-by-id/{id}")
    public ResponseEntity<?> deleteStudentByIdController(@PathVariable int id) {
        Optional<StudentEntity> student = studentService.getStudentByIdService(id);
        if (student.isPresent()) {
            studentService.deleteStudentById(id);
            return new ResponseEntity<>("student deleted successfully",HttpStatus.OK);
        }
        return new ResponseEntity<>("student not found",HttpStatus.NOT_FOUND);
    }
}
