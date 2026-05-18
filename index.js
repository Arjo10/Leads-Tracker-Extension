let myLeads = [];
const inputEl=document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl=document.getElementById("ul-el");
const deleteBtn=document.getElementById("delete-btn");
const tabBtn=document.getElementById("tab-btn");

/*
SAVE a key value pair in localStorage
localStorage.setItem("myLeads","www.awesomelead.com");
Refresh the page and get the vale and log it to the console
console.log(localStorage.getItem("myLeads"));
Clear localstorage
localStorage.clear();
*/
const leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads")); //to get the array back from localStorage we need to parse the string using JSON.parse
if(leadsFromLocalStorage){
    myLeads=leadsFromLocalStorage;
    render(myLeads);
}

function render(leads){
      ulEl.textContent="List of Leads: ";
    let listItems="";
    for(let i=0;i<leads.length;i++){
    //ulEl.innerHTML+="<li>"+myLeads[i]+"</li>"; //to make list replace textContent with innerHTML and add <li> tags
    /*const li=document.createElement("li");
      li.textContent=leads[i];
      ulEl.append(li);*/
      //listItems+="<li><a target='_blank' href='"+leads[i]+"'>"+leads[i]+"</a></li>";
      //using backtick and template string to make code more readable and avoid concatenation
      listItems+= `    
       <li>
        <a target='_blank' href='${leads[i]}'>
          ${leads[i]}
        </a>
       </li>
      `
    }
    ulEl.innerHTML=listItems;
}



deleteBtn.addEventListener("dblclick",function(){
  localStorage.clear();
  myLeads=[];
  render(myLeads);
})



inputBtn.addEventListener("click",function(){
    myLeads.push(inputEl.value);
    localStorage.setItem("myLeads",JSON.stringify(myLeads)); //to store array in localStorage we need to convert it to string using JSON.stringify
    render(myLeads);
    inputEl.value="";

})


tabBtn.addEventListener("click",function(){
    chrome.tabs.query({ active:true, currentWindow:true},function(tabs){
     myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads",JSON.stringify(myLeads));
    render(myLeads);
    });
})