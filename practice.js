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
    students.forEach(student => {
        const hobbies = student.hobbies.join(', ')
        const div = document.createElement('div')
        div.style.fontSize = '15px'
        div.style.transition = 'background-color 1s ease, transform 1s ease'

        div.addEventListener('mouseout', () => {
            div.innerHTML = `<img class = 'studentPic' src = images/${student.lastName}.png>`
            const pics = document.querySelectorAll('.studentPic')
            pics.forEach(p => {
                p.style.maxWidth = '200px'
                p.style.maxHeight = '150px'
                p.style.borderRadius = '50%'
                p.style.border = '1px solid black'
            })
            div.style.backgroundColor = ''
            div.style.transform = 'scale(1)'; // Reset scale on mouse out

        })

        div.addEventListener('mouseover', () => {
            div.innerHTML = `<img class = 'studentPic' src = images/${student.lastName}.png> <p><strong>Name: ${student.lastName.toUpperCase() + ' ' + student.firstName.toUpperCase()}</strong></p> <p><strong>Matric No.: ${student.matricNo}</strong></p> <p><strong>RegNo: ${student.regNo.toUpperCase()}</strong></p> <p><strong>Hobbies: ${hobbies}</strong></p>`

            const pics = document.querySelectorAll('.studentPic')
            pics.forEach(p => {
                p.style.maxWidth = '200px'
                p.style.maxHeight = '150px'
                p.style.borderRadius = '50%'
                p.style.border = '1px solid black'
            })
            div.style.backgroundColor = '#7CC3E3'
            div.style.transform = 'scale(1.02)'; // Scale up on mouse over
        })

        div.innerHTML = `<img class = 'studentPic' src = images/${student.lastName}.png>`
        div1.appendChild(div)
        div.style.textAlign = 'center'
        div.style.padding = '20px'
            // div.style.border = '1px solid black'


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
    body.style.backgroundSize = 'cover';
    body.style.backgroundColor = 'transparent'
    body.style.backgroundPosition = 'center';

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

// studentsData()

function signIn () {
    const body = document.querySelector('body')
    const inputsContainmentDiv = document.createElement('div')

    body.appendChild(inputsContainmentDiv)

    inputsContainmentDiv.innerHTML = `<h1>USER LOGIN</h1>👤Username<p> <input type="text" placeholder = "input your username/PhoneNo/email" class = "inputs width" required id = 'input1'></p> 🔑Password <div> <input type="password" placeholder = "input your Password" class = "inputs width" required id = 'input2'></div>  <p>show Password <i class="fa-solid fa-eye"></i></p><button class = "button width">SIGN IN</button></p> <button class = "signUp width">SIGN UP</button>`

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
      alert('Welcome ' + `${data.user.lastName} ` + `${data.user.firstName}`);
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
        body.innerHTML = ''
        inputsContainmentDiv.innerHTML = ''
        const details = ['First Name', 'Last Name', '📧Email', '🔑Password', '📞Telephone', '👤Username']
  const header = document.createElement('h1')
  const submitButtonDiv = document.createElement('div')
  const submitButton = document.createElement('p')
  
  let activeIntervalId


  details.forEach((item, index) => {
    const detail = document.createElement('p')
    const inputElement = document.createElement('input')
    const statusSentence = document.createElement('p')
    const containerDiv =  document.createElement('div')


    body.appendChild(inputsContainmentDiv)
    inputsContainmentDiv.appendChild(containerDiv)
    containerDiv.appendChild(detail)
    containerDiv.appendChild(inputElement)
    containerDiv.appendChild(statusSentence)
    
    statusSentence.classList.add(`statusMessage${index}`)
    inputElement.classList.add(`input${index}`)
    detail.innerHTML = `<strong>${item}</strong>`
    // statusSentence.innerHTML = index

    containerDiv.classList.add('containerDiv')
    if(index === 3) containerDiv.classList.add('password')
    // if(index === 3) containerDiv.style.textAlign = 'center'
    detail.classList.add('detail')

    statusSentence.style.fontSize = '12px'
    statusSentence.style.textAlign = 'center'

  })

  document.querySelector('.password').innerHTML += 'check Password <img src="./images/eye-solid.svg" style="width: 5.5%;">'
  let isClicked = false;
  // Add event listener to the eye icon inside the .password container
  const passwordContainer = document.querySelector('.password');
  const eyeIcon = passwordContainer.querySelector('img');
  const passwordInput = document.querySelector('.input3');

  eyeIcon.style.cursor = 'pointer';

  eyeIcon.addEventListener('click', () => {
    isClicked = !isClicked;
    if (isClicked) {
      passwordInput.type = 'text';
      eyeIcon.src = './images/eye-slash-solid.svg'; // Use an eye-slash icon for visibility off
    } else {
      passwordInput.type = 'password';
      eyeIcon.src = './images/eye-solid.svg'; // Use the eye icon for visibility on
    }
    
  });
  eyeIcon.style.marginTop = '15px'

  document.querySelector('.input0').addEventListener('input', (event) => {
    const statusMessage = document.querySelector('.statusMessage0')

    clearInterval(activeIntervalId)
    activeIntervalId = setInterval(() => {
      statusMessage.innerHTML = ''
      const inputValue = document.querySelector('.input0').value;
      const alphaNumericPattern = /^[a-zA-Z]+$/
      event.target.style.fontWeight = "bold"
      if (inputValue.length >= 3 && inputValue.length <= 16 && alphaNumericPattern.test(inputValue)) {
        document.querySelector('.input0').style.outlineColor = "green"
        document.querySelector('.input0').style.border = '2px solid green'
      } else {
        statusMessage.innerHTML = "First name must be alphanumeric and at least 3-16 characters long"
        statusMessage.style.color = "#F4B962"
        statusMessage.style.textAlign = 'left'
        document.querySelector('.input0').style.border = '2px solid red';
         document.querySelector('.input0').style.outlineColor = "red";
      }
    }, 1000);
  })

  document.querySelector('.input1').addEventListener('input', (event) => {
    const statusMessage = document.querySelector('.statusMessage1')

    clearInterval(activeIntervalId)
    activeIntervalId = setInterval(() => {
    event.target.style.fontWeight = "bold"
      statusMessage.innerHTML = ''
      const inputValue = document.querySelector('.input1').value;
      const alphaNumericPattern = /^[a-zA-Z]+$/;
      if (inputValue.length >= 3 && inputValue.length <= 16 && alphaNumericPattern.test(inputValue)) {
        document.querySelector('.input1').style.outlineColor = "green";
        document.querySelector('.input1').style.border = '2px solid green'
      } else {
        statusMessage.innerHTML = "Last name must be alphanumeric and at least 3-16 characters long";
        statusMessage.style.color = "#F4B962";
        document.querySelector('.input1').style.border = '2px solid red';
         document.querySelector('.input1').style.outlineColor = "red";
      }
    }, 1000);
  })

  document.querySelector('.input2').addEventListener('input', (event) => {
    const statusMessage = document.querySelector('.statusMessage2')

    clearInterval(activeIntervalId)
    activeIntervalId = setInterval(() => {
      event.target.style.fontWeight = "bold"
      statusMessage.innerHTML = ''
      const inputValue = document.querySelector('.input2').value;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailPattern.test(inputValue)) {
        document.querySelector('.input2').style.outlineColor = "green";
        document.querySelector('.input2').style.border = '2px solid green'
      } else {
        statusMessage.innerHTML = "Email must be a valid address eg: example@email.com";
        statusMessage.style.color = "#F4B962";
        document.querySelector('.input2').style.border = '2px solid red';
         document.querySelector('.input2').style.outlineColor = "red";
      }
    }, 1000);
  })

  document.querySelector('.input3').addEventListener('input', (event) => {
    const statusMessage = document.querySelector('.statusMessage3');

    clearInterval(activeIntervalId);
    activeIntervalId = setInterval(() => {
      event.target.style.fontWeight = "bold"
      statusMessage.innerHTML = '';
      const inputValue = document.querySelector('.input3').value;
      const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,19}$/; // Minimum 6 characters, maximum 19, at least one letter and one number
      if (passwordPattern.test(inputValue)) {
        document.querySelector('.input3').style.outlineColor = "green";
        document.querySelector('.input3').style.border = '2px solid green';
      } else {
        statusMessage.innerHTML = "Password must be at least 6 characters long and include at least one letter and one number";
        statusMessage.style.color = "#F4B962";
         document.querySelector('.input3').style.border = '2px solid red';
         document.querySelector('.input3').style.outlineColor = 'red';
      }
    }, 1000);
  });
  document.querySelector('.input3').type = 'password';

  document.querySelector('.input4').addEventListener('input', (event) => {
    const statusMessage = document.querySelector('.statusMessage4');

    clearInterval(activeIntervalId);
    activeIntervalId = setInterval(() => {
      event.target.style.fontWeight = "bold"
      statusMessage.innerHTML = '';
      const inputValue = document.querySelector('.input4').value;
      const phoneNumberPattern = /^\+\d{1,3}\s?\d{10}$|^\d{10}$|^\d{3}-\d{3}-\d{4}$|^0\d{10}$/
      if (phoneNumberPattern.test(inputValue)) {
      document.querySelector('.input4').style.outlineColor = "green";
      document.querySelector('.input4').style.border = '2px solid green';
      } else {
      statusMessage.innerHTML = "A valid Telephone Number (e.g., +123 3333333333, 333-333-3334, or 3333333333)";
      statusMessage.style.color = "#F4B962";
      document.querySelector('.input4').style.border = '2px solid red';
         document.querySelector('.input4').style.outlineColor = "red";
      }
    }, 1000);
  })

  document.querySelector('.input5').addEventListener('input', () => {
    const statusMessage = document.querySelector('.statusMessage5');

    clearInterval(activeIntervalId);
    activeIntervalId = setInterval(() => {
      statusMessage.innerHTML = '';
      const inputValue = document.querySelector('.input5').value
      const bioPattern = /^[a-zA-Z_!@#$%^&*()\-+=\s]{6,50}$/
      if (bioPattern.test(inputValue)) {
        document.querySelector('.input5').style.outlineColor = "green"
        document.querySelector('.input5').style.border = '2px solid green'
      } else {
        statusMessage.innerHTML = "Username must be 6 - 50 characters"
        statusMessage.style.color = "#F4B962"
        document.querySelector('.input5').style.border = '2px solid red';
         document.querySelector('.input5').style.outlineColor = "red";
      }
    }, 1000)
  })

  /// styles

  document.querySelectorAll('.containerDiv').forEach(div => {
    div.style.textAlign = 'center';
    div.style.width = '100%';
    div.style.margin = '0 auto';
    div.style.maxWidth = '500px'; // Responsive max width for container
    div.style.minWidth = '250px';
    div.style.boxSizing = 'border-box';
});

document.querySelectorAll('input').forEach(input => {
    input.style.width = '70%'; // Responsive: fill parent container
    input.style.boxSizing = 'border-box';
    input.style.outlineColor = '#F4F4F4';
    input.style.border = '1px solid black';
    input.required = 'true';
    input.style.fontFamily = "'Trebuchet MS', verdana, Arial, Tahoma,  'Times New Roman', Georgia, Garamond, 'Courier New'";
    input.style.height = '30px';
    input.style.padding = '5px 10px 5px 10px';
    input.style.outline = 'none';
    input.style.border = 'none';
    input.style.borderBottom = '1.5px black solid';
});

  document.querySelectorAll('.detail').forEach(detail => {
    // detail.style.textAlign = 'left'
  })
  
  inputsContainmentDiv.style.textAlign = 'center'
  inputsContainmentDiv.style.fontFamily = "'Trebuchet MS', verdana, Arial, Tahoma, 'Times New Roman', Georgia, Garamond, 'Courier New'"
  inputsContainmentDiv.style.padding = '100px'
  inputsContainmentDiv.style.backgroundColor = 'white'
  inputsContainmentDiv.style.margin = '50px'
  inputsContainmentDiv.style.borderRadius = '30px'
  inputsContainmentDiv.style.maxWidth = '50%'
  header.style.textAlign = 'center'

  document.querySelectorAll('input').forEach(input => {
    input.style.outlineColor = '#F4F4F4'
    // input.style.borderRadius = '5px'
    input.style.border = '1px solid black'
    input.required = 'true'
    input.style.fontFamily = "'Trebuchet MS', verdana, Arial, Tahoma,  'Times New Roman', Georgia, Garamond, 'Courier New'"
    input.style.minWidth = '50%'
    input.style.maxWidth = '100%'
    // item.style.borderRadius = '10px'
    input.style.height = '30px'
    input.style.fontFamily = "'Trebuchet MS', verdana, Arial, Tahoma, 'Times New Roman', Georgia, Garamond, 'Courier New'"
    input.style.padding = '5px 10px 5px 10px'
    // item.style.textAlign = 'center'
    input.style.outline = 'none'
    input.style.border = 'none'
    input.style.borderBottom = '1.5px black solid'
  })
  inputsContainmentDiv.appendChild(submitButtonDiv)
  submitButtonDiv.appendChild(submitButton)
  
  submitButtonDiv.style.width = '100%';
  submitButtonDiv.style.margin = '0 auto';
  submitButtonDiv.style.textAlign = 'center'
  // submitButtonDiv.style.backgroundColor = 'red'
  submitButton.style.textAlign = 'center'
  submitButtonDiv.style.width = '400px'
  submitButtonDiv.style.maxWidth = '100%'
  
  submitButton.innerHTML = `<button class = 'innerButton'>SIGN UP</button>`
  document.querySelector('.innerButton').style.minWidth = '50%'
  document.querySelector('.innerButton').style.maxWidth = '100%'
  document.querySelector('.innerButton').style.height = '40px'
  document.querySelector('.innerButton').style.maxHeight = '70px'
  document.querySelector('.innerButton').style.color = 'white'
  document.querySelector('.innerButton').style.textAlign = 'center'
  document.querySelector('.innerButton').style.fontFamily = `${body.style.fontFamily}`
  document.querySelector('.innerButton').style.backgroundColor = 'green'
  document.querySelector('.innerButton').style.border = 'none'
  document.querySelector('.innerButton').style.borderRadius = '5px'
  document.querySelector('.innerButton').style.cursor = 'pointer'
  document.querySelector('.innerButton').title = 'Click to Sign up'

  document.querySelector('.innerButton').addEventListener('click', async () => {
  const inputs = document.querySelectorAll('input');
  let allValid = true;
  const firstName = document.querySelector('.input0').value;
  const lastName = document.querySelector('.input1').value;
  const email = document.querySelector('.input2').value;
  const passWord = document.querySelector('.input3').value;
  const phoneNo = document.querySelector('.input4').value;
  const userName = document.querySelector('.input5').value;

  let existingUserName = false;
  let usedEmail = false;
  let usedPhoneNo = false;

  // Fetch users from users.json (backend endpoint)
  let usersList = [];
  // Check for empty fields before fetching users
  // if (!firstName || !lastName || !email || !passWord || !phoneNo || !userName) {
  //   alert('Please fill in all fields');
  //   allValid = false;
  //   return;
  // }
  try {
    const res = await fetch('http://localhost:3001/users');
    usersList = await res.json();
  } catch (err) {
    alert('Error fetching users: ' + err.message);
  }

  usersList.forEach(user => {
    if (user.userName.toLowerCase() === userName.toLowerCase()) {
      existingUserName = true;
    }
    if (user.email.toLowerCase() === email.toLowerCase()) {
      usedEmail = true;
    }
    if (user.phoneNo === phoneNo) usedPhoneNo = true;
  });

  inputs.forEach(input => {
    if (input.style.border !== '2px solid green') {
      allValid = false;
    }
  });

  if (allValid && !existingUserName && !usedEmail) {
    // --- CHANGED: Send data to backend instead of local storage ---
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          userName,
          passWord,
          email,
          phoneNo
        })
      });

      if (response.status === 400 || response.status === 409) {
        const data = await response.json();
        alert(data.message); // Show the backend error message
        return;
      }

      const data = await response.json();
      if (data.success) {
        alert('Account created successfully!');
        inputs.forEach(item => {
          item.value = '';
          item.style.border = 'none';
          item.style.borderBottom = '1px solid black';
          clearInterval(activeIntervalId);
        });
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Could not connect to server.');
    }
    // --- END CHANGED ---
  } else {
    // Let the backend handle and return the conflict messages
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          userName,
          passWord,
          email,
          phoneNo
        })
      });
      const data = await response.json();
      alert(data.message);
    } catch (err) {
      alert('Could not connect to server.');
    }
  }
});

    })

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

signIn()

