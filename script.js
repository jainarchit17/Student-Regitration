Task=0//0 to add and 1 to edit
var studentDetails=JSON.parse(localStorage.getItem("studentRecords"))||[];
var editIndex=-1;
display_Table();

document.getElementById("Student-form").onsubmit=function(event){
    event.preventDefault();

    var name=document.getElementById('fullName').value;
    var id=document.getElementById('studentId').value;
    var email=document.getElementById('email').value;
    var mobile=document.getElementById('contact').value;

    if (name==''||id==''|| email==''||mobile==''){
        alert("Fill Details before submission");
        return;
    }
     if (!/^[A-Za-z\s]+$/.test(name)) {
        alert("Use only Alphabets in name.");
        return;
    }
    if (isNaN(id)||isNaN(mobile)||mobile.length<10){
        alert("Check Id/Mobile number")
    }
    var newDetails={name:name,id:id, email:email,mobile:mobile};
    if (Task===0){
        studentDetails.push(newDetails);
    }
    else{
        studentDetails[Task]=newDetails;
        Task=0;
        document.getElementById("regButton").innerText="Register Students";
    }
    saveAndRefresh();
    this.reset();
}

function display_Table(){
    var list =document.getElementById("studentList");
    list.innerHTML=""//to empty older data from form
    for (var i=0;i<studentDetails.length; i++){
        var row="<tr>"+"<td>" +studentDetails[i].name +"</td>"+"<td>"+studentDetails[i].id + "</td>"+"<td>"+ studentDetails[i].email+"</td>"+"<td>"+ studentDetails[i].mobile+"</td>"+"<td>"+"<button class='editbtn' onclick='editRecord(" + i + ")'>Edit</button>"+"<button class='delbtn'onclick='deleteRecord(" + i + ")'>Delete</button>"+"</td>"+"</tr>";
        list.innerHTML+=row;
    }
}
// For Scrollbaar
var container=document.getElementById("student-records");
if (studentDetails.length>5){
    container.style.height="300px";
    container.style.overflowY="scroll";
} else{
    container.style.height='auto';
    container.style.overflowY='hidden';
}

//Edit Logic
window.editRecord=function(i){
    var elem=studentDetails[i]
    document.getElementById("fullName").value=elem.name;
    document.getElementById("studentId").value=elem.id;
    document.getElementById("email").value=elem.email;
    document.getElementById("contact").value=elem.mobile;
    editIndex=i;
    document.getElementById("regButton").innerText="Update Details";
};

//Delete Logic

window.deleteRecord=function(i){
    if(confirm("Want to DELETE this record?")){
        studentDetails.splice(i,1);
        saveAndRefresh();
    }
}

//Save the data
function saveAndRefresh(){
    localStorage.setItem("studentRecords",JSON.stringify(studentDetails));
    display_Table();
}