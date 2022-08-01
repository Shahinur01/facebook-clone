/* Alert function */
const setAlert =(msg,type="danger") =>{
    return `<p class="alert alert-${type} d-flex justify-content-between">${msg} <button data-bs-dismiss="alert" class="btn-close"></button> </p>`
}


// Create localStore data
const createLocalStore =(key,value)=>{
    let data =[];

   if (localStorage.getItem(key)) {
       data =JSON.parse(localStorage.getItem(key) );
        
   }
       data.push(value);

       localStorage.setItem(key, JSON.stringify(data));
}

// Read local storage data

const readLocalStorageData =(key)=>{
    if(localStorage.getItem(key)){
        return JSON.parse(localStorage.getItem(key));
    }
    else{
        return false;
    }
}

// update local storage data
const updateLocalStorageData =(key,array)=>{
    localStorage.setItem(key, JSON.stringify(array));
}
