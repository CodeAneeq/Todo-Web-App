import React from 'react';
import styles from './home.module.scss'
import SearchInput from '../components/search-box/search_input';
import moon from '../assets/moon.svg'
import { MdEdit, MdDelete } from 'react-icons/md'
import { FaPlus } from 'react-icons/fa'
import { useState } from 'react';
import AddTodoBox from '../components/add-todo-box/add-todo-box';
import { ModeContext } from '../context/mode-context';
import sun from '../assets/sun.png'
import { useContext } from 'react';
import axios from 'axios';
import baseURL from '../helper/constant';
import { useEffect } from 'react';
import none from '../assets/none.png'
import EditTodoBox from '../components/edit-todo-box/edit-todo-box';

const Home = () => {
    const [isAddTodoBoxOpen, setIsAddTodoBoxOpen] = useState(false);
    const [isEditTodoBoxOpen, setIsEditTodoBoxOpen] = useState(false);
    const [inputText, setInputText] = useState("");
    const [searchInputText, setSearchInput] = useState("");
    const [todos, setTodos] = useState([]);
    const [editId, setIsEditId] = useState("");
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [filter, setFilter] = useState("all");


    const { isDark, Toggle } = useContext(ModeContext)

    async function getTodos() {
        try {
            let data = await axios.get(`${baseURL}/get-todos`);
            setTodos(data?.data?.data);
            console.log(data);
            setFilteredTodos(data?.data?.data)
        } catch (error) {
            console.log(error);
        }
    }

    async function delTodos(id) {
        try {
            let data = await axios.delete(`${baseURL}/del-todo/${id}`);
            setFilteredTodos((prevTodos) => {
                return prevTodos.filter(todo => todo._id !== id);
            });
            console.log(data);

        } catch (error) {
            console.log(error);
        }
    }

    async function changeStatus(id, currentStatus) {
        const newStatus = currentStatus === "complete" ? "incomplete" : "complete";
        try {
            let data = await axios.post(`${baseURL}/change-todo-status/${id}`, { status: newStatus });
            setFilteredTodos(prevTodos =>
                prevTodos.map(todo =>
                    todo._id === id ? { ...todo, status: newStatus } : todo
                )
            );
        } catch (error) {
            console.log(error);
        }
    }

    function filterTodos(selectedValue) {
        setFilter(selectedValue);

        if (selectedValue == "all") {
            setFilteredTodos(todos);
        } else if (selectedValue == "complete") {
            setFilteredTodos(todos.filter(item => item.status === "complete"));
        } else if (selectedValue == "incomplete") {
            setFilteredTodos(todos.filter(item => item.status === "incomplete"));
        }
        
    }

    useEffect(() => {
        getTodos()
    }, [])

    return (
        <div className={`${styles.home_container}`}>
            {isAddTodoBoxOpen && <AddTodoBox setTodos={setFilteredTodos} setIsAddTodoBoxOpen={setIsAddTodoBoxOpen} onClose={() => setIsAddTodoBoxOpen(false)} inputText={inputText} setInputText={setInputText}></AddTodoBox>}
            {isEditTodoBoxOpen && <EditTodoBox setTodos={setFilteredTodos} id={editId} setIsAddTodoBoxOpen={setIsAddTodoBoxOpen} onClose={() => setIsEditTodoBoxOpen(false)} inputText={inputText} setInputText={setInputText}></EditTodoBox>}
            <h2>TODO LIST</h2>
            <div className={`${styles.input_div}`}>
                <SearchInput inputText={searchInputText} setFilteredTodos={setFilteredTodos} setInputText={setSearchInput}></SearchInput>
                <select value={filter} onChange={(e) => filterTodos(e.target.value)}>
                    <option value="all">All</option>
                    <option value="complete">Completed</option>
                    <option value="incomplete">In Complete</option>
                </select>
                <span className={`${styles.mode_img}`} >
                    <img src={isDark ? sun : moon} alt="" onClick={() => Toggle()} />
                </span>
            </div>
            <div className={`${styles.todos_div}`}>
                <ul className={`${styles.todos_ul}`}>
                    {
                      filteredTodos.length > 0 ?  filteredTodos.map((item) => (
                            <>
                                <li key={item._id}>
                                    <span className={`${styles.first_span}`}>
                                        <input type="checkbox" checked={item.status === "complete"} onChange={() => changeStatus(item._id, item.status)} />
                                        <span style={{
                                            textDecoration: item.status === "complete" ? "line-through" : "none",
                                        }}>{item.text}</span>
                                    </span>
                                    <span className={`${styles.icons}`}>
                                        <span onClick={() => {setIsEditTodoBoxOpen(true), setIsEditId(item._id)}}><MdEdit /></span>
                                        <span onClick={() => delTodos(item._id)}><MdDelete /></span>
                                    </span>
                                </li>
                                <hr />
                            </> 
                        )) : <>
                        <figure className={`${styles.not_found}`}>
                          <img src={none} alt="" />
                        </figure>
                        </>
                    }

                </ul>
            </div>
            <div className={`${styles.add_btn_div}`}>
                <button className={`${styles.add_btn}`} onClick={() => setIsAddTodoBoxOpen(true)}><FaPlus /></button>
            </div>
        </div>
    )
}

export default Home





















///////////////////////////////////////
//    <div className={`${styles.todos_div}`}>
//             <ul className={`${styles.todos_ul}`}>
//                 <li>
//                     <span className={`${styles.first_span}`}>
//                     <input type="checkbox" />
//                     <span>Note 1</span>
//                     </span>
//                     <span className={`${styles.icons}`}>
//                         <span><MdEdit /></span>
//                         <span><MdDelete /></span>
//                     </span>
//                 </li>
//                 <hr />
//                 <li>
//                     <span className={`${styles.first_span}`}>
//                     <input type="checkbox" />
//                     <span>Note 1</span>
//                     </span>
//                     <span className={`${styles.icons}`}>
//                         <span><MdEdit /></span>
//                         <span><MdDelete /></span>
//                     </span>
//                 </li>
//                 <hr />
//             </ul>
//         </div>