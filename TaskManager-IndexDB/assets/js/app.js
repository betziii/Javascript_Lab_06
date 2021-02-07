const taskinput = document.querySelector('#task');
const  form = document.querySelector('#task-form');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const desBtn = document.querySelector('#order');

form.addEventListener('submit',addNewTask);
clearBtn.addEventListener('click', clearAllTasks);
filter.addEventListener('keyup', filterTasks);
taskList.addEventListener('click', removeTask);
desBtn.addEventListener('change',reverse);
function addNewTask(e){
    e.preventDefault();
    if(taskinput.value ===''){
        taskinput.style.borderColor = "red";
        return;
    }
    const li = document.createElement('li');
    li.className = "collection-item";
    li.appendChild(document.createTextNode (taskinput.value));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
    taskinput.value = ''
}

function clearAllTasks(){
    //alert("Clear task...");
    //taskList.innerHTML = '';
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
   }

}

function filterTasks(e) {
  let filter = (e.target)
  let collections = document.querySelectorAll('.collection-item');
  console.log(collections)
  collections.forEach(element => {
      element.style.display = (element.textContent.toUpperCase().indexOf(filter.value.toUpperCase()) > -1) ? 'block' : 'none';
  });
}
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure about that?')){
            e.target.parentElement.parentElement.remove();
        }
    }
}
function reverse() { 
  var list1 = document.querySelectorAll('.collection-item'); 
  var arr =[];
  for (var i = list1.length-1; i >=0; i--) { 
      arr.push(list1[i]);
  }
  var list2 = document.getElementsByClassName('collection')[0];
  list2.innerHTML = "";
  for(var i = 0; i<arr.length; i++){
      list2.appendChild(arr[i]);
  }
}
  /*
  var arr = Object.keys(list1);
  console.log(arr);
  console.log(typeof(arr));
  console.log (typeof(list1));
  console.log(list1.length);
  for (var i = 0; i < list1.length; i++) { 
    if (!list1[i].className.match(/\breversed\b/))
     continue; 
     var items = list1[i].getElementsByTagName('li'); 
     for(var j = 0; j < items.length; j++) { 
       items[j].setAttribute("value", items.length - j); 
      } 
    }
}
*/
