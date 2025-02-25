import React, { useState, useEffect } from "react"
import Layout from "./Layout"
import { getCategories, getFilteredProducts } from "./apiCore"
import Checkbox from "./Checkbox"
import Card from "./Card"
import RadioBox from "./RadioBox"
import { prices } from "./fixedPrices"
import Search from "./Search"

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
    const limit = 6

    const init = () => {
    getCategories().then(data => {
        if (data.error) {
            setError(data.error);
        } else {
            setCategories(data);
        }
    });

    // Buscar o número total de produtos logo ao carregar a página
    getFilteredProducts(0, 1000, {}).then(data => {
        if (data.error) {
            setError(data.error);
        } else {
            setSize(data.size); // Atualiza o total de produtos disponíveis
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

    const loadMore = () => {
        let toSkip = skip + limit;
        getFilteredProducts(toSkip, limit, { ...myFilters.filters }).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setFilteredResults(prevResults => [...prevResults, ...data.data])
                setSkip(toSkip)
            }
        })
    }
    const loadMoreButton = () => {
            if( filteredResults.length >= limit && size > 0 && filteredResults.length < size) {
                return (
                        <div className="d-flex justify-content-center">
                            <button onClick={loadMore} className="btn btn-secondary mb-5">Load More</button>
                        </div>
                    )
    
            } 
    }

    useEffect(() => {
        init()
        loadFilterResults(myFilters.filters)
    }, [])

    useEffect(() => {
        showMessage(filteredResults.length, myFilters.filters);
    }, [filteredResults]);
    

    const handleFilters = (filters, filterBy) => {
        const newFilters = { ...myFilters }
        newFilters.filters[filterBy] = filters

        if (filterBy === "price") {
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues
        }
        setMyFilters(newFilters)
        setFilteredResults([]) // Limpa os produtos antes de buscar os novos
        setSkip(0)
        loadFilterResults(newFilters.filters)
    }

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


    const showMessage = (productsLength, filters) => {
        getFilteredProducts(0, 1000, filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setSize(data.size);
                if (productsLength === 0) {
                    setProductMessage(`No products found ${searchQuery ? `for "${searchQuery}"` : ""}`);
                } else {
                    setProductMessage(`Showing ${productsLength} of ${data.size} products${searchQuery ? ` for "${searchQuery}"` : ""}`);
                }
            }
        })
    }
    
    
    return (
        <Layout title="Shop Page" description="Find books of your beautiful choices" className="container-fluid" layoutStyle={{padding: "35px"}}>
            <div className="row">
                <div className="col-2">
                    <Search setFilteredResults={setFilteredResults} setSearchQuery={setSearchQuery}/>
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
                    {/* {filteredResults.length > 0 ? (
                        <h5 className="text-muted mb-4">Showing {filteredResults.length} products</h5>
                    ) : (
                        <h5 className="text-muted mb-4">No products found</h5>
                    )} */}
                    <p style={{fontSize:"1.1em"}} className="mb-4">{productMessage}</p>
                    <div className="row">
                        {filteredResults.map((product, i) => (
                            <div className="col-2 mb-3" key={i}><Card product={product} 
                            imageStyle={{height: '200px', width: '100%' }} 
                            showAddCartButton={product.quantity === 0 ? false : true}
                            viewProductButtonSize = {{                                
                                paddingLeft: "55px",
                                paddingRight: "55px",
                                paddingTop: "3px",
                                paddingBottom: "3px",
                                borderRadius: "15px",
                            }}
                            />
                            </div>
                        ))}
                    </div>
                    <hr />
                    {loadMoreButton()}
                </div>
            </div>
        </Layout>
    );
};

export default Shop
