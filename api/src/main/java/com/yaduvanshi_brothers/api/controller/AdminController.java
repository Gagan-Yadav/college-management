package com.yaduvanshi_brothers.api.controller;

import com.yaduvanshi_brothers.api.DTOs.LectureDTO;
import com.yaduvanshi_brothers.api.entity.*;
import com.yaduvanshi_brothers.api.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
// Allow all headers

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private LectureService lectureService;

    @Autowired
    private FacultyService facultyService;

    @Autowired
    private BranchService branchService;



    @PostMapping("/add-branch")
    public String addBranchController(@RequestBody BranchesEntity branchData){
        branchService.addBranchService(branchData);
        return "Branch added successfully";
    }

    @PostMapping("/add-faculty")
    public String addFacultyController(@RequestBody FacultyEntity facultyEntity){
        facultyService.addFacultyService(facultyEntity);
        return "Faculty added successfully";
    }

//    @CrossOrigin(origins = "http://localhost:3000/", allowCredentials = "true")
    @GetMapping("/get-all-users-on-this-website")
    public ResponseEntity<List<UserEntity>> userListController(){
        List<UserEntity> allUsers = userService.allUsersService();
        return new ResponseEntity<>(allUsers, HttpStatus.OK);
    }


//    @CrossOrigin(origins = "http://localhost:3000/", allowCredentials = "true")
    @PostMapping("/add-user")
    public ResponseEntity<String> userUserByAdminController(@RequestBody UserEntity userEntity){
        userService.adduserByAdminService(userEntity);
        return new ResponseEntity<>("User added successfully", HttpStatus.CREATED);
    }

    @PatchMapping("/update-user-by-id/{id}")
    public ResponseEntity<String> updateUserByIdController(@RequestBody UserEntity updatedData, @PathVariable int id){
        Optional<UserEntity> user = userService.findByuserByIdService(id);
        if(user.isPresent()){
            UserEntity userInDB = user.get();
            userInDB.setUsername(updatedData.getUsername());
            userInDB.setPassword(updatedData.getPassword());
            userInDB.setRoles(updatedData.getRoles());
            userInDB.setEmail(updatedData.getEmail());
            userInDB.setPhone(updatedData.getPhone());
            userInDB.setCity(updatedData.getCity());
            userService.updateUserService(userInDB);
            return new ResponseEntity<>("User updated successfully", HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/delete-user-by-id/{id}")
    public ResponseEntity<String> deleteUserByIdController(@PathVariable int id){
        Optional<UserEntity> user = userService.findByuserByIdService(id);
        if(user.isPresent()){
            userService.deleteUserByIdService(id);
            return new ResponseEntity<>("User deleted successfully", HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>("User not exist", HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/delete-student-by-id/{id}")
    public ResponseEntity<String> deleteStudentByIdController(@PathVariable int id){
        Optional<StudentEntity> student = studentService.getStudentByIdService(id);
        if (student.isPresent()) {
            studentService.deleteStudentById(id);
            return new ResponseEntity<>("Student deleted successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>("Student not found", HttpStatus.NOT_FOUND);
    }

    @PostMapping("/add-new-student")
    public ResponseEntity<String> addStudentController(@RequestBody StudentEntity student){
        studentService.addUserService(student);
        return new ResponseEntity<>("Student added successfully", HttpStatus.CREATED);
    }

    @GetMapping("/get-student-by-id/{id}")
    public ResponseEntity<Optional<StudentEntity>> getStudentByIdController(@PathVariable int id){
        Optional<StudentEntity> student = studentService.getStudentByIdService(id);
        return new ResponseEntity<>(student, HttpStatus.OK);
    }

    @PatchMapping("/update-student-by-id/{id}")
    public ResponseEntity<String> updateStudentById(@PathVariable int id, @RequestBody StudentEntity student){
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
            existingStudent.setBranches(student.getBranches());

            studentService.updateStudentById(existingStudent);
            return new ResponseEntity<>("Student details updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Student not found", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<?> createLecture(@RequestBody LectureEntity lecture) {
        LectureEntity createdLecture = lectureService.createLecture(lecture);
        return ResponseEntity.status(HttpStatus.CREATED).body("lecture created");
    }

//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteLecture(@PathVariable int id) {
//        lectureService.deleteLecture(id);
//        return ResponseEntity.noContent().build();
//    }

    // Get all lectures with pagination and sorting
    @GetMapping("/get-all-lectures")
    public List<LectureDTO> getAllLectures(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "asc") String sortDirection,
            @RequestParam(defaultValue = "lectureId") String sortBy
    ) {
        Sort.Direction direction = sortDirection.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        Page<LectureEntity> lecturesPage = lectureService.getAllLectures(PageRequest.of(page, size, Sort.by(direction, sortBy)));

        return lecturesPage.stream().map(lecture -> {
            LectureDTO dto = new LectureDTO();
            dto.setLectureId(lecture.getLectureId());
            dto.setYear(lecture.getYear());
            dto.setSemester(lecture.getSemester());
            dto.setDepartment(lecture.getDepartment());
            dto.setSubject(lecture.getSubject());
            dto.setStartFrom(lecture.getStartFrom());
            dto.setTill(lecture.getTill());
            dto.setFacultyName(lecture.getFacultyName());
            dto.setRoomNumber(lecture.getRoomNumber());
            dto.setFacultyId(lecture.getFaculty() != null ? lecture.getFaculty().getFacultyId() : null);
            dto.setStudentIds(lecture.getStudents().stream().map(StudentEntity::getStudentId).collect(Collectors.toList()));
            return dto;
        }).collect(Collectors.toList());
    }

    // Get lecture by ID
    @GetMapping("/{id}")
    public ResponseEntity<LectureDTO> getLectureById(@PathVariable int id) {
        LectureEntity lecture = lectureService.getLectureById(id);
        if (lecture != null) {
            LectureDTO dto = new LectureDTO();
            dto.setLectureId(lecture.getLectureId());
            dto.setYear(lecture.getYear());
            dto.setSemester(lecture.getSemester());
            dto.setDepartment(lecture.getDepartment());
            dto.setSubject(lecture.getSubject());
            dto.setStartFrom(lecture.getStartFrom());
            dto.setTill(lecture.getTill());
            dto.setFacultyName(lecture.getFacultyName());
            dto.setRoomNumber(lecture.getRoomNumber());
            dto.setFacultyId(lecture.getFaculty() != null ? lecture.getFaculty().getFacultyId() : null);
            dto.setStudentIds(lecture.getStudents().stream().map(StudentEntity::getStudentId).collect(Collectors.toList()));
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Search lecture by subject name
    @GetMapping("/search-by-subject")
    public List<LectureDTO> searchLecturesBySubject(@RequestParam String subject) {
        List<LectureEntity> lectures = lectureService.findLecturesBySubject(subject);
        return lectures.stream().map(lecture -> {
            LectureDTO dto = new LectureDTO();
            dto.setLectureId(lecture.getLectureId());
            dto.setYear(lecture.getYear());
            dto.setSemester(lecture.getSemester());
            dto.setDepartment(lecture.getDepartment());
            dto.setSubject(lecture.getSubject());
            dto.setStartFrom(lecture.getStartFrom());
            dto.setTill(lecture.getTill());
            dto.setFacultyName(lecture.getFacultyName());
            dto.setRoomNumber(lecture.getRoomNumber());
            dto.setFacultyId(lecture.getFaculty() != null ? lecture.getFaculty().getFacultyId() : null);
            dto.setStudentIds(lecture.getStudents().stream().map(StudentEntity::getStudentId).collect(Collectors.toList()));
            return dto;
        }).collect(Collectors.toList());
    }

    // Sort lectures by any field in ascending/descending order
    @GetMapping("/sort")
    public List<LectureDTO> sortLectures(
            @RequestParam(defaultValue = "lectureId") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDirection
    ) {
        Sort.Direction direction = sortDirection.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        List<LectureEntity> lectures = lectureService.sortLectures(Sort.by(direction, sortBy));

        return lectures.stream().map(lecture -> {
            LectureDTO dto = new LectureDTO();
            dto.setLectureId(lecture.getLectureId());
            dto.setYear(lecture.getYear());
            dto.setSemester(lecture.getSemester());
            dto.setDepartment(lecture.getDepartment());
            dto.setSubject(lecture.getSubject());
            dto.setStartFrom(lecture.getStartFrom());
            dto.setTill(lecture.getTill());
            dto.setFacultyName(lecture.getFacultyName());
            dto.setRoomNumber(lecture.getRoomNumber());
            dto.setFacultyId(lecture.getFaculty() != null ? lecture.getFaculty().getFacultyId() : null);
            dto.setStudentIds(lecture.getStudents().stream().map(StudentEntity::getStudentId).collect(Collectors.toList()));
            return dto;
        }).collect(Collectors.toList());
    }

}
