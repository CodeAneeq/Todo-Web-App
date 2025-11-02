import React from 'react'
import styles from './search_input.module.scss';
import search from '../../assets/search.svg';
import axios from 'axios';
import baseURL from '../../helper/constant';

const SearchInput = ({inputText, setInputText, setFilteredTodos}) => {

    const searchTodo = async (query) => {
        try {
            if (!query) { 
            let data = await axios.get(`${baseURL}/get-todos`); 

            setFilteredTodos(data.data.data); 
            return; 
        }
            let data = await axios.get(`${baseURL}/search-todo?title=${query}`);
             console.log("Search result:", data.data.data);
            setFilteredTodos(data.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    
  return (
    <div className={`${styles.search_div}`}>
        <input type="text" placeholder='Search Note...' value={inputText}  onChange={(e) => {
          setInputText(e.target.value);
        }}/>
        <img src={search} alt="" onClick={() => searchTodo(inputText)}/>
    </div>
  )
}

export default SearchInput