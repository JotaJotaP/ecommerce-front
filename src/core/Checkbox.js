import React, { useState} from "react";

const Checkbox = ({categories, handleFilters}) => {
    const [checked, setChecked] = useState([])

    const handleToggle = c => () => {
        const currentCategoryId = checked.indexOf(c) /*recebemos uma category quando houve ro evento onchange, 
        depois procura-se no array "cheked" por uma category com esse nome,
         se se encontrar, retoma o index desta, se não, retoma -1*/
        const newCheckedCategoryId = [...checked] //todas as categorias checadas
        //se a que foi clicada ainda não estava checada, adiciona, se já estava, tira
        if(currentCategoryId === -1) { //se não tiver checada
            newCheckedCategoryId.push(c)
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1)
        }
        // console.log(newCheckedCategoryId)
        setChecked(newCheckedCategoryId)
        handleFilters(newCheckedCategoryId  )
    }   

    return (
        categories.map((c, i) => (
            <li key={i} className="list-unstyled">
                <input onChange={handleToggle(c._id)} type="checkbox" className="form-check-input" checked={checked.includes(c._id)}/>
                <label className="form-check-label">{c.name}</label>
            </li>
        ))
    )
}
export default Checkbox