import React, { useRef, useEffect, useState } from "react";
import styles from "./app.css";

const App = () => {
  const [taskList, setTaskList] = useState([]);
  const curDate = new Date();

  ///References/////
  const taskNameRef = useRef();
  const dueDateRef = useRef();
  const taskRef = useRef();
  const formRef = useRef();
  const buttonRef = useRef();

  const taskContainerRef = useRef();
  class Todo {
    constructor(taskName, dueDate, task) {
      this.taskName = taskName;
      this.dueDate = dueDate;
      this.task = task;
    }

    setDate() {
      let date = this.dueDate.split("-");
      let organizeDate = [date[1], date[2], date[0]];
      let newDate = organizeDate.join("-");

      console.log(newDate);
      return newDate;
    }
  }

  const removeTask = (index) => {
    console.log(taskContainerRef.current.childNodes[index]);

    console.log(taskList);
    taskList.splice(index, 1);

    const updatedTasklist = [...taskList];
    setTaskList(updatedTasklist);
  };
  const addTask = (prev) => {
    let allTask;
    let name = taskNameRef.current.value;
    let dueDate = dueDateRef.current.value;
    let taskDescription = taskRef.current.value;

    if (taskList.length < 1) {
      let newTask = new Todo(name, dueDate, taskDescription);
      allTask = [newTask];
      setTaskList(allTask);
      console.log("if");
    } else {
      prev = taskList;
      let newTask = new Todo(name, dueDate, taskDescription);
      allTask = [newTask];
      console.log(prev);
      console.log(allTask);
      console.log(allTask.concat(prev));

      setTaskList(allTask.concat(prev));
    }

    // let newTask = new Todo(name, dueDate, taskDescription);
    // let prevTaskList = allTask;
    // allTask = prevTaskList.concat([newTask]);

    formRef.current.reset();
  };

  const renderAllTask = () =>
    taskList.map((curItem, index) => {
      console.log(taskList);

      return (
        <div id={`todo_${index}`} key={index} className="task-container">
          <div className="task">
            <h3>{curItem.taskName}</h3>
            <p>
              Placed on:
              {` ${
                curDate.getMonth() + 1
              }-${curDate.getDate()}-${curDate.getFullYear()}`}
            </p>
            <p>{curItem.setDate()}</p>

            <p>{curItem.task}</p>
          </div>
          <button
            className="delete-button"
            onClick={() => {
              removeTask(index);
            }}
          >
            <ion-icon name="trash"></ion-icon>
          </button>
        </div>
      );
    });

  return (
    <section>
      <h1>Todo App</h1>
      <div className="containers">
        <div className="add box">
          <h2 className="container-title">Need Todos</h2>
          <form
            ref={formRef}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label for="taskname">Task Name</label>
            <input
              ref={taskNameRef}
              className="type-field"
              name="taskname"
              placeholder="Set Task Name Here"
            />
            <label for="Due Date">Due on</label>
            <input
              ref={dueDateRef}
              type="date"
              className="type-field"
              name="Due Date"
              placeholder="Date needed Completed"
            />
            <label for="task description">Task</label>
            <textarea
              ref={taskRef}
              className="type-field"
              name="task description"
              placeholder="Describe Your Task"
            />
            <button
              className="add-button"
              ref={buttonRef}
              style={{ alignSelf: "center", marginTop: "3em" }}
              onClick={(e) => {
                if (
                  !taskNameRef.current.value ||
                  !dueDateRef.current.value ||
                  !taskRef.current.value
                ) {
                  e.preventDefault();
                  buttonRef.current.blur();
                  return;
                } else {
                  e.preventDefault();
                  addTask(taskList);
                  buttonRef.current.blur();
                }
              }}
            >
              Add to list
            </button>
          </form>
        </div>
        <div className="look box">
          <h2 className="container-title">List of Todos</h2>
          <div className="task-data-saved" ref={taskContainerRef}>
            {renderAllTask()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
