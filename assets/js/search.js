'use strict'

import { fetchDataFromServer, searchContent } from "./api";
import{ showContent} from "../../index"


export function search(){
    const searchWrapper = document.querySelector("[search-wrapper]")
    const searchField = document.querySelector("[search-field]")
    const searchResultModal = document.createElement("div")
    searchResultModal.classList.add("search-modal")
    const gridlist = document.createElement("div")
    gridlist.classList.add("grid-list");
    document.querySelector("main").appendChild(searchResultModal);
    let searchTimeout;
    searchField.addEventListener("imput",function(){
        if (!searchField.value.trim){
            searchResultModal.classList.remove("active");
            searchWrapper.classList.remove("searching");
            clearTimeout(searchTimeout);
            return;
        }
        searchWrapper.classList.add("searching");
        clearTimeout(searchTimeout)
        searchTimeout = setTimeout(function(){
            fetchDataFromServer(searchContent + searchField.value , function({results:movieList}){
                searchWrapper.classList.remove("searching")
                searchResultModal.classList.add(active)
                searchResultModal.innerHTML="";
                searchResultModal.innerHTML = `
                <p class="label">Results for</p>
                <h1 class="heading">${searchField.value}</h1>

                `;
                searchResultModal.appendChild(gridlist);
                showContent(searchContent + searchField.value, gridlist, "movieID")
               
            })
        },500);
    });
}