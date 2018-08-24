const allCourses = 'http://localhost:3000/api/v1/courses'
const cards = document.getElementsByClassName("ui link cards")[0]
const form = document.querySelector("#course_form");


document.addEventListener('DOMContentLoaded', () => {
  // alert('LOADED')
  getCourses()
  form.addEventListener("submit", addCourse)
  categoryClickHandler()
})

function renderCourse(course) {
  let cardDiv = document.createElement('div')
  cardDiv.setAttribute("class", "card")
  cardDiv.id = `div-${course.id}`
  cards.append(cardDiv)

    let imgDiv = document.createElement('div')
    imgDiv.setAttribute("class", "image")
      let img = document.createElement('img')
      img.setAttribute("src", course.img_url)
      imgDiv.append(img)
    cardDiv.append(imgDiv)

    let contentDiv = document.createElement('div')
    contentDiv.setAttribute("class", "content")
    cardDiv.append(contentDiv)

      let headerDiv = document.createElement('div')
      headerDiv.setAttribute("class", "header")
      headerDiv.innerHTML = course.title
      contentDiv.append(headerDiv)

      let metaDiv = document.createElement('div')
      metaDiv.setAttribute("class", "meta")
      metaDiv.innerHTML = `<a>${course.category.name}</a>`
      contentDiv.append(metaDiv)

      let descDiv = document.createElement('div')
      descDiv.setAttribute("class", "description")
      descDiv.innerHTML = course.description
      contentDiv.append(descDiv)

   let extraContent = document.createElement('div')
   extraContent.setAttribute("class", "extra content")
   cardDiv.append(extraContent)
    let date = document.createElement('span')
    date.setAttribute("class", "right floated")
    date.innerText = `${course.date}`
    let location = document.createElement('span')
    location.innerHTML = `<i class="globe icon"></i> ${course.location.city}`
    extraContent.append(date)
    extraContent.append(location)

  let button = document.getElementById("all-courses")
  button.addEventListener('click', getCourses)

  cardDiv.addEventListener('click', titleClickHandler)
}

function addCourse() {
  let name = form.querySelector("#course_name").querySelector("input").value
  let desc = form.querySelector("#course_desc").querySelector("textarea").value
  let category = form.querySelector("#course_category").querySelector("select").value
  category = parseInt(category)
  let location = form.querySelector("#course_location").querySelector("select").value
  location = parseInt(location)
  let time = form.querySelector("#course_time").querySelector("input").value
  let date = form.querySelector("#course_date").querySelector("input").value

  postCourse(name, desc, time, date, category, location);
}


