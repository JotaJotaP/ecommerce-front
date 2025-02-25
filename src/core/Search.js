import React, { useState } from "react"
import { list } from "./apiCore"

const Search = ({ setFilteredResults, setSearchQuery  }) => {
    const [data, setData] = useState({
        search: "",
        category: "",
    })
    const { search, category } = data

    const searchData = () => {
            list({ search: search || undefined, category: category || undefined }).then(response => {
                if (response.error) {
                    console.log(response.error)
                } else {
                    setFilteredResults(response) // Update filtered results in Shop
                    // console.log(response.length)
                }
            })
    }
    
    const searchSubmit = (e) => {
        e.preventDefault()
        searchData()
    }
    

    const handleChange = name => event => {
        setData({ ...data, [name]: event.target.value })
        if (name === "search") {
            setSearchQuery(event.target.value)  // Atualiza o termo de pesquisa
        }
    }

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text mb-3 pr-0">
                <div className="input-group input-group-sm">
                    <input
                        type="search"
                        className="form-control pr-0"
                        onChange={handleChange("search")}
                        placeholder="Search by name"
                    />
                </div>
                <div className="btn input-group-append" style={{ border: "none" }}>
                    <button className="input-group-text material-symbols-outlined p-1" style={{ fontSize: "1.3em" }}>
                        search
                    </button>
                </div>
            </span>
        </form>
    )
    

    return (
        <div className="row">
            <div className="container mb-3">
                {searchForm()}
            </div>
        </div>
    )
}

export default Search
