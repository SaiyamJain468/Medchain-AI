import mongoose, { Schema, Document } from 'mongoose';

export interface IMedicineListing extends Document {
    pharmacyId: mongoose.Types.ObjectId;
    drugName: string;
    manufacturer: string;
    price: number;
    stock: number;
    isBlockchainVerified: boolean;
    batchIds: string[]; // List of batches they currently hold
}

const MedicineListingSchema: Schema = new Schema({
    pharmacyId: { type: Schema.Types.ObjectId, ref: 'Pharmacy', required: true },
    drugName: { type: String, required: true },
    manufacturer: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    isBlockchainVerified: { type: Boolean, default: false },
    batchIds: [{ type: String }]
}, {
    timestamps: true,
});

export const MedicineListing = mongoose.models.MedicineListing || mongoose.model<IMedicineListing>('MedicineListing', MedicineListingSchema);
