import express from 'express';
import { Product } from '../models/products';
import mongoose from 'mongoose';

const productsRouter = express.Router();

productsRouter.get('/', async (req, res) => {
  const productList = await Product.find();

  if (!productList) {
    return res.status(500).json({
      success: false,
    });
  }

  res.status(200).send(productList);
});

export default productsRouter;
