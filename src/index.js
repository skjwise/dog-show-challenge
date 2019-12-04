// document.addEventListener('DOMContentLoaded', () => {
// })
const DOG_URL = 'http://localhost:3000/dogs';
const dogTable = document.querySelector('#table-body');
const dogForm = document.querySelector('#dog-form');
let id 

const init = () => {
    fetchDogs();
}
const fetchDogs = () => {
    fetch(DOG_URL)
    .then(resp => resp.json())
    .then(dogs => renderDogs(dogs))
}
const renderDogs = dogs => {
    dogTable.innerHTML = ""
    dogs.forEach( dog => renderDog(dog))
}
const renderDog = dog => {
    const tr = document.createElement('tr')
    const dogName = document.createElement('td')
    dogName.innerText = dog.name
    const dogBreed = document.createElement('td')
    dogBreed.innerText = dog.breed
    const gender = document.createElement('td')
    gender.innerText = dog.sex
    const editBtn = document.createElement('button')
    editBtn.innerText = 'Edit Dog';
    editBtn.addEventListener('click', () => {
        editDogForm(dog)
    })
    dogTable.append(tr, dogName, dogBreed, gender, editBtn)
}
const editDogForm = dog => {
    // const nameInput = document.querySelector('#dog-name')
    // nameInput.value = dog.name
    dogForm.name.value = dog.name
    dogForm.breed.value = dog.breed
    dogForm.sex.value = dog.sex
    // const breedInput = document.querySelector('#dog-breed')
    // breedInput.value = dog.breed
    // const GenderInput = document.querySelector('#dog-sex')
    // GenderInput.value = dog.sex

    dogForm.addEventListener('submit', e => {
        e.preventDefault();
        id = dog.id
        let newDog = {
            name: dogForm.name.value,
            breed: dogForm.breed.value,
            sex: dogForm.sex.value
        }
        dogForm.reset();
        patchDog(newDog);

    })
}

const patchDog = (dog) => {
    console.log(dog)
    fetch(DOG_URL + `/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: dog.name,
            breed: dog.breed,
            sex: dog.sex
        })
    })
    .then(res => res.json())
    .then(fetchDogs)
}


//when the dog form is submitted, send a PATCH request to DOG_URL + dog.id
// {updateName: name, updateBreed: breed, updateSex: sex}


init();