import React, { useState, useEffect, Fragment } from "react"
import Layout from "./Layout"
import { getCategories, getFilteredProducts, list } from "./apiCore"
import Checkbox from "./Checkbox"
import Card from "./Card"
import RadioBox from "./RadioBox"
import { prices } from "./fixedPrices"
import Search from "./Search"
import CartSidebar from "./CartSidebar"

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)
    const [skip, setSkip] = useState(0)
    const [size, setSize] = useState(0)
    const [filteredResults, setFilteredResults] = useState([])
    const [productMessage, setProductMessage] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const [sidebar, setSidebar] = useState(false)
    const limit = 6
    const [data, setData] = useState({
            search: "",
            category: "",
        })
        const { search, category } = data
    const [query, setQuery] = useState(false)
//-----------------------------------------------------------------------------------


    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setCategories(data)
            }
        });

        // Buscar o número total de produtos logo ao carregar a página
        getFilteredProducts(0, 1000, {}).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setSize(data.size) // Atualiza o total de produtos disponíveis
            }
        });
    };

    const loadFilterResults = (newFilters) => {
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setFilteredResults(data.data);
                setSize(data.size)
                setSkip(0)
            }
        })
    }

    const handleFilters = (filters, filterBy) => {
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;
    
        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
    
        setMyFilters(newFilters);
        setFilteredResults([]);
        setSize(0);
    
        // ✅ Include searchQuery in the API call
        getFilteredProducts(0, 6, { ...newFilters.filters, search: searchQuery }) 
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setFilteredResults(data.data);
                    setSize(data.size);
                }
            });
    };
    
    
    

    const handlePrice = value => {
        const data = prices
        let array = []
        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array
            }
        }
        return array
    }

    const searchSubmit = (e) => {
        e.preventDefault();
        
        // ✅ Ensure search query is applied along with filters
        list({ 
            search: search || undefined, 
            category: category || undefined, 
            limit: 6, 
            skip: 0 
        }).then(response => {
            if (response.error) {
                console.log(response.error);
            } else {
                setFilteredResults(response.data); // response.data contains the actual products
            }
        });
        setQuery(true)
    };

        const handleChange = name => event => {
            setData({ ...data, [name]: event.target.value })
            if (name === "search") {
                setSearchQuery(event.target.value)  // Atualiza o termo de pesquisa
            }
        }
    
    


//SEARCH BAR
const searchForm = () => (
    <form onSubmit={searchSubmit}>
        <span className="input-group-text mb-3 pr-0">
            <div className="input-group input-group-sm">
                <input
                    type="search"
                    className="form-control pr-0"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={handleChange("search")}
                />
            </div>
            <div className="btn input-group-append" style={{ border: "none" }}>
                <button type="submit" className="input-group-text material-symbols-outlined p-1" style={{ fontSize: "1.3em" }}>
                    search
                </button>
            </div>
        </span>
    </form>
);


//MESSAGE SHOWING ... PRODUCTS

    const showMessage = (productsLength, filters) => {
        getFilteredProducts(0, 1000, filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setSize(data.size);
    
                const validLength = productsLength !== undefined ? productsLength : 0
                
                if (validLength === 0) {
                    setProductMessage(`No products found ${searchQuery ? `for "${searchQuery}"` : ""}`);
                } else {
                    if (searchQuery) {
                        setProductMessage(`Showing ${validLength} products for "${searchQuery}"`);
                    } else {
                        setProductMessage(`Showing ${validLength} of ${data.size} products`);
                    }
                }
            }
        })
    }
    
//LOAD MORE BUTTON

    const loadMore = () => {
        let toSkip = skip + limit;
        !query && getFilteredProducts(toSkip, limit, { ...myFilters.filters }).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setFilteredResults(prevResults => [...prevResults, ...data.data])
                setSkip(toSkip)
            }
        })
        query && list({ search, category, limit, skip: toSkip }).then(response => {
        if (response.error) {
            setError(response.error);
        } else {
            setFilteredResults(prevResults => [...prevResults, ...response.data]); // Append new results
            setSkip(toSkip); // Update skip count
            setSize(response.size); // Update size to check if more products exist
        }
    })
    }
    const loadMoreButton = () => {
        if (filteredResults.length < size) {
            return (
                <div className="d-flex justify-content-center">
                    <button onClick={loadMore} className="btn btn-secondary mb-5">Load More</button>
                </div>
            );
        }
        return null; // Don't render anything if there's nothing more to load
    };
    
    
//useEffect
    
    useEffect(() => {
        showMessage(filteredResults.length, myFilters.filters);
    }, [filteredResults])
    useEffect(() => {
        init()
        loadFilterResults(myFilters.filters)
    }, [])
    useEffect(() => {
        if (sidebar) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [sidebar])

    //HTML  

    return (
        <Fragment>
            {sidebar && <CartSidebar setSidebar={setSidebar} />}

            <Layout title="Shop Page" description="Find books of your beautiful choices" className="container-fluid" layoutStyle={{ padding: "35px" }}>
                {/* Search component */}
                <div className="mb-4">
                    {searchForm()}
                </div>

                <div className="row ">
                    <div className="col-2">
                        <h5>Filter by categories</h5>
                        <ul>
                            <Checkbox categories={categories} handleFilters={filters => handleFilters(filters, 'category')} />
                        </ul>
                        <h5>Filter by price range</h5>
                        <div>
                            <RadioBox prices={prices} handleFilters={filters => handleFilters(filters, 'price')} />
                        </div>
                    </div>

                    <div className="col-10">
                        <h2 className="mb-3">Products</h2>
                        <p style={{ fontSize: "1.1em" }} className="mb-4">{productMessage}</p>
                        <div className="row">
                            {filteredResults && Array.isArray(filteredResults) && filteredResults.map((product, i) => (
                                <div className="col-2 mb-3" key={i}>
                                    <Card product={product}
                                        imageStyle={{ height: '200px', width: '100%' }}
                                        showAddCartButton={product.quantity === 0 ? false : true}
                                        cardPB="40px"
                                        viewProductButtonSize={{
                                            paddingLeft: "55px",
                                            paddingRight: "55px",
                                            paddingTop: "3px",
                                            paddingBottom: "3px",
                                            borderRadius: "15px",
                                        }}
                                        setSidebar={setSidebar}
                                    />
                                </div>
                            ))}
                        </div>
                        <hr />
                        {loadMoreButton()}
                    </div>
                </div>
            </Layout>
        </Fragment>
    )
}

export default Shop
