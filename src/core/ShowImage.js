import React from "react";
import {API} from "../config"

const ShowImage = ({item, url, style}) => {
    return(
    <div className="product-img" >
        <img src={`${API}/${url}/photo/${item._id}`} alt={item.name} style={style}/>
    </div>

    )
}

export default ShowImage