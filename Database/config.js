const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(`mongodb+srv://bastienschektman:3J3NXpTy3M3PIA9J@viviapplication.ocvi1pq.mongodb.net/`);
    console.log('Connexion à la base de données réussie');
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    process.exit(1);
  }
};

module.exports = dbConnection;