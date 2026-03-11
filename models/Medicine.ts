import mongoose, { Schema, Document } from 'mongoose';

export interface IMedicine extends Document {
    barcode: string;
    name: string;
    manufacturer: string;
    batchNumber: string;
    expiryDate: Date;
    manufacturingDate: Date;
    status: 'AUTHENTIC' | 'SUSPICIOUS' | 'RECALLED';
    description?: string;
    transitHistory: Array<{
        location: string;
        timestamp: Date;
        status: string;
    }>;
}

const MedicineSchema: Schema = new Schema({
    barcode: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    batchNumber: { type: String, required: true },
    expiryDate: { type: Date, required: true },
    manufacturingDate: { type: Date, required: true },
    status: { type: String, enum: ['AUTHENTIC', 'SUSPICIOUS', 'RECALLED'], default: 'AUTHENTIC' },
    description: { type: String },
    transitHistory: [{
        location: String,
        timestamp: { type: Date, default: Date.now },
        status: String
    }]
}, {
    timestamps: true,
});

export const Medicine = mongoose.models.Medicine || mongoose.model<IMedicine>('Medicine', MedicineSchema);
