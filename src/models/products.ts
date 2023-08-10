import mongoose, { Schema, Document, Model } from "mongoose";

interface IProduct extends Document {
    name: string;
    description: string;
    richDescription: string;
}

const productSchema: Schema<IProduct> = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    richDescription: {
        type: String,
        default: '',
    },
});
productSchema.virtual('id').get(function(this:Document) {
    return this._id.toHexString();
});

productSchema.set('toJSON', {
    virtuals: true,
});

export const Product: Model <IProduct> = mongoose.model('Product',productSchema);
