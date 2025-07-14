import { students, users, saveToStorage, getFromStorage } from "./studentData.js";
/// students representation data

function studentsData() {
    const body = document.querySelector('body')
    const div1 = document.createElement('div')
    const sentence = document.createElement('p')
    const sentence1 = document.createElement('p')

    body.appendChild(sentence)
    body.appendChild(sentence1)
    body.appendChild(div1)
        // body.appendChild(div2)

    sentence.innerHTML = `NIGER DELTA  UNIVERSITY <br>Faculty of Law <br>students' data in NLS Yola Campus`
    sentence1.innerHTML = `<em>There ${students.length >= 2 ?'are' : 'is' } currently ${students.length} ${students.length >= 2 ? 'students': 'student'}</em>`

    //// this code displays the data
    students.forEach((student, i) => {
        const hobbies = student.hobbies.join(', ')
        const div = document.createElement('div')
        const img = document.createElement('img')
        div1.appendChild(div)
        div.appendChild(img)
        // --- FIXED HOVER LOGIC ---
        const info = document.createElement('div');
        info.style.display = 'none';
        div.appendChild(info);
        div.style.transition = 'background 1s ease, transform 1s ease';
        img.src = `./images/${student.lastName}.png`

        img.addEventListener('mouseover', () => {
          info.innerHTML = `<p><strong>Name: ${student.lastName.toUpperCase() + ' ' + student.firstName.toUpperCase()}</strong></p> <p><strong>Matric No.: ${student.matricNo}</strong></p> <p><strong>RegNo: ${student.regNo.toUpperCase()}</strong></p> <p><strong>Hobbies: ${hobbies}</strong></p>`;
          info.style.display = 'block';
          div.style.transform = 'scale(1.02)';
          div.style.background = '#7CC3E3'
          info.style.fontSize = '15px'
        });

        img.addEventListener('mouseout', () => {
          info.style.display = 'none';
          div.style.transform = 'scale(1)';
          div.style.background = ''
        })
        

        img.style.maxWidth = '250px'
        img.style.maxHeight = '150px'
        img.style.borderRadius = '50%'
        img.style.padding = '10px'

        div.style.textAlign ='center'
        })
        ///// styles
    body.style.padding = '0';
    body.style.margin = '0';
    body.style.fontFamily = "'Trebuchet MS', verdana, Arial, Tahoma, 'Times New Roman', Georgia, Garamond, 'Courier New'";
    // body.style.boxSizing = 'border-box';
    // body.style.maxWidth = '100%';
    // body.style.overflowX = 'hidden';
    // body.style.fontWeight = 'normal';
    body.style.backgroundImage = "url('./images/NDU Logo.png')"
    body.style.backgroundRepeat = 'no-repeat'
    // body.style.backgroundSize = '100%';
    body.style.backgroundColor = 'transparent'
    body.style.backgroundPosition = 'center';
    body.style.backgroundAttachment = 'stretch'

    div1.style.display = 'grid'
    div1.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))'
    div1.style.gap = '5px'
    div1.style.backgroundColor = '#f4f4f4'
    div1.style.opacity = '0.9'
    div1.style.padding = '20px'
        // div1.style.margin = '20px'

    sentence.style.fontSize = '50px'
    sentence.style.textAlign = 'center'
    sentence.style.fontFamily = '"Times New Roman ", Georgia, "Courier New " '

    sentence1.style.textAlign = 'center'
    sentence1.style.color = 'orange'

    const pics = document.querySelectorAll('.studentPic')
    pics.forEach(p => {
        p.style.maxWidth = '200px'
        p.style.maxHeight = '150px'
        p.style.borderRadius = '50%'
        p.style.border = '1px solid black'
    })
}

studentsData()

