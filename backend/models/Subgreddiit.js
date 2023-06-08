import mongoose from "mongoose";

const { Schema } = mongoose;

const SubgreddiitSchema = new Schema({
  name: { type: String, unique: true },
  description: { type: String },
  moderatorId: { type: Schema.Types.ObjectId, ref: 'User' },
  tags: [{ type: String }],
  bannedWords: [{ type: String }],

  users: [{
    status: { type: String, enum: ['moderator'] },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
  }],
});

const Subgreddiit = mongoose.model('Subgreddiit', SubgreddiitSchema);

export default Subgreddiit;