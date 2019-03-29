const appKey = 'kid_BJXTsSi-e';
const authString = 'Basic ' + btoa('guest:guest');
const collection = 'students';
const url = `https://baas.kinvey.com/appdata/${appKey}/${collection}`;
const $studentsTable = $('table#results');

function addStudent() {
  $.ajax({
    method: 'POST',
    url,
    headers: {
      'Content-type': 'application/json',
      Authorization: authString
    },
    data: JSON.stringify({
      ID: 12345,
      FirstName: 'bai',
      LastName: 'Stavri',
      FacultyNumber: '98765',
      Grade: 3
    })
  });
};

// addStudent();

function getStudents() {
  $.ajax({
    method: 'GET',
    url,
    headers: {
      Authorization: authString
    },
    success: onGetStudentsSuccess,
    error: onError
  });
}

function onGetStudentsSuccess(data) {
  let sortedStudents = data.sort((a, b) => a['ID'] - b['ID']);

  sortedStudents.forEach(student => {
    let $tr = $(`<tr>
    <td>${student.ID}</td>
    <td>${student.FirstName}</td>
    <td>${student.LastName}</td>
    <td>${student.FacultyNumber}</td>
    <td>${student.Grade}</td>
    </tr>`);

    $studentsTable.append($tr);
  });
}

function onError(error) {
  console.log(error);
}

getStudents();