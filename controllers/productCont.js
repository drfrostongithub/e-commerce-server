const { Product } = require(`../models/index`)


class ProductController {

    static async readProduct(req, res, next) {
        try {
            const product = await Product.findAll({
                order: [['id', 'ASC']]
            })
            res.status(200).json({ product })
        } catch (err) {
            next(err)
        }
    }

    static async readProductById(req, res, next){
        try {
            const product = await Product.findOne({
                where: {
                    id: +req.params.id
                }
            })
            if (product === null){
                throw { name: `Error not found`} //handle to errorhandle
            }
            res.status(200).json({ product })
        } catch (err) {
            next(err)
        }
    }

    static async createProduct(req, res, next) {
        
        const { name, img_url, description, price, stock } = req.body
        try {
            const product = await Product.create({
                name,
                img_url,
                description,
                price,
                stock
            })
            res.status(201).json({ product })
        }

        catch (err) {
            next(err)
        }
    }

    static async updateProduct(req, res, next) {
        
        const { name, img_url, description, price, stock } = req.body
        const { id } = req.params
        try {
            const product = await Product.update({
                name,
                img_url,
                description,
                price,
                stock
            },
            {
                where: {
                    id
                },
                returning: true
            })
            if (product[0]===0) {
                throw { name: `Error not found` }
            } else {
                res.status(200).json({ product })
            }

        } catch (err) {
            next(err)
        }
    }

    static async deleteProducts (req,res,next){
        try {
            const product = await Product.destroy(
                {
                    where: {
                        id: +req.params.id
                    }
                }
            )
            if (product === 0) {
                throw { name: `Error not found` }
            } else {
                res.status(200).json({ msg: 'product succes to delete' })
            }
        }
        catch (err) {
            next(err)
        }

    }
}


module.exports = ProductController