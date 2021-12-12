const alertBanner = document.getElementById("alert");
const trafficCanvas = document.getElementById("traffic-chart");
const dailyCanvas = document.getElementById("daily-chart");
const mobileCanvas = document.getElementById("mobile-chart");
const user = document.getElementById("userField");
const message = document.getElementById("messageField");
const sendButton = document.getElementById("send");


let markup = `<div class ="alert-banner">
<p><strong>Alert:</strong> You have unread messages.</p>
<p class="alert-banner-close">x</p>
</div>`;

alertBanner.innerHTML = markup;

alertBanner.addEventListener("click", function(e) {
  if (e.target.classList.contains("alert-banner-close")) {
    alertBanner.style.display = "none";
  }
});

//Traffic data chart

let trafficData = {
    labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"],
    datasets: [{ 
        data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500], 
        backgroundColor: "rgba(116, 119, 191, 0.3)", 
        borderwidth: 1,
    }]
};

let trafficOptions = {
    aspectRatio: 2.5,
    animation: {
        duration: 0
    },
    scales: { 
        y: {
            beginAtZero: true
        }
    },
    
   
        legend: {
            display: false,
        }
    

};

let trafficChart = new Chart(trafficCanvas, {
    type: 'line', 
    data: trafficData, 
    options: trafficOptions
});


//Daily data chart


const dailyData = {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [{
        label: "# of Hits", 
        data: [75, 115, 175, 125, 225, 200, 100],
        backgroundColor: "rgba(116,119,191,255)",
        borderWidth: 1  }]
};

const dailyOptions = {
    scales: {
        y: {
            beginAtZero: true
        }
    },

       
            legend: {
                display: false,
        }
    

};

let dailyChart = new Chart(dailyCanvas, {
    type: 'bar',
    data: dailyData,
    options: dailyOptions
});


//mobile data chart


const mobileData = {
    labels: ["Desktop", "Tablet", "Phones"],
    datasets: [{
        label: "# of Users",
        data: [2000, 550, 500],
        borderWidth: 0,
        backgroundColor: [
            "#7477BF",
            "#78CF82",
            "#51B6C8"
        ]
    }]
};

const mobileOptions = {
    aspectRatio: 1.9,
    
        legend: {
            position: "right",
            labels: {
                boxWidth: 20,
                fontStyle:"bold"
            }
        }
    
};

let mobileChart = new Chart(mobileCanvas, {
    type: 'doughnut',
    data: mobileData,
    options: mobileOptions
});


//Event listener on message box

sendButton.addEventListener("click", function(e) {
    if (user.value === "" && message.value === "") {
        alert("Please fill out user and message fields before sending");
    } else if(user.value === "") {
        alert("Please fill the user filed before sending");
    } else if (message.value === "") {
        alert("Please fill the message field before sending");
    } else {
        alert(`Message successfully sent to: ${user.value}`);
    }
});


//<-------- close notification button ------->

const close = document.getElementsByClassName("closebtn");
let i;

for (i = 0; i < close.length; i++) {
  close[i].onclick = function(){
    var div = this.parentElement;
    div.style.opacity = "0";
    setTimeout(function(){ div.style.display = "none"; }, 600);
  }
}
  
//----- Auto complete feature Ref: https://www.w3schools.com/howto/howto_js_autocomplete.asp

let users = ["Victoria Chambers", "Dale Byrd", "Dawn Wood", "Dan Oliver"]

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}

  autocomplete(document.getElementById("userField"), users);


// Local storage

/*Pseudocode
if email-toggle is switched on 
save settings to local storage
if profile-toggle is swithed on
save profil setting to local storage
if timezone shows value
save profile setting to local storage

remove email,profile and timezone setting 
when cancel button is clicked.

*/


const saveButton = document.getElementById("save"); 
const cancelButton = document.getElementById("cancel");
const emailSetting = document.querySelector(".email-setting");
const profileSetting = document.querySelector(".profile-setting");
const timezoneSetting = document.querySelector("#timezone"); 

//event handler checks the status of the email, profile and time and stores it in the local storage
  saveButton.addEventListener("click", ()=>{
    const emailOn = emailSetting.checked;
    const profileOn = profileSetting.checked;
    const timeOn = timezoneSetting.value;
  
    //data (array or object) should be converted into string before storing in local storage
    localStorage.setItem("email",JSON.stringify(emailOn));
    localStorage.setItem("profile", JSON.stringify(profileOn) )
    localStorage.setItem("timezone", JSON.stringify(timeOn));    
  });

  

//if the status is false, clears the local storage
 cancelButton.addEventListener("click", ()=>{
    emailSetting.checked = false;
    profileSetting.checked = false;
    timezoneSetting.value = "select"  

    localStorage.clear();    
  });  
























