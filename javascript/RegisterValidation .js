var form=document.querySelector("form");
var nameinput=document.getElementById('username');
var emailinput=document.getElementById('email');
var passwordinput=document.getElementById('password');
var passwordConfirm=document.getElementById('passwordconfirm');
var name_error_mg=document.getElementById("name_error_mg");
var email_error_mg=document.getElementById("email_error_mg");
var password_error_mg=document.getElementById("password_error_mg");
var password_confirm_error_mg=document.getElementById("password_confirm_error_mg");
var submitbtn=document.getElementById('loginSubmitBtn');



function validateForm(event) {
    var isValid = true;
    
    event.preventDefault();
    
    //nameinput
    if (nameinput.value.length===0||nameinput.value===null) {
        nameinput.style.border = "2px solid red";
        name_error_mg.style.display = "block";
        isValid=false;
    } else {
        nameinput.style.border = "2px solid green";
        name_error_mg.style.display = "none";
    }
    //console.log(nameinput.value);
    //email
    if (emailinput.value.length<1 || !emailinput.value.includes("@")||!emailinput.value.includes(".")) {
        emailinput.style.border = "2px solid red";
        email_error_mg.style.display = "block";
        isValid=false;
    } else {
        emailinput.style.border = "2px solid green";
        email_error_mg.style.display = "none";
    }
    // console.log(emailinput.value);
    
    // password
if (passwordinput.value.length==0||passwordinput.value.length < 8) {
    passwordinput.style.border = "2px solid red";
    password_error_mg.style.display = "block";
    isValid=false;
} else {
    passwordinput.style.border = "2px solid green";
    password_error_mg.style.display = "none";
}// console.log(passwordinput.value);



// passowrd confirm
if(passwordConfirm.value.length==0||passwordConfirm.value.length<8){
    password_confirm_error_mg.innerHTML=`enter passowrd confirm`;
    passwordConfirm.style.border = "2px solid red";
    password_confirm_error_mg.style.display = "block";
    isValid=false;
}
else{
    passwordConfirm.style.border = "2px solid green";
    password_confirm_error_mg.style.display="none";
}
if(passwordConfirm.value!=passwordinput.value){
    password_confirm_error_mg.innerHTML=`password should match`;
    passwordConfirm.style.border = "2px solid red";
    password_confirm_error_mg.style.display = "block";
    
    isValid=false;
} else {
    passwordConfirm.style.border = "2px solid green";
    password_confirm_error_mg.style.display="none";
    
}// console.log(passwordConfirm.value);
return isValid;
}





function saveData(event){
    event.preventDefault();
    var isValid=validateForm(event);
    var name=document.getElementById('username').value;
    var email=document.getElementById('email').value;
    var password=document.getElementById('password').value;
    var pwdConfirm=document.getElementById('passwordconfirm').value;
    var user_record = JSON.parse(localStorage.getItem("users")) || [];
   
    
    
    if(isValid){ 
    if(user_record.some((d)=> {
        
        return d.email==email||d.password==password||d.passwordConfirm==passwordConfirm;
    })){
        alert("duplicate Data Entry");
        emailinput.style.border = "2px solid red";
        passwordinput.style.border = "2px solid red";
        passwordConfirm.style.border = "2px solid red";
        isValid=false;
    }
    
    else{
        user_record.push(
        {
            "username":name,
            "email":email,
            "password":password
            
        })
        localStorage.setItem("users",JSON.stringify(user_record));
        window.location.href='../html/homePage.html';
    }
}
    
}

// form.addEventListener("submit",validateForm);
submitbtn.addEventListener("click",saveData);



    
    