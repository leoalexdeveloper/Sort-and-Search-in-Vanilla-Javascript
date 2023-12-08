
var users = []
var url = 'https://jsonplaceholder.typicode.com/users'
var fetchedUsers = []
var filtered = []

const body = document.querySelector('body')

body.innerHTML = `
<div>
<input type='text'/>
</div>
<table border=1 style='width:80%'>
<thead>
<th>
id
</th>
<th style='display:flex;flex-wrap:no-wrap;justify-content:space-around'>
username
<button onclick='sortUsername()' style='background:green;color:white;width:20%;'>Sort</button>
</th>
<th>
email
</th>
<th>
city
</th>
</thead>
<tbody>

</tbody>
</table>
`
const input = document.querySelector('input')

const getData = async (url) => {
  return await fetch(url)
    .then(result => result.json())
    .then(r => r)
}

(async function init() {
  fetchedUsers = await getData(url)
  filtered = fetchedUsers
  populate(fetchedUsers)
})()

async function sortUsername() {
  const currentSort = filtered.slice()
  filtered.sort((a, b) => a.username.toLowerCase().localeCompare(b.username.toLowerCase(), 'en', 1))
  if (currentSort[0].username !== filtered[0].username) {
    populate(filtered)
  } else {
    populate(filtered.reverse())
  }
}

function populate(data) {
  const content = document.querySelector('tbody')
  if (data.length > 0) {
    content.innerHTML = data.map(results => {
      return `
      <tr class='row' style='display:auto'>
        <td>${results.id ? results.id : 'Id not available'}</td>
        <td>${results.username}</td>
        <td>${results.email}</td>
        <td>${results.address.city}</td>
        </tr>
        `
    })
  } else {
    content.innerHTML = `
      <tr class='row' style='display:auto'>
        No results
        </tr>
        `
  }
}

input.addEventListener('input', inputSelection)

async function inputSelection() {
  filtered = await fetchedUsers.map(user => user.username.toLowerCase().indexOf(input.value.toLowerCase()))
  const temp = []
  filtered.forEach((result, index) => {
    if (result > -1) {
      temp.push(fetchedUsers[index])
    }
    filtered = temp
    populate(filtered)
  })
}