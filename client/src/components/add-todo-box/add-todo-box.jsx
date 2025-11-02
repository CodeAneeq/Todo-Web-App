import React from "react";
import axios from 'axios';
import styles from "./AddTodoBox.module.scss";
import baseURL from "../../helper/constant";


const AddTodoBox = ({ onClose, inputText, setInputText, setIsAddTodoBoxOpen, setTodos }) => {

   async function addTodoList() {
        try {
            let payload = {text: inputText};
            console.log(payload);
            
            let data = await axios.post(`${baseURL}/add-todo`, payload);
            if (data) {
                alert("Todo Added Success");
                onClose(() => setIsAddTodoBoxOpen(false));
                setTodos((prev) => [...prev, data.data.data])
                setInputText("")
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>NEW NOTE</h2>
        <input
          type="text"
          placeholder="Input your note..."
          className={styles.input}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={onClose}>CANCEL</button>
          <button className={styles.apply} onClick={addTodoList}>APPLY</button>
        </div>
      </div>
    </div>
  );
};

export default AddTodoBox;
