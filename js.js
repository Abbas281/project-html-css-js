let tbody=document.querySelector('.tbody')
let close=document.querySelector('.close')
let deletemodal=document.querySelector('.delete')
deletemodal.style.color='red'

let  formedit=document.querySelector('.formedit')
let formadd=document.querySelector('.formadd')
let tbodyadd=document.querySelector('.tbodyadd')


// modalka for readmi open
var modalopen = document.getElementById("myModalopen");
var spanopen = document.querySelector(".closeopen");
spanopen.onclick = function() {
  modalopen.style.display = "none";
}

// modalka for Add
var modaladd = document.getElementById("myModaladd");
var spanadd = document.querySelector(".closeadd");
spanadd.onclick = function() {
  modaladd.style.display = "none";
}

// modalka for edit
var modaledit = document.getElementById("myModaledit");
var spanedit = document.querySelector(".closeedit");
spanedit.onclick = function() {
  modaledit.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modaledit || event.target == modaldelete || event.target == modaladd || event.target == modalopen) {
    modaledit.style.display = "none",
    modaldelete.style.display = "none",
    modaladd.style.display = "none",
    modalopen.style.display = "none"
  }
}

// modalka for delete
var modaldelete = document.getElementById("myModaldelete");
let spandelete = document.querySelector(".closedelete");
close.onclick=()=>{
    modaldelete.style.display = "none";
}



// add submit
formadd.onsubmit=(e)=>{
    e.preventDefault()
    let newUser={
        name:e.target['nameadd'].value,
        surname:e.target['surnameadd'].value,
        age:e.target['ageadd'].value,
        phone:e.target['phoneadd'].value,
        course:e.target['courseadd'].value,
    }
    addUsers(newUser)
    modaladd.style.display = "none";
}
// add functions
const addUsers=async(newUser)=>{
    try {
        const {data} = await axios.post('https://640943f5d16b1f3ed6cdf00b.mockapi.io/Users',newUser)
    getData()
    } catch (error) {
        
    }
}




// edit functions
const editUser=async(id,user)=>{
    try {
        const {data}=await axios.put(`https://640943f5d16b1f3ed6cdf00b.mockapi.io/Users/${id}`,user)
    getData()
    } catch (error) {
        
    }
}



// delete functions
const deleteUser = async (id) => {
    try {
        const {data} = await axios.delete(`https://640943f5d16b1f3ed6cdf00b.mockapi.io/Users/${id}`)
        getData()
    } catch (error) {

    }
}
    

// get data
const getData = async()=>{
    try {
        const{data}=await axios.get('https://640943f5d16b1f3ed6cdf00b.mockapi.io/Users')
        getUser(data)
    } catch (error) {
        
    }
}
getData()

// show users
function getUser(data){
    // tbodyadd.innerHTML=''
    tbody.innerHTML=''
    data.forEach((elem)=>{
        let trAll=document.createElement('tr')

        let tdId=document.createElement('td')
        tdId.innerHTML=elem.id
        
        let tdName=document.createElement('td')
        tdName.innerHTML=elem.name
        
        let tdAge=document.createElement('td')
        tdAge.innerHTML=elem.age

        let tdPhone=document.createElement('td')
        tdPhone.innerHTML=elem.phone
        
        let tdcourse=document.createElement('td')
        tdcourse.innerHTML=elem.course
        
        // button edit
        let btnEdit=document.createElement('button')
        btnEdit.innerHTML='<i class="fa-solid fa-pen-to-square"></i>'
        btnEdit.style.color='black'
        btnEdit.onclick=()=>{
            modaledit.style.display = "block";
            formedit['name'].value=elem.name
            formedit['surname'].value=elem.surname
            formedit['age'].value=elem.age
            formedit['phone'].value=elem.phone
            formedit['course'].value=elem.course
            formedit.onsubmit=(e)=>{
                e.preventDefault()
                let editorUser={
                    name:e.target['name'].value,
                    surname:e.target['surname'].value,
                    age:e.target['age'].value,
                    phone:e.target['phone'].value,
                    course:e.target['course'].value,
                }
                editUser(elem.id,editorUser)
                modaledit.style.display = "none";
            }
        }

        // button delete
        let btnDelete=document.createElement('button')
        btnDelete.innerHTML='<i class="fa-solid fa-trash"></i>'
        btnDelete.style.color='brown'
        btnDelete.onclick=()=>{
            modaldelete.style.display = "block";
            deletemodal.onclick=()=>{
                deleteUser(elem.id)
                modaldelete.style.display = "none";
            }
        }

        // button add
        let btnAdd=document.createElement('button')
        btnAdd.innerHTML='<i class="fa-solid fa-user-plus"></i>'
        btnAdd.style.color='black'
        btnAdd.onclick=()=>{
            modaladd.style.display = "block";
        }

        // button readmi open
        let btnReadmi=document.createElement('button')
        btnReadmi.innerHTML='<i class="fa-solid fa-eye"></i>'
        btnReadmi.onclick=()=>{
            tbodyadd.innerHTML=''
            modalopen.style.display = "block";
            let readTr=document.createElement('tr')

            let readId=document.createElement('td')
            readId.innerHTML=elem.id

            let readName=document.createElement('td')
            readName.innerHTML=elem.name

            let readSurname=document.createElement('td')
            readSurname.innerHTML=elem.surname

            let readAge=document.createElement('td')
            readAge.innerHTML=elem.age

            let readPhone=document.createElement('td')
            readPhone.innerHTML=elem.phone

            let readCourse=document.createElement('td')
            readCourse.innerHTML=elem.course

            readTr.appendChild(readId)
            readTr.appendChild(readName)
            readTr.appendChild(readSurname)
            readTr.appendChild(readAge)
            readTr.appendChild(readPhone)
            readTr.appendChild(readCourse)
            tbodyadd.append(readTr)
        }

        
        trAll.appendChild(tdId)
        trAll.appendChild(tdName)
        trAll.appendChild(tdAge)
        trAll.appendChild(tdcourse)

        trAll.appendChild(btnAdd)
        trAll.appendChild(btnReadmi)
        trAll.appendChild(btnEdit)
        trAll.appendChild(btnDelete)

        tbody.appendChild(trAll)

        
    })
}