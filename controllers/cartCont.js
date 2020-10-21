const { Cart, Product } = require(`../models/index`)

class CartController {

    static async getReadCart(req, res, next) {
        console.log('msk read cart')
        console.log(req.decodedUser)
        try {
            const cart = await Cart.findAll({
                where: { UserId: req.decodedUser.id }
            })
            res.status(200).json({ cart })
        } catch (err) {
            next(err)
        }
    }

    static async postCreateCart(req, res, next) {
        try {
            const checkProduct = await Product.findByPk(req.params.id)
            if (checkProduct.stock - 1 >= 0) {
                const checkCart = await Cart.findOne({
                    where: {
                        UserId: req.decodedUser.id,
                        ProductId: +req.params.id
                    }
                })
                if (checkCart) {
                    if (checkProduct.stock > checkCart.amount + 1) {
                        const patchCart = await Cart.update(
                            {
                                amount: checkCart.amount + 1
                            },
                            {
                                where: {
                                    UserId: req.decodedUser.id,
                                    ProductId: +req.params.id
                                },
                                returning: true
                            })
                        if (patchCart[0] === 0) {
                            throw { name: `Error not found` }
                        } else {
                            res.status(200).json(patchCart[1][0])
                        }
                    }
                    else {
                        throw { name: `Stock isn't enough` }
                    }
                }
                else {
                    const cart = await Cart.create({
                        UserId: req.decodedUser.id,
                        ProductId: +req.params.id,
                        amount: 1
                    })
                    res.status(201).json(cart)
                }
            }
            else {
                throw { name: `Stock isn't enough` }
            }
        } catch (err) {
            next(err)
        }
    }

    static async patchUpdateCart(req, res, next) {
        const { amount } = req.body
        try {
            const cartSelected = await Cart.findByPk(req.params.id)
            if (cartSelected === null) {
                throw { name: `Error not found` }
            } else {
                const checkProduct = await Product.findByPk(cartSelected.ProductId)
                if (checkProduct) {
                    if (checkProduct.stock >= amount) {
                        const cart = await Cart.update(
                            {
                                amount
                            },
                            {
                                where: {
                                    UserId: +req.decodedUser.id,
                                    id: req.params.id
                                },
                                returning: true
                            }
                        )
                        if (cart[0] === 0) {
                            throw { name: `Error not found` }
                        } else {
                            res.status(200).json(cart[1][0])
                        }
                    }
                    else {
                        throw { name: `Stock isn't enough` }
                    }
                }
                else {
                    throw { name: `Stock isn't enough` }
                }
            }
        }
        catch (err) {
            next(err)
        }
    }

    static async deleteCart(req, res, next) {
        try {
            const cart = await Cart.destroy(
                {
                    where: {
                        id: +req.params.id
                    }
                }
            )
            if (cart === 0) {
                throw { name: `Error not found` }
            } else {
                res.status(200).json({ msg: 'Product succes to delete' })
            }
        }
        catch (err) {
            next(err)
        }
    }

}

module.exports = CartController