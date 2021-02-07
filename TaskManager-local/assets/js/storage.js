document.addEventListener("DOMContentLoaded", loadTasksfromDB);
function loadTasksfromDB(){
    let listOfTasks = loadfromDB();
    if(listOfTasks.length != 0){
        listOfTasks.forEach(function(eachTask) {
            const li = document.createElement("li");
            li.className = "collection-item";
            li.appendChild(document.createTextNode(eachTask));
            const link = document.createElement("a");
            link.className = "delete-item secondary-content";
            link.innerHTML = '<i class = "fa fa-remove"></i>';
            li.appendChild(link);
            taskList.appendChild(li);
        });
    }

}
function clearAllTasksfromDB(){
    localStorage.clear();
}
function clearAllTasks(){
    //insert if..else to chack whether the local storage is empty or not
    if (localStorage.getItem('tasks') != null){
        clearAllTasksfromDB();
    }
}
function addToDatabase(newTask){
    let listOfTasks;
    if(localStorage.getItem('tasks') == null){
        listOfTasks = [];
    }else{
        listOfTasks = JSON.parse(localStorage.getItem('tasks'));
    }
    listOfTasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(listOfTasks));
}

function addNewTask(e){
    addToDatabase(taskInput.value);
}
function loadfromDB(){
    let listOfTasks;
    if (localStorage.getItem('tasks') == null){
        listOfTasks = [];
    }else{
        listOfTasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return listOfTasks;
}
function removefromDB(taskItem){
    let listOfTasks;
    if(localStorage.getItem('tasks')==null){
        listOfTasks = [];
    }else{
        listOfTasks = JSON.parse(localStorage.getItem("tasks"));
    }
    listOfTasks.forEach(function(task,index){
        if(taskItem.textContent.trim() === task.trim()){
            listOfTasks.splice(index,1);
        }

    });
    localStorage.setItem('tasks', JSON.stringify(listOfTasks));
}
