import Api from './api.service'

class CarritoService extends Api {
    getAllCarritos(){
        return this.resource.get('carritos')
    }
    getCarritoById(idCarrito){
        return this.resource.get(`carritos/${idCarrito}`)
    }
    getUserCarritos(idUser){
        return this.resource.get(`users/${idUser}/carritos`)
    }
    createCarrito(carrito){
        return this.resource.post('carritos',carrito)
    }
    updateCarrito(idCarrito,updatedCarrito){
        return this.resource.put(`carritos/${idCarrito}`,updatedCarrito)
    }
    deleteCarrito(idCarrito){
        return this.resource.delete(`carritos/${idCarrito}`)
    }
}

export default new CarritoService('carritos');