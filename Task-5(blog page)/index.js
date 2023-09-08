function upload() {
  //get your image
  var image = document.getElementById('image').files[0];
  //get your blog text
  var post = document.getElementById('post').value;
  //get image name
  var imageName = image.name;
  //firebase storage reference
  //it is the path where your image will be stored
  var storageRef = firebase.storage().ref('images/' + imageName);
  //upload image to selected storage reference
  //make sure you pass image here
  var uploadTask = storageRef.put(image);
  //to get the state of image uploading....
  uploadTask.on('state_changed', function (snapshot) {
    //get task progress by following code
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log("upload is " + progress + " done");
  }, function (error) {
    //handle error here
    console.log(error.message);
  }, function () {
    //handle successfull upload here..
    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
      //get your image download url here and upload it to databse
      //our path where data is stored ...push is used so that every post have unique id
      firebase.database().ref('blog/').push().set({
        text: post,
        imageURL: downloadURL
      }, function (error) {
        if (error) {
          alert("Error while uploading");
        } else {
          alert("Successfully uploaded");
          //now reset your form
          document.getElementById('post-form').reset();
          getdata();
        }
      });
    });
  });

}

window.onload = function () {
  this.getdata();
}


function getdata() {
  firebase.database().ref('blog/').once('value').then(function (snapshot) {
    //get your posts div
    var posts_div = document.getElementById('posts');
    //remove all remaining data in that div
    posts.innerHTML = "";
    //get data from firebase
    var data = snapshot.val();
    console.log(data);
    //now pass this data to our posts div
    //we have to pass our data to for loop to get one by one
    //we are passing the key of that post to delete it from database
    for (let [key, value] of Object.entries(data)) {
      posts_div.innerHTML = "<div class='col mt-2 mb-1'>" +
        "<div class='card-body '>" +
        "<img class='img-thumbnail' src='" + value.imageURL + "' style='height:250px;'>" +
        "<div class='card-body'><p class='card-text'>" + value.text + "</p>" +
        "<button class='btn btn-sm btn-danger' id='" + key + "' onclick='delete_post(this.id)'>Delete</button>" +
        "</div></div></div>" + posts_div.innerHTML;
    }

  });
}

function delete_post(key) {
  firebase.database().ref('blogs/' + key).remove();
  getdata();

}

// search engine
function search() {
  // Get the search query from the input field
  const query = document.getElementById("searchInput").value;

  // You can implement your search logic here
  // For this example, we'll just display the query as a result
  const searchResults = document.getElementById("searchResults");
  searchResults.innerHTML = `<p>Search Results for: ${query}</p>`;
}

/* Firebase Authorisation */
const auth = firebase.auth();

//signUp function
function signUp() {
  var email = document.getElementById("email");
  var password = document.getElementById("password");

  const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
  promise.catch(e => alert(e.message));
  alert("Account Created");
}

//signIn function
function signIn() {
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  const promise = auth.signInWithEmailAndPassword(email.value, password.value);
  promise.catch(e => alert(e.message));
  // window.location = "./index.html";
}


//signOut
function signOut() {
  auth.signOut();
  alert("You'r SignOut");
  // window.location = "./active.html";
}

//active user to homepage
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var email = user.email;
    alert(email);
    // window.location = "./Web Collection.html";
  } else {
    // alert("Error No user is there")
  }
})

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    var user = firebase.auth().currentUser;
    if (user != null) {
      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Hello, " + email_id;
    }
  } else {
    // No user is signed in.
  }
});