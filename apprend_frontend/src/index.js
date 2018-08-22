const allCourses = 'http://localhost:3000/api/v1/courses'


document.addEventListener('DOMContentLoaded', () => {
  // alert('LOADED')
  getCourses()
})

function renderCourse(course) {
  let ul = document.getElementById('list')
  let li = document.createElement('li')
  li.id = `li-${course.id}`

  ul.appendChild(li)

  li.innerText = course.title

  li.addEventListener('click', titleClickHandler)
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
