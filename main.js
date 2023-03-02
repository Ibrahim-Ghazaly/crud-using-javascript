let author = document.getElementById("name");
let des = document.getElementById("description");
let age = document.getElementById("age");
let tbody = document.getElementById("tbody");


let url = "https://my-json-server.typicode.com/Ibrahim-Ghazaly/json-server/authors"


document.getElementById("create").onclick = craeteAutor;

// create author function 

function craeteAutor(){
      if(author.value == "" || des.value == "" || age.value == ""){
        alert("you have to fill inputs")
    }else{
        fetch(url,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              author:author.value,
              description:des.value,
              age:age.value
            })
           }).then(res => res.json()).then(data => console.log(data))
           
          author.value = '';
          des.value = '';
          age.value = '';
    }

   tbody.innerHTML ="";
    getAuthors()
}



// get all authors functions 

function getAuthors(){


   

    fetch(url).then(res => res.json()).then(data => {

  
       for(let i = 0 ; i < data.length ; i++){
        tbody.innerHTML  +=  `
         <tr >
         <td>${data[i].id}</td>
         <td>${data[i].author}</td>
         <td>${data[i].description}</td>
         <td>${data[i].age}</td>
         <td>
         <button class="btn btn-success btn-sm m-2" onclick= Edit(${data[i].id})>Edit</button>
         <button class="btn btn-danger btn-sm m-2" onclick = Delete(${data[i].id})>Delete</button>
         </td>
       </tr>
         
         `
       }
    })
     
}


getAuthors()



// edit function 

function Edit(id){
  
    document.getElementById("edit").removeAttribute("hidden");
    document.getElementById("create").setAttribute("hidden","hidden");


    fetch(`${url}/${id}`).then(res => res.json()).then(auth => {

      console.log(author)
           author.value =auth.author ;
            des.value = auth.description ;
            age.value = auth.age;

    })


document.getElementById("edit").onclick= ()=>{

    document.getElementById("create").removeAttribute("hidden");
    document.getElementById("edit").setAttribute("hidden","hidden");



    fetch(`${url}/${id}`,{
        method:'PATCH',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          author:author.value,
          description:des.value,
          age:age.value
        })
       }).then(res => res.json()).then(data =>{

       tbody.innerHTML ="";
         getAuthors()

       })
       
           author.value = '';
           des.value = '';
           age.value = '';

  }
    }


// delete function 

function Delete(id){

    fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    }).then(res =>
        res.json()).then(res =>{

       tbody.innerHTML ="";
         getAuthors()
       });
}
