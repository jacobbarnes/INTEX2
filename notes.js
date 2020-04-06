import { useRouteMatch } from "react-router-dom"
import React from 'react'

const PRODUCTS = [1,2,3,4]

//foreach for array
const st = "My products are: " + PRODUCTS.map((p, i) => {
    return p + 10
})

//convert array to object then map it to do a foreach on an object like a dictionary
Object.values(PRODUCTS).map

//filter
PRODUCTS.filter

//individual product page picture div will be float-right

//Multiselect: shift-ctrl-l

//Lorem Ipsum: F1 > Lorem Ipsum

//4 images
const [imgIdx, setImgIdx] = 
    React.useState(1)

//get stuff out of the url
useRouteMatch

//images
//<img src={"/media/products/" + p.filename + "-1.png"} />