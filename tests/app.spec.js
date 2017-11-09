'use strict';
var filter = new CS.Filter();

store.students = new CS.Students.StudentsList(students);
store.groups = new CS.Groups.GroupList(groups);

QUnit.module( "group Filter" );
QUnit.test('filterStudentsByOneGroup', function (assert) {
		var group = new CS.Groups.Group(groups[0]),
			studentsList, expectedList, 
			resultList;


    expectedList = [new CS.Students.Student(students[0]), new CS.Students.Student(students[1])];
   	studentsList = new CS.Students.StudentsList(students);

	resultList = filter.split('students', group);

   	assert.deepEqual(resultList[0].get('login'), expectedList[0].get('login'),'Filter chose students by group DP-093-JS');            
    assert.deepEqual(resultList[1].get('login'), expectedList[1].get('login'),'Filter chose students by group DP-093-JS');     
    
});

QUnit.test('filterStudentsByGroups', function (assert) {
	var groupsList = [ new CS.Groups.Group(groups[0]), new CS.Groups.Group(groups[1])],
		studentsList, expectedList, 
		resultList;


    expectedList = [new CS.Students.Student(students[0]), new CS.Students.Student(students[1]), new CS.Students.Student(students[2])];
   	studentsList = new CS.Students.StudentsList(students);

	resultList = filter.split('students', groupsList);

   	assert.deepEqual(resultList[0].get('login'), expectedList[0].get('login'),'Filter chose students by group DP-093-JS');            
    assert.deepEqual(resultList[1].get('login'), expectedList[1].get('login'),'Filter chose students by groups DP-093-JS');              
    assert.deepEqual(resultList[2].get('login'), expectedList[2].get('login'),'Filter chose students by groups DP-094-MQC');              
    assert.deepEqual(resultList.length, 3,'Filter has found 3 students');              
});

