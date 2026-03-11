import mongoose, { Schema, Document } from 'mongoose';

export interface IPharmacy extends Document {
    userId: mongoose.Types.ObjectId;
    name: string;
    location: string;
    city: string;
    isBlockchainVerified: boolean;
    rating: number;
    walletAddress?: string;
}

const PharmacySchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    city: { type: String, required: true },
    isBlockchainVerified: { type: Boolean, default: false },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    walletAddress: { type: String }
}, {
    timestamps: true,
});

export const Pharmacy = mongoose.models.Pharmacy || mongoose.model<IPharmacy>('Pharmacy', PharmacySchema);
