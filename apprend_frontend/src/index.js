const allCourses = 'http://localhost:3000/api/v1/courses'
const cards = document.getElementsByClassName("ui link cards")[0]
const form = document.querySelector("#course_form");
const searchButton = document.querySelector("#search")


document.addEventListener('DOMContentLoaded', () => {
  // alert('LOADED')
  getCourses()
  form.addEventListener("submit", addCourse)
  searchButton.addEventListener("click", searchCourse)
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
  let img_url = form.querySelector("#course_image").querySelector("input").value
  postCourse(name, desc, time, date, img_url, category, location);
}


function postCourse(name, desc, time, date, img_url, category, location){
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
      img_url: img_url,
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
  event.preventDefault()
  let cardDiv = event.target.parentNode.parentNode
  let id = cardDiv.id.split('-')[1]
  fetch(`http://localhost:3000/api/v1/courses/${id}`)
  .then(response => response.json())
  .then(json => {
    renderShowCourse(json)
  })
}

function renderShowCourse(json){
  let show = document.querySelector('.show')
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

  let deleteButton = document.createElement('button')
  deleteButton.className = "ui grey button"
  deleteButton.innerText = "Delete"
  deleteButton.setAttribute("data-id", json.id)
  deleteButton.addEventListener('click', deleteCourse)
  titleDiv.append(deleteButton)

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
  horiDiv.id = 'horiDiv'
  horiDiv.className = "ui horizontal segments"
  segDiv.appendChild(horiDiv)

    let locDiv = document.createElement('div')
    locDiv.id = "loc"
    locDiv.className = "ui segment"
    horiDiv.appendChild(locDiv)
    locDiv.innerHTML = `<i class="globe icon"></i> ${json.location.city}`

    let timeDiv = document.createElement('div')
    timeDiv.id = "time"
    timeDiv.className = "ui segment"
    horiDiv.appendChild(timeDiv)
    timeDiv.innerHTML = `<i class="clock outline icon"></i> ${json.time}`

    let dateDiv = document.createElement('div')
    dateDiv.id = "date"
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


function deleteCourse(event) {
  event.preventDefault()
  let courseId = event.target.getAttribute("data-id")
  let course = document.querySelector(`#div-${courseId}`)
  course.innerHTML = ""
  document.querySelector(".show").innerHTML = ""

  fetch (`http://localhost:3000/api/v1/courses/${courseId}`, {
    method: "DELETE"
  })
}


function searchCourse(event) {
  event.preventDefault()
  let bodyDiv = document.querySelector(".body")
  let searchDiv = document.querySelector(".search")
  searchDiv.innerHTML = `
    <form class="ui form", id="search_form">
      <div class="field" id="course_title">
        <input type="text" name="course-name" placeholder="Search by Course Title...">
      </div>
        <button class="ui grey button" type="submit">Search</button>
    </form>
  `
  let searchForm = document.querySelector("#search_form")
  let searchFormButton = searchForm.addEventListener('submit', renderSearchResults)

}

function renderSearchResults(event) {
  event.preventDefault()
  let searchKeyWord = document.querySelector("#course_title").querySelector("input").value
  let courseCards = document.getElementsByClassName("ui link cards")[0]
  fetch (`http://localhost:3000/api/v1/courses/`)
    .then(response => response.json())
    .then(json => {
      json.forEach(course => {
        if (searchKeyWord === course.title) {
          debugger
          courseCards.innerHTML = ""
          document.querySelector(".show").innerHTML = ""
          renderCourse(course)
        } else {
          document.querySelector(".show").innerHTML = ""
          courseCards.innerHTML = ""
        }
      })
    })
}


function editButtonClickHandler(event){
  let id = event.target.id
  let segDiv = document.getElementById('seg-div')

    let formDiv = document.createElement('div')
    formDiv.className = "ui segment"
    segDiv.appendChild(formDiv)
    formDiv.innerHTML = `
    <form class='ui form' id='edit-course-form'>
             <h3>EDIT A COURSE</h3>
       <div class='field' id='edit-course-name'>
         <input id='course-title' type='text' name='course-title' placeholder='Title' >
       </div>
         <div class='field' id='edit-course-desc'>
         <textarea id='course-desc' rows='4' placeholder='Description'></textarea>
       </div>
         <div class='fields'>
             <div class='field' id='edit-course-cat'>
                 <label name='Category'>Category</label>
                 <select id='course-cat' name='categories'>
                     <option value='1'>Arts</option>
                     <option value='2'>Textile</option>
                     <option value='3'>Music</option>
                     <option value='4'>Technology</option>
                     <option value='5'>Design</option>
                 </select>
           </div>
             <div class='field' id='edit-course-loc'>
                 <label name='location'>Location</label>
                 <select id='course-cat' name='location'>
                   <option value='1'>Washington, D.C.</option>
                   <option value='2'>New York</option>
                   <option value='3'>Miami</option>
                 </select>
             </div>
         </div>
         <div class='fields'>
             <div class='field' id='edit-course-time'>
                 <label name='time'>Time</label>
                 <input id='course-time' type='time' name='time' placeholder='Time'>
             </div>
             <div class='field' id='edit-course-date'>
                 <label name='date'>Date</label>
             <input id='course-date' type='date' name='date'>
             </div>
         </div>
       <button id='edit-submit-button' class='ui grey button' type='submit'>Submit</button>
     </form>`

  // let courseTitle = event.target.parentNode.querySelector('h2').innerText
  let courseDesc = event.target.parentNode.parentNode.querySelector('p').innerText
  // let courseLoc = event.target.parentNode.parentNode.querySelector('#horiDiv').querySelector('#loc').innerText
  // let courseTime = event.target.parentNode.parentNode.querySelector('#horiDiv').querySelector('#time').innerText
  // let courseDate = event.target.parentNode.parentNode.querySelector('#horiDiv').querySelector('#date').innerText

  // document.querySelector('#edit-course-name').querySelector('#course-title').value = courseTitle
  document.querySelector('#edit-course-desc').querySelector('#course-desc').value = courseDesc

  let courseForm = document.querySelector('#edit-course-form')
  courseForm.addEventListener('submit', updateHandler)
}

function updateHandler(event){
  event.preventDefault()
  let id = event.target.parentNode.parentNode.parentNode.id.split('-')[1]
  let courseForm = document.querySelector('#edit-course-form')
  let title = courseForm.querySelector("#edit-course-name").querySelector("input").value
  let desc = courseForm.querySelector("#edit-course-desc").querySelector("textarea").value
  let category = courseForm.querySelector('#edit-course-cat').querySelector("select").value
  category = parseInt(category)
  let location = courseForm.querySelector('#edit-course-loc').querySelector("select").value
  location = parseInt(location)
  let time = courseForm.querySelector("#edit-course-time").querySelector("input").value
  let date = courseForm.querySelector("#edit-course-date").querySelector("input").value
// debugger

  // let courseId = event.target.getAttribute("data-id")
  let course = document.querySelector(`#div-${id}`)
  course.innerHTML = ""
  document.querySelector(".show").innerHTML = ""

  patchFetch(id, title, desc, category, location, time, date)
}

function patchFetch(id, title, desc, category, location, time, date){
  // debugger
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
    // console.log(json)
    renderCourse(json)
  })
}
