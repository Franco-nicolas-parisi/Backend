import { Router } from "express";
import { productManager} from "../index.js";

const productsRouter = Router()

productsRouter.get(`/`, async (req, res)=>{
    try {
        const {limit} = req.query;
        const products = await productManager.getProducts();

    if(limit){
        const limitProducts = products.slice(0, limit);
        return res.json(limitProducts)
    }
    return res.json(products)
    } catch (error) {
        console.log(error);
        res.send("Error al intentar recibir los productos")
    }
})

productsRouter.get(`/:pid`, async (req, res) => {
    try {
        const {pid} = req.params;
        const products = await productManager.getProductsById(pid);
        res.json(products)
    } catch (error) {
        console.log(error);
        res.send("Error al intentar despedir los productos")
    }
})

productsRouter.post(`/`, async (req, res)=>{
    try {
        const  {title, description, price, thumbnail, code, stock, status = true, category} = req.body;

        const response = await productManager.addProduct({title, description, price, thumbnail, code, stock, status, category});
        res.json(response)
    } catch (error) {
        console.log(error);
        res.send("Error al intentar agregar")
        
    }
})

productsRouter.put('/:pid', async(req, res)=>{
    const {pid} = req.params;
    try {
        const  {title, description, price, thumbnail, code, stock, status = true, category} = req.body;
        const response = await productManager.updateProduct(pid, {title, description, price, thumbnail, code, stock, status, category});
        res.json(response)
    } catch (error) {
        res.send(`Error al intentar editor producto ${pid}`)
    }
})

productsRouter.delete(`/:pid`, async(req, res) =>{
    const {pid} = req.params
    try {
        await productManager.deleteProduct(id),
        res.send(`producto eliminado correctamente`)
    } catch (error) {
        res.send(`Error al intentar eliminar producto ${pid}`)
    }

})

export {productsRouter}