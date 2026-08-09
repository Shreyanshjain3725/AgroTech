const mongoose = require('mongoose');

const purchaseRequestSchema = new mongoose.Schema(
  {
    farmerUsername: { type: String, required: true },
    cropType: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    requestDate: { type: Date, required: true },
    neededDate: { type: Date, required: true },
    status: { type: String, default: 'pending' },
    middlemanUsername: { type: String, default: null },
  },
  { timestamps: false }
);

function formatDate(d) {
  if (!d) return null;
  return d.toISOString().slice(0, 10);
}

purchaseRequestSchema.set('toJSON', {
  virtuals: true,
  transform(_doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    ret.requestDate = formatDate(ret.requestDate);
    ret.neededDate = formatDate(ret.neededDate);
    return ret;
  },
});

module.exports = mongoose.model('PurchaseRequest', purchaseRequestSchema);
