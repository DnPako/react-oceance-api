const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const ProductModel = mongoose.model('Product');

const DoesProductExist = async (p_product, next) => {
    try {
        const foundProduct = await ProductModel.findOne({reference: p_product.reference}).exec();

        return foundProduct !== null;
    } catch (error) {
        return next(error);
    }
};

const deleteProduct = async (id, res, next) => {
    try {
        await ProductModel.findByIdAndDelete(id, (error, document) => {
            if (error) {
                return next(error);
            }

            if (document === null) {
                return next(new Error("Product doesn't exist!"));
            }

            res.json({message: "Product deleted successfully!"});
        });

    } catch (error) {
        return next(error);
    }
};

const updateProduct = async (updateOptions, res, next) => {
    try {
        await ProductModel.findById(updateOptions.id, async (error, product) => {
            if (error) {
                return next(error);
            }

            if (product === null) {
                return next(new Error("Product doesn't exist!"));
            }

            for (const data of updateOptions.dataForUpdate) {
                product[data.key] = data.value;
            }
            product.dateUpdate = Date.now();
            const data = await product.save();

            res.json({data, message: "Product updated successfully!"});
        });

    } catch (error) {
        return next(error);
    }
};

const getProductById = async (id, res, next) => {
    try {
        await ProductModel.findById(id, async (error, product) => {
            if (error) {
                return next(error);
            }

            if (product === null) {
                return next (new Error("Product doesn't exist!"));
            }

            res.json({data: product});
        });

    } catch (error) {
        return next(error);
    }
};

const getProducts = async (res, next) => {
    try {
        await ProductModel.find().exec(async (error, products) => {
            if (error) {
                return next(error);
            }

            res.json({data: products});
        });

    } catch (error) {
        return next(error);
    }
};

const addProduct = async (p_product, res, next) => {
    try {
        const productAdded = await p_product.save();
        const data = {
            data: productAdded,
            message: "Product added successfully!"
        };

        res.setHeader('Content-Type', 'application/json');
        res.send(data).end();

    } catch (error) {
        return next(error);
    }
};

router.post('/add', async (req, res, next) => {
    const {name, reference, category} = req.body;
    const product = new Product({
        name,
        reference,
        category
    });

    if (await DoesProductExist(product, next)) {
        return next(new Error("Product with this reference already exists"));
    }

    addProduct(product, res, next);
});

router.delete('/delete/:id', (req, res, next) => {
    const {id} = req.params;
    deleteProduct(id, res, next);
});

router.put('/update/:id', (req, res, next) => {
    const {id} = req.params;
    const updateOptions = {...req.body, id};
    updateProduct(updateOptions, res, next);
});

router.get('/one/:id', (req, res, next) => {
    const {id} = req.params;
    getProductById(id, res, next);
});

router.get('/all', (req, res, next) => {
    getProducts(res, next);
});

module.exports = router;


