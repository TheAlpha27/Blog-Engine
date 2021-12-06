var editor = true;
let editorExc = document.getElementsByClassName("editorExc");
function handleEditor() {
    if (editor === true) {
        editor = false;
        document.getElementById("editor").innerText = "Switch to Editor Mode";
        Array.from(editorExc).forEach(function (e) {
            e.classList.remove("show-class");
            e.classList.add("hidden-class");
        })
    }
    else {
        editor = true;
        document.getElementById("editor").innerText = "Switch to Viewer Mode";
        Array.from(editorExc).forEach(function (e) {
            e.classList.remove("hidden-class");
            e.classList.add("show-class");
        })
    }
}

if (localStorage.getItem("blogs") == null) {
    blogsArr = [];
}
else {
    blogsArr = JSON.parse(localStorage.getItem("blogs"));
}
// console.log("blogArr length", blogsArr.length);
function blogLoader() {
    let blogsContainer = document.getElementById("blogContainer");
    let html = "";
    if (blogsArr.length === 0) {
        blogsContainer.innerHTML = `<h3>No blogs to show. Please Create a blog post.</h3>`;
    }
    else {
        blogsArr.forEach(function (elem, index) {
            html += `<div class="BlogCard">
            <div id="${index}" class="BlogImgContainer">
                <img src= ${elem.image}
                    alt="Blog Image" />
            </div>
            <div class="BlogDetail">
                <p>
                    <span>Title: </span> ${elem.title}
                </p>
                <p>
                    <span>Description: </span> ${elem.Description.slice(0, 100)}...
                </p>
                <div class="contactIcon">
                    <p>
                        <span>Author: </span> ${elem.author}
                    </p>
                    <Button class="btn btn-primary readMore" onclick="handleOpen(${index})">
                        Read More!
                    </Button>
                </div>
            </div>
            </div>`;
        })
        blogsContainer.innerHTML = html;
    }

}

function showAddBlog() {
    document.getElementById("addBlog").style.display = "block";
}
function handleAddBlog() {
    let title = document.getElementById("mytitle");
    let Description = document.getElementById("myDescription");
    let Author = document.getElementById("myAuthor");
    let image = document.getElementById("myImg");
    if (title.value === "" || Description.value === "" || Author.value === "" || image.value === "") {
        document.getElementById("error").innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Error!</strong> You cannot leave the fields below empty
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`
    }
    else {
        let newBlog = {
            id: blogsArr.length,
            title: title.value,
            Description: Description.value,
            author: Author.value,
            image: image.value
        }
        console.log(newBlog);
        title.value = "";
        Description.value = "";
        Author.value = "";
        image.value = "";
        blogsArr.push(newBlog);
        // console.log(document.getElementById("mytitle").value);
        localStorage.setItem("blogs", JSON.stringify(blogsArr));
        // console.log("BlogsArr Inside ADD", blogsArr);
        // console.log("Local Storage inside ADD", JSON.parse(localStorage.getItem("blogs")));
        blogLoader();
        handleAddBlogClose();
    }
}
function handleAddBlogClose() {
    let title = document.getElementById("mytitle");
    let Description = document.getElementById("myDescription");
    let Author = document.getElementById("myAuthor");
    let image = document.getElementById("myImg");
    title.value = "";
    Description.value = "";
    Author.value = "";
    image.value = "";
    document.getElementById("addBlog").style.display = "none";
}

let elem = document.getElementById("blog");
elem.style.display = "none";

function handleOpen(e) {
    elem.style.display = "flex";
    let blogElem = blogsArr.filter(function (el) {
        return el.id === e;
    });
    elem.innerHTML = `<div class="container blogFull">
    <div class="topSection">
        <div class="blogImg" style="background-image: url(${blogElem[0].image});" >
        </div>
        <div class="top-right">
            <h1 class="title">
                ${blogElem[0].title} <p>By- ${blogElem[0].author}</p>
            </h1>
            <div class="icons">
                <div class="editorExc show-class">
                    <i class="fas fa-edit "></i>
                </div>
                <div class="editorExc show-class">
                    <i class="fas fa-trash " onclick={handleDelete(${e})}></i>
                </div>
                <i class="fas fa-times-circle" onclick={handleClose()}></i>
            </div>
        </div>
    </div>
    <div class="bottomSection">
    ${blogElem[0].Description}
    </div>
</div>`
}
function handleClose() {
    elem.style.display = "none";
}
function handleDelete(e) {
    let newBlogsArr = blogsArr.filter(function (el) {
        return el.id !== e;
    });
    // console.log("here",newBlogsArr);
    // console.log("here2", blogsArr);
    blogsArr = newBlogsArr;
    localStorage.setItem("blogs", JSON.stringify(blogsArr));
    handleClose();
    blogLoader();
}