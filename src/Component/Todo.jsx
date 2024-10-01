import React, { useState } from 'react'

export default function Todo() {
    const [task, setTask]= useState('')
   const [list,setList]= useState([])
   const [isEditing, setIsEditing] = useState(false);  
   const [editId, setEditId] = useState(null);  
 
   
   const addTodoList = () => {
     if (task.trim() === '') {
       alert("Task cannot be empty");
       return;
     }
 
     if (isEditing) {
       
       setList((prevList) =>
         prevList.map((item) =>
           item.id === editId ? { ...item, task: task } : item
         )
       );
       setIsEditing(false);  
       setEditId(null); 
     } else {
       
       const newTask = {
         id: Date.now(),
         task: task
       };
       setList((prevList) => [...prevList, newTask]);
     }
 
     setTask('');  
   };
 
  
  const DeleteList = (id) => {
   
    const updatedList = list.filter((lists) => lists.id !== id);
    setList(updatedList);  
  };
   
  const EditTask = (id) => {
    const taskToEdit = list.find((item) => item.id === id);
    setTask(taskToEdit.task); 
        setIsEditing(true); 
    setEditId(id);  
  };
 const DeletAllTodos=()=>(
    setList([])
 )
  return (
    <div class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
	<div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div class="mb-4">
            <h1 class="text-grey-darkest text-3xl underline">Karamat ToDo</h1>
            <div class="flex mt-4">
                <input class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo"
                value={task} onChange={(e)=>{setTask(e.target.value)}}
                />
                <button class="flex-no-shrink p-2 border-2 rounded text-teal border-teal "
                onClick={addTodoList}>{isEditing ? 'Update' : 'Add'}</button>
            </div>
        </div>
        <div>
        <ul class="mb-4">
            {
                 list.map((value, key) => (
                  <li key={key.id} className="flex flex-row bg-gray-400 mt-4 p-3">
                <h1 class="p-2 ml-4 mr-2 border-2 rounded  text-green border-green hover:bg-green" >{value.task}</h1>
                <button class="p-2 ml-2 border-2 rounded text-red border-red hover:text-white bg-red-600" onClick={()=>DeleteList(value.id)}>Delete</button>
                <button class="p-2 ml-2 border-2 rounded text-red border-red hover:text-black bg-blue-600 px-5 " onClick={()=>EditTask(value.id)}>Edit</button>
                  </li>
                 ))
            }
    </ul>
    <button class="flex-no-shrink p-2 ml-2 border-2 rounded  border-red  bg-gray-600 hover:text-white" 
    onClick={()=>DeletAllTodos()}
    >Delete All Todos</button>

        </div>
    </div>
</div>
  )
}



