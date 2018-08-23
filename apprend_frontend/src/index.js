const allCourses = 'http://localhost:3000/api/v1/courses'
const cards = document.getElementsByClassName("ui link cards")[0]
const form = document.querySelector("#course_form");


document.addEventListener('DOMContentLoaded', () => {
  // alert('LOADED')
  getCourses()
  form.addEventListener("submit", addCourse)

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
    location.innerText = course.location.city
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
  // let course = {
  //   "title": name,
  //   "description": desc,
  //   "time": time,
  //   "date": date,
  //   "category_id": parseInt(category),
  //   "location_id": parseInt(location)
  // }

  postCourse(name, desc, time, date, category, location);
}


function postCourse(name, desc, time, date, category, location){
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
      img_url: "https://vignette.wikia.nocookie.net/majorette/images/7/74/Logo-hello-kitty.jpg",
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
  let id = event.target.id.split('-')[1]
  fetch(`http://localhost:3000/api/v1/courses/${id}`)
  .then(response => response.json())
  .then(json => {
    renderShowCourse(json)
  })
}

function renderShowCourse(json){
  let show = document.getElementById('show-panel')
  show.innerHTML = ''
  let h2 = document.createElement('h2')
  let img = document.createElement('img')
  let p = document.createElement('p')
  let locationH3 = document.createElement('h3')
  let categoryH3 = document.createElement('h3')
  let locationUl = document.createElement('ul')
  let categoryUl = document.createElement('ul')
  // let li = document.createElement('li')
  // let button = document.createElement('button')
  // button.id = `${json.id}`

  show.appendChild(h2)
  show.appendChild(img)
  show.appendChild(p)
  show.appendChild(locationH3)
  show.appendChild(locationUl)
  show.appendChild(categoryH3)
  show.appendChild(categoryUl)
  // ul.appendChild(li)
  // show.appendChild(button)

  h2.innerHTML = json.title
  img.src = json.img_url
  p.innerHTML = json.description
  locationH3.innerHTML = 'Location:'
  locationUl.innerHTML = `<li>${json.location.city}</li>`
  categoryH3.innerHTML = 'Category:'
  categoryUl.innerHTML += `<li>${json.category.name}</li>`
}
