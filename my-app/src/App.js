import './App.css';
import React from 'react';

function importAll(r) {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}

const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

const students = [{
        firstName: 'Emmanuel',
        lastName: 'Egbebo',
        matricNo: 'UG/18/1384',
        regNo: 'Yola/2025/082',
        hobbies: [
            'Gaming',
            'reading',
            'Art',
            'Music'
        ]
    },
    {
        firstName: 'Juliet',
        lastName: 'Ezekiel',
        matricNo: 'UG/18/1392',
        regNo: 'Yola/2025/083',
        hobbies: [
            'Writing',
            'Reading',
            'Dancing',
            'Music'
        ]
    },
    {
        firstName: 'Tarila',
        lastName: 'Ouserigha',
        matricNo: 'UG/18/1412',
        regNo: 'Yola/2025/352',
        hobbies: [
            'Singing',
            'Politics',
            'Football',
            'Music',
            'Arguing'
        ]
    },
    {
        firstName: 'Paul',
        lastName: 'Akpama',
        matricNo: 'UG/18/1369',
        regNo: 'Yola/2025/353',
        hobbies: [
            'Football Analyst',
            'Football',
            'Dancing',
            'Music (Bella Shmurda)'
        ]
    },
    {
        firstName: 'Anastasia',
        lastName: 'Obot',
        matricNo: 'UG/18/1400',
        regNo: 'Yola/2025/437',
        hobbies: [
            'Speaking',
            'Arguing',
            'Reading',
            'Music'
        ]
    }
]

function App() {
  return (
    <div className= "rootDiv">
        <strong><h1>NIGER DELTA UNIVERSITY</h1> <h1>Faculty of Law</h1> <h2>student's data in NLS Yola Campus</h2></strong>
      <p>
        <em>There {students.length > 1 ? 'are' : 'is'} currently {students.length} {students.length > 1 ? 'students' : 'student'} in Yola Campus </em>
      </p>
      <div className="cardsDiv">
        {students.map((student, index) => (
          <div className="card" key={index}>
            <img src={images[`${student.lastName}.png`]} alt={student.alt} />
            <div className="studentInfo">
              <strong>
                <p>
                  Name: {student.firstName} {student.lastName}
                </p>
                <p>MatNo: {student.matricNo}</p>
                <p>RegNo: {student.regNo}</p>
                <p>Hobbies: {student.hobbies.join(', ')}</p>
              </strong>
            </div>
          </div>
        ))}
      </div>
    </div>
    
  );
}

export default App;

students.map(student => (
  console.log(student.lastName)
))