function postCourse(name, desc, time, date, category, location){
  fetch (`http://localhost:3000/api/v1/courses/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      title: name,
      description: desc,
      time: time,
      date: date,
      img_url: "https://vignette.wikia.nocookie.net/majorette/images/7/74/Logo-hello-kitty.jpg",
      category_id: category,
      location_id: location
    })
  })
    .then(response => {
      response.json()
    })
    .then(json => {
      console.log(json)
    })
}


function getCourses(){
  fetch(allCourses)
  .then(respsonse => respsonse.json())
  .then(json => {
    // console.log(json)
    json.forEach( course => {
      // console.log(course)
      renderCourse(course)
    })
  });
}



function titleClickHandler(event){
  // console.log(event)
  let cardDiv = event.target.parentNode.parentNode
  let id = cardDiv.id.split('-')[1]
  fetch(`http://localhost:3000/api/v1/courses/${id}`)
  .then(response => response.json())
  .then(json => {
    renderShowCourse(json)
  })
}

function renderShowCourse(json){
  let show = document.getElementById('show-panel')
  show.id = `show-${json.id}`
  show.innerHTML = ''

  let img = document.createElement('img')
  img.className = "ui fluid image"
  show.appendChild(img)
  img.src = json.img_url

  let segDiv = document.createElement('div')
  segDiv.id = 'seg-div'
  segDiv.className = "ui segments"
  show.appendChild(segDiv)

    let titleDiv = document.createElement('div')
    titleDiv.className = "ui segment"
    segDiv.appendChild(titleDiv)
    titleDiv.innerHTML = `
      <h2 class="ui header">${json.title}
      <div class="sub header">${json.category.name}</div>
      </h2>
    `

    let editButton = document.createElement('button')
    editButton.id = json.id
    editButton.className = "ui grey button"
    titleDiv.appendChild(editButton)
    editButton.innerText = 'Edit'

    editButton.addEventListener('click', editButtonClickHandler)

    let descDiv = document.createElement('div')
    descDiv.className = "ui segment"
    segDiv.appendChild(descDiv)
    descDiv.innerHTML = `
      <h3>Description:</h3>
      <p>${json.description}</p>
    `

  let horiDiv = document.createElement('div')
  horiDiv.className = "ui horizontal segments"
  segDiv.appendChild(horiDiv)

    let locDiv = document.createElement('div')
    locDiv.className = "ui segment"
    horiDiv.appendChild(locDiv)
    locDiv.innerHTML = `<i class="globe icon"></i> ${json.location.city}`

    let timeDiv = document.createElement('div')
    timeDiv.className = "ui segment"
    horiDiv.appendChild(timeDiv)
    timeDiv.innerHTML = `<i class="clock outline icon"></i> ${json.time}`

    let dateDiv = document.createElement('div')
    dateDiv.className = "ui segment"
    horiDiv.appendChild(dateDiv)
    dateDiv.innerHTML = `<i class="calendar alternate icon"></i> ${json.date}`
}

function categoryClickHandler(){
  let art = document.getElementById('art')
  let textile = document.getElementById('textile')
  let music = document.getElementById('music')
  let tech = document.getElementById('tech')
  let design = document.getElementById('design')

  art.addEventListener('click', artFilter)
  textile.addEventListener('click', textileFilter)
  music.addEventListener('click', musicFilter)
  tech.addEventListener('click', techFilter)
  design.addEventListener('click', designFilter)
}

function artFilter(event){
  if(event.target.innerText === 'Art') {
    fetch(allCourses)
    .then(respsonse => respsonse.json())
    .then(json => {
      cards.innerHTML = ''
      json.forEach( course => {
        if (course.category.name == 'Arts') {
          renderCourse(course)
        }
      })
    })
  }
}

function textileFilter(event){
  if(event.target.innerText === 'Textile') {
    fetch(allCourses)
    .then(respsonse => respsonse.json())
    .then(json => {
      cards.innerHTML = ''
      json.forEach( course => {
        if (course.category.name == 'Textile') {
          renderCourse(course)
        }
      })
    })
  }
}

function musicFilter(event){
  if(event.target.innerText === 'Music') {
    fetch(allCourses)
    .then(respsonse => respsonse.json())
    .then(json => {
      cards.innerHTML = ''
      json.forEach( course => {
        if (course.category.name == 'Music') {
          renderCourse(course)
        }
      })
    })
  }
}

function techFilter(event){
  if(event.target.innerText === 'Technology') {
    fetch(allCourses)
    .then(respsonse => respsonse.json())
    .then(json => {
      cards.innerHTML = ''
      json.forEach( course => {
        if (course.category.name == 'Technology') {
          renderCourse(course)
        }
      })
    })
  }
}

function designFilter(event){
  if(event.target.innerText === 'Design') {
    fetch(allCourses)
    .then(respsonse => respsonse.json())
    .then(json => {
      cards.innerHTML = ''
      json.forEach( course => {
        if (course.category.name == 'Design') {
          renderCourse(course)
        }
      })
    })
  }
}

function editButtonClickHandler(event){
  let id = event.target.id
  let segDiv = document.getElementById('seg-div')
  
  let title = event.target.parentNode.querySelector('h2').innerText
  debugger

    let formDiv = document.createElement('div')
    formDiv.className = "ui segment"
    segDiv.appendChild(formDiv)
    formDiv.innerHTML = `<div class=‘form’>
    <form class='ui form' id='course_form'>
             <h3>EDIT A COURSE</h3>
       <div class='field' id='course_name'>
         <input type='text' name='course-title' placeholder='Title' value = ''>
       </div>
         <div class='field' id='course_desc'>
         <textarea rows='4' placeholder='Description'></textarea>
       </div>
         <div class='field' id='course_image'>
         <input type='text' name='course-image'  placeholder='Image URL'></input>
       </div>
         <div class='fields'>
             <div class='field' id='course_category'>
                 <label name='Category'>Category</label>
                 <select name='categories'>
                     <option value='1'>Arts</option>
                     <option value='2'>Textile</option>
                     <option value='3'>Music</option>
                     <option value='4'>Technology</option>
                     <option value='5'>Design</option>
                 </select>
           </div>
             <div class='field' id='course_location'>
                 <label name='location'>Location</label>
                 <select name='location'>
                   <option value='1'>Washington, D.C.</option>
                   <option value='2'>New York</option>
                   <option value='3'>Miami</option>
                 </select>
             </div>
         </div>
         <div class='fields'>
             <div class='field' id='course_time'>
                 <label name='time'>Time</label>
                 <input type='time' name='time' placeholder='Time'>
             </div>
             <div class='field' id='course_date'>
                 <label name='date'>Date</label>
             <input type='date' name='date'>
             </div>
         </div>
       <button id='submit_button' class='ui grey button' type='submit'>Submit</button>
     </form>
     </div>`

  // let form = document.getElementById('course_form')
  let title = form.querySelector("#course_name").querySelector("input").value
  let desc = form.querySelector("#course_desc").querySelector("textarea").value
  let category = form.querySelector("#course_category").querySelector("select").value
  category = parseInt(category)
  let location = form.querySelector("#course_location").querySelector("select").value
  location = parseInt(location)
  let time = form.querySelector("#course_time").querySelector("input").value
  let date = form.querySelector("#course_date").querySelector("input").value

  let submit = document.getElementById('submit-button')
  submit.addEventListener('submit', patchFetch)

  patchFetch(id, title, desc, category, location, time, date)
}

function patchFetch(id, title, desc, category, location, time, date){
  fetch(`http://localhost:3000/api/v1/courses/${id}`, {
    method: 'PATCH',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      title: title,
      description: desc,
      category_id: category,
      location_id: location,
      time: time,
      date: date
    })
  })
  .then(response => response.json())
  .then(json => {
    console.log(json)
  })
}
