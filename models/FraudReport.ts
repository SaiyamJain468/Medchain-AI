import mongoose, { Schema, Document } from 'mongoose';

export interface IFraudReport extends Document {
    barcode?: string;
    medicineName?: string;
    latitude: number;
    longitude: number;
    city: string;
    reason: string;
    reportedAt: Date;
}

const FraudReportSchema: Schema = new Schema({
    barcode: { type: String },
    medicineName: { type: String },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    city: { type: String, required: true },
    reason: { type: String, required: true },
    reportedAt: { type: Date, default: Date.now }
}, {
    timestamps: true,
});

export const FraudReport = mongoose.models.FraudReport || mongoose.model<IFraudReport>('FraudReport', FraudReportSchema);
