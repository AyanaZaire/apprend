const allCourses = 'http://localhost:3000/api/v1/courses'
const cards = document.getElementsByClassName("ui link cards")[0]


document.addEventListener('DOMContentLoaded', () => {
  // alert('LOADED')
  getCourses()
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
