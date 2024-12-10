const mongoose = require('mongoose');


// Modèle de schema pour MongoDB
const bookSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    imageUrl: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    ratings:[
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
            grade: { type: Number, required: true, min: 0, max: 5 }
        }
    ],
    averageRating: { type: Number, default: 0},
});

bookSchema.pre('save', function(next) {
    if (this.isModified('ratings') || this.isNew) {
        this.averageRating = this.ratings.reduce((sum,rating) => sum + rating.grade, 0) / this.ratings.length;
    }
    next();

});
bookSchema.methods.addOrUpdateRating = async function ( userId, grade){

const existingRating = this.ratings.find(rating => rating.userId.equals(userId));
if (existingRating) {
    throw new Error("Vous avez déjà noté ce livre.");
} 
    this.ratings.push({ userId, grade,  bookId: this._id });
   return this.save(); 
};


module.exports = mongoose.model('Book', bookSchema);