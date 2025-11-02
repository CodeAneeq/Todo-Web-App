import React from "react";
import axios from 'axios';
import styles from "./EditTodoBox.module.scss";
import baseURL from "../../helper/constant";


const EditTodoBox = ({ onClose, inputText, setInputText, setIsAddTodoBoxOpen, setTodos, id }) => {

   async function editTodoList() {
        try {
            let payload = {text: inputText};
            console.log(payload);
            
            let data = await axios.patch(`${baseURL}/edit-todo/${id}`, payload);
            if (data) {
                alert("Todo edited Success");
                onClose(() => setIsAddTodoBoxOpen(false));
                setTodos((prevTodos) => {
                    return prevTodos.map(item => item._id === id ? {...item, text: inputText} : item)
                })
            }
        } catch (error) {
            console.log(error);
        }
   }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Edit NOTE</h2>
        <input
          type="text"
          placeholder="Input your note..."
          className={styles.input}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={onClose}>CANCEL</button>
          <button className={styles.apply} onClick={editTodoList}>APPLY</button>
        </div>
      </div>
    </div>
  );
};

export default EditTodoBox;
