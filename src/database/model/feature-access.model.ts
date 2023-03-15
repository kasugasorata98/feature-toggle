import mongoose, { Schema, Document, Types } from "mongoose";

export interface FeatureAccess extends Document {
  email: string;
  features: [
    {
      name: string;
      enabled: boolean;
    }
  ];
}

const featureAccessSchema: Schema = new Schema<FeatureAccess>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    features: [
      {
        name: {
          type: String,
          required: true,
        },
        enabled: {
          type: Boolean,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<FeatureAccess>(
  "FeatureAccess",
  featureAccessSchema
);
