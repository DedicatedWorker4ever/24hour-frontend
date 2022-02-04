document.addEventListener("DOMContentLoaded", loadPosts);
document.addEventListener("DOMContentLoaded", postPosts);
document.addEventListener("DOMContentLoaded", ownPosts);

const userId = 1;

function postPosts(){
    document.getElementById("btn-post").addEventListener("click", ev => {
        ev.preventDefault();

        const url = "http://localhost:8080/api/posts/addPost";
        const text = document.getElementById("post-text").value;
        const hashTag = document.getElementById("post-hashTag").value;

        let data = {
            "hashTag": `${hashTag}`,
            "text": `${text}`,
            "user": {
              "userId": `${userId}`
            }
          };

          fetch(url, {
        method: "POST",
        headers: {'Accept': 'application/json',
        'Content-Type': 'application/json'}, 
        body: JSON.stringify(data)
        }).then(res => {
          if(res.status === 200){
            window.alert("Success!");
         }else{
            window.alert(`Somethign went wrong... Error ${res.status}`);
         }
        console.log("Request complete! response:", res);
        });

    });
}

function loadPosts(){
    document.getElementById("btnSearch").addEventListener("click", ev => {
        ev.preventDefault();
    
        let hashtagSeletected = document.getElementById("hashtagSearch").value;
        let url ="";
        const output = document.querySelector('.out')

        if(hashtagSeletected){
            url = `http://localhost:8080/api/posts/getPostsByHashTag/${hashtagSeletected}`;
        }else{
            url = `http://localhost:8080/api/posts/getPosts`;
        }
        console.log(url);
        
        fetch(url)
      .then(response => response.json())
      .then(content => {
        document.querySelector('.out').textContent = '';
        console.log(content)

        content.forEach(post => {
            const postInfo = document.createElement("div");

            const postContent = document.createElement("ul");
            postContent.innerHTML = `<li class="username">${post.user.username} </li>
                              <li class="date">${post.timestamp} </li>
                              <li class="text">${post.text} </li>
                              <li class="hashtag">${post.hashTag} </li>`;

            
           postInfo.appendChild(postContent);
           output.insertAdjacentElement("afterbegin", postInfo);                   
        })
        
        }); 
    });
}

function ownPosts(){
    document.getElementById("post-own").addEventListener("click", ev => {
        ev.preventDefault();
    
        const output = document.querySelector('.out')


        const url = "http://localhost:8080/api/posts/getPosts/1";
        
        fetch(url)
      .then(response => response.json())
      .then(content => {
        document.querySelector('.out').textContent = '';
        console.log(content)

        content.forEach(post => {
            const postInfo = document.createElement("div");
            postInfo.id = post.postId;

            const postContent = document.createElement("ul");
            postContent.innerHTML = `<li class="username">${post.user.username} </li>
                              <li class="date">${post.timestamp} </li>
                              <li class="text">${post.text} </li>
                              <li class="hashtag">${post.hashTag} </li>
                              <button type="button" class="btnDelete" id="${post.postId}" onclick="deletePost(this.id)">Delete</button>
                              <button type="button" class="btwEdit" id="${post.postId}" onclick="editPost(this.id)" title="Fill in Tweet and HashTags to Edit">Edit Posts</button>`;
            

            
           postInfo.appendChild(postContent);
           output.insertAdjacentElement("afterbegin", postInfo);                   
        })
      })
    })
}

function deletePost(clicked_id){
    
    const url = `http://localhost:8080/api/posts/deletePost/${clicked_id}`;

    fetch(url, {
        method: "DELETE",
        headers: {'Accept': 'application/json',
        'Content-Type': 'application/json'}, 
        }).then(res => {
           if(res.status === 200){
              window.alert("Success!");
           }else{
              window.alert(`Somethign went wrong... Error ${res.status}`);
           }
        console.log("Request complete! response:", res);
        });

}

function editPost(clicked_id){
    
    const url = `http://localhost:8080/api/posts/editPost/${clicked_id}`;
        const text = document.getElementById("post-text").value;
        const hashTag = document.getElementById("post-hashTag").value;

        let data = {
            "hashTag": `${hashTag}`,
            "text": `${text}`
          };


          fetch(url, {
            method: "PUT",
            headers: {'Accept': 'application/json',
            'Content-Type': 'application/json'}, 
            body: JSON.stringify(data)
            }).then(res => {
              if(res.status === 200){
                window.alert("Success!");
             }else{
                window.alert(`Somethign went wrong... Error ${res.status}`);
             }
            console.log("Request complete! response:", res);
            });
}