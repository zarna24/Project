let students = [
    {
        id: 1,
        firstName: "Lasha",
        lastName: "Gumberidze",
        average: 0,
        missingLessons: 0,
    },
    {
        id: 2,
        firstName: "Lika",
        lastName: "Papashvili",
        average: 0,
        missingLessons: 0,
    },
    {
        id: 3,
        firstName: "Ana",
        lastName: "Grigolia",
        average: 0,
        missingLessons: 0,
    },
    {
        id: 4,
        firstName: "Tea",
        lastName: "Razmadze",
        average: 0,
        missingLessons: 0,
    },
    {
        id: 5,
        firstName: "Givi",
        lastName: "Lashkhi",
        average: 0,
        missingLessons: 0,
    },
    {
        id: 6,
        firstName: "Andro",
        lastName: "Machavariani",
        average: 0,
        missingLessons: 0,
    },
    {
        id: 7,
        firstName: "Dea",
        lastName: "Amashukeli",
        average: 0,
        missingLessons: 0,
    },
    {
        id: 8,
        firstName: "Gia",
        lastName: "Samchkuashvili",
        average: 0,
        missingLessons: 0,
    },
    {
        id: 9,
        firstName: "Lela",
        lastName: "Burduli",
        average: 0,
        missingLessons: 0,
    },{
        id: 10,
        firstName: "Goga",
        lastName: "Dvali",
        average: 0,
        missingLessons: 0,
    },
];

let days = [];

let studentTemplate = document.getElementById('studentsTemplate').innerHTML;
let studentsHtml = document.getElementById('students');
let studentDays = document.getElementById('days');
let studentsDaysTemplate = document.getElementById('studentsDaysTemplate').innerHTML;

adjustStudent();
showDays();
totalDays();
allStudentsAverage();
countMissedLessons();
totalStudents();

function adjustStudent() {
    let result = "";
    let studentHtml = "";
    students.forEach(function (student) {
        var mapObj = {
            '@name': student.firstName + ' ' + student.lastName,
            '@average': studentAverage(student.id),
        };
        studentHtml = studentTemplate.replace(/@name|@average/gi, function (matched) {
            return mapObj[matched];
        });

        result += studentHtml;
    });
    studentsHtml.innerHTML = result;
}

function showDays() {
    let result = "";
    let studentsdayhtml = "";
    let showStundetMarksHtml = "";
    let stundetMarksArr = [];
    days.forEach(function (day, index) {
        studentsdayhtml = studentsDaysTemplate.replace('@date', day.date);
        result += studentsdayhtml;
        showStundetMarksHtml += showStundetMarks(day.students, index, day.date);
        studentDays.innerHTML = result;
        stundetMarksArr.push({
            id: index,
            html: showStundetMarks(day.students, index, day.date)
        });
        document.querySelectorAll('#days .studentsMarks')[index].innerHTML = showStundetMarks(day.students, index, day.date);
    });

    stundetMarksArr.forEach(function (obj, index) {
        document.querySelectorAll('#days .studentsMarks')[index].innerHTML = obj.html;

    })
}

function showStundetMarks(students, index, date = null) {

    let result = "";
    let studentsdayhtml = "";
    students.forEach(function (student) {

        studentsdayhtml = document.getElementsByClassName('studentsMarks')[index].innerHTML.replace('@mark', student.mark);
        studentsdayhtml = studentsdayhtml.replace('@studentId', student.student_id);
        studentsdayhtml = studentsdayhtml.replace('@dayDate', date);


        result += studentsdayhtml;
    })
    return result;
}

function addDay() {
    let date = defineNextDay();
    days.push({
        date: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        students: [
            {
                student_id: 1,
                present: true,
                mark: '',
            },
            {
                student_id: 2,
                present: true,
                mark: '',
            },
            {
                student_id: 3,
                present: true,
                mark: '',
            },
            {
                student_id: 4,
                present: true,
                mark: '',
            },
            {
                student_id: 5,
                present: true,
                mark: '',
            },
            {
                student_id: 6,
                present: true,
                mark: '',

            },
            {
                student_id: 7,
                present: true,
                mark: '',

            },
            {
                student_id: 8,
                present: true,
                mark: '',

            },
            {
                student_id: 9,
                present: true,
                mark: '',

            },
            {
                student_id: 10,
                present: true,
                mark: '',

            }],
    });

  

    updateStatistics();
}

function removeDays() {
    days.pop();
  
    updateStatistics();
}

function totalDays() {
    document.getElementById('totalDays').innerHTML = days.length;
    return days.length;
}

function updateStatistics() {
    showDays();
    totalDays();
    allStudentsAverage();
    totalStudents();
    countMissedLessons();
    adjustStudent();

}

function studentAverage(student_id) {
    let sum = 0;
    let presentDayes = 0;
    days.forEach(function (day) {
        day.students.forEach(function (student) {
            if (student_id === student.student_id && student.mark != 0) {
                sum += student.mark;
                presentDayes++;
            }
        });
    })

    if (presentDayes == 0) return 0;
    let result = Math.round(sum / presentDayes * 100) / 100;
    return result;
}

function allStudentsAverage() {


    let averageMarks = 0;
    students.forEach(function (student) {
        averageMarks += studentAverage(student.id);
    });
    if (days.length == 0) {
        averageMarks = 0;
    }
    else {
        averageMarks = averageMarks / days.length;
    }

    averageMarks = Math.round(averageMarks * 100) / 100;

    document.getElementById('averageMarks').innerHTML = averageMarks;

    return averageMarks;

}

function defineNextDay() {
    let lastDay = new Date('2018-01-01');
    if (days.length !== 0) {
        lastDay = new Date(days[days.length - 1].date);
    }
    let nextDay = addDays(lastDay, 1)
    if (lastDay.getDay() !== 5) {
        nextDay = addDays(lastDay, 2);
    }
    return nextDay;
}

function addDays(d, qty) {
    var newDate = new Date(d.getTime());
    newDate.setDate(d.getDate() + qty);
    return newDate;
}

function totalStudents() {
    document.getElementById('totalStudents').innerHTML = students.length;
    return students.length;
}

function countMissedLessons() {
    let missedLessons = 0;
    days.forEach(function (day) {
        day.students.forEach(function (student) {
            if (student.mark == 0) {
                missedLessons++
            }

        });
    });
    document.getElementById('totalMissedLessons').innerHTML = missedLessons;
}

function updateStudentMark(el) {
    if ( el.value > 5) {
       el.value = 5;
    }

    if(el.value ==0){
        let att = document.createAttribute("class");      
        att.value = "red-mark";                          
        el.setAttributeNode(att);      
    }

    let val = el.value;
    let studentID = el.getAttribute('data-student-id');
    let date = el.getAttribute('data-day-date');
    days.forEach(function (day) {
        if (day.date == date) {
            day.students.forEach(function (student) {
                if (student.student_id == studentID) {
                    student.mark = val;
                }
            });
        }
    });
  



    updateStatistics();
}


