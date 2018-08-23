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
 debugger
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
      debugger
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
  show.innerHTML = ''

  let img = document.createElement('img')
  img.className = "ui fluid image"
  show.appendChild(img)
  img.src = json.img_url

  let segDiv = document.createElement('div')
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
