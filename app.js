// get element
const post_form =document.getElementById("post_add_form");
const msg=document.querySelector('.msg');

// get all post
const all_post = document.querySelector(".all_post");

const getAllPost=()=>{
    let list='';
  let post= readLocalStorageData('fb_post');
  if (!post) {
    all_post.innerHTML=`<h1 class="text-center bg-primary">NO POST FOUND</h1>`;
    return false;
  }
   post.reverse().map(data=>{
    list+=`
    <div class="post-timeline-area my-3">
                    <div class="card shadow-sm">
                        <div class="card-body">
                            <div class="post-auth-area">
                                <div class="user-info">
                                    <img src="${data.authPhoto}" alt="">
                                    <div class="details">
                                        <span>${data.authName}</span>
                                        <span>2 h. <i class="fas fa-globe-asia"></i></span>
                                    </div>
                                </div>
                                <div class="dropdown">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fas fa-ellipsis-h"></i>
                                    </button>
                                    <ul class="dropdown-menu">
                                      <li><a class="dropdown-item post_edit" href="#">Edit</a></li>
                                      <li><a class="dropdown-item post_delete" post_id=${data.id}  href="#">Delete</a></li>
                                    </ul>
                                  </div>
                            </div>
                            <!-- post content area -->
                            <div class="post-content-area my-3">
                                <p>${data.postContent}</p>
                            </div>
                        </div>
                        ${data.postPhoto? '<img src=" '+ data.postPhoto +' ">': ''}
                    </div>
               </div>
    `;
  })
  all_post.innerHTML =list;
}
getAllPost();

post_form.onsubmit=(e) => {
    e.preventDefault();

    const randomId=Math.floor(Math.random()*1000) + '_' + Date.now();

    const form_data=new FormData(e.target);
    const data=Object.fromEntries(form_data.entries());
    const {authName,authPhoto,postContent,postPhoto}=Object.fromEntries(form_data.entries());

    if (!authName || !authPhoto || !postContent || !postPhoto) {
        msg.innerHTML=setAlert('All fields are required');
    }else{
        createLocalStore('fb_post',{...data,id:randomId});
        e.target.reset();
        getAllPost();
    }

}

// delete data
all_post.onclick =(e)=>{
    e.preventDefault();
    if (e.target.classList.contains("post_delete")) {
      const postId = e.target.getAttribute("post_id");
      
    //   get all posts
    const posts=readLocalStorageData('fb_post');

    // delete data 
    const delete_data=posts.filter(data=>data.id !== postId)

    // now update the post
    updateLocalStorageData('fb_post',delete_data);

    getAllPost();

    }
}