function signIn () {
    const body = document.querySelector('body')
    const inputsContainmentDiv = document.createElement('div')

    body.appendChild(inputsContainmentDiv)

    inputsContainmentDiv.innerHTML = `<h1>USER LOGIN</h1>👤Username/PhoneNo/Email<p> <input type="text" placeholder = "input your username/PhoneNo/email" class = "inputs width" required id = 'input1'></p> 🔑Password <div> <input type="password" placeholder = "input your Password" class = "inputs width" required id = 'input2'></div>  <p>show Password <i class="fa-solid fa-eye"></i></p><button class = "button width">SIGN IN</button></p> <button class = "signUp width">SIGN UP</button>`

    ///javascript functionality

    const submitButton = document.querySelector('.button')
    submitButton.addEventListener('click', async () => {
  const userName = document.querySelector('#input1').value;
  const password = document.querySelector('#input2').value;

  if (!userName || !password) {
    alert('Please fill in all fields');
    return;
  }

  try {
    const response = await fetch('http://localhost:3001/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName, password })
    });
    const data = await response.json();
    if (data.success) {
      alert('Welcome ' + `${data.user.firstName} ` + `${data.user.lastName}`);
      window.location.href = `http://localhost:3001/profile/${data.user.userName}`;
    } else {
      alert(data.message);
    }
  } catch (err) {
    alert('Could not connect to server.');
  }
});

    let isClicked = false
    document.querySelector('.fa-eye').addEventListener('click', (event) => {
      isClicked = !isClicked
      const eye = event.target
      const passwordInput = document.querySelector('#input2')
      if(isClicked && eye.className === 'fa-solid fa-eye'){
        passwordInput.type = 'text'
        eye.className = 'fa-solid fa-eye-slash'
      } else {
        passwordInput.type = 'password'
        eye.className = 'fa-solid fa-eye'
      }
    });

    document.querySelector('.signUp').addEventListener('click', () => {
      window.location.href = 'http://localhost:3001/signup';
    });

    ///styles
    body.style.padding = '0';
    body.style.margin = '0';
    body.style.fontFamily = "'Trebuchet MS', verdana, Arial, Tahoma, 'Times New Roman', Georgia, Garamond, 'Courier New'"
    body.style.background = 'linear-gradient(135deg, #7CC3E3, #203a43, #2c5364)'
    body.style.display = 'flex'
    body.style.flexDirection = 'column'
    body.style.alignItems = 'center'
    
    
    document.querySelectorAll('.fa-eye').forEach(eye => {
      eye.style.cursor = 'pointer';
    });
   

    // inputsContainmentDiv.style.backgroundColor = 'yellow'
    inputsContainmentDiv.style.textAlign = 'center'
    inputsContainmentDiv.style.fontFamily = "'Trebuchet MS', verdana, Arial, Tahoma, 'Times New Roman', Georgia, Garamond, 'Courier New'"
    inputsContainmentDiv.style.padding = '100px'
    inputsContainmentDiv.style.backgroundColor = 'white'
    inputsContainmentDiv.style.margin = '50px'
    inputsContainmentDiv.style.borderRadius = '30px'
    inputsContainmentDiv.style.maxWidth = '100%'
    

    /// this style is for the signIn sentence container

    // document.querySelector('.signInButton').style.textAlign = 'right'
    // document.querySelector('.signInButton').style.paddingLeft = '190px'
    // document.querySelector('.signInButton').style.fontFamily = "'Trebuchet MS', verdana, Arial, Tahoma, 'Times New Roman', Georgia, Garamond, 'Courier New'"

    /// this is for the button itself
    document.querySelector('.button').style.padding = '5px 10px 5px 10px'
    document.querySelector('.button').style.borderRadius = '10px'
    document.querySelector('.button').style.border = '1px white solid'
    document.querySelector('.button').style.backgroundColor = '#7CC3E3'

    ///this style is for uniform width
    document.querySelectorAll('.width').forEach(item => {
        // item.style.minWidth = '50%'
        item.style.width = '100%'
        // item.style.borderRadius = '10px'
        item.style.height = '30px'
        item.style.fontFamily = "'Trebuchet MS', verdana, Arial, Tahoma, 'Times New Roman', Georgia, Garamond, 'Courier New'"
        item.style.padding = '5px 10px 5px 10px'
        // item.style.textAlign = 'center'
        item.style.outline = 'none'
        item.style.border = 'none'
        item.style.borderBottom = '1.5px black solid'
        document.querySelector('.button').style.border = 'none'
    })

    /// style for signUp button
    document.querySelector('.signUp').style.border = 'none'
    document.querySelector('.signUp').style.backgroundColor = 'green'
    document.querySelector('.signUp').style.color = 'white'
    document.querySelector('.signUp').style.borderRadius = '10px'
console.log(users)


}

// signIn()

