// const express = require("express");
// const dotEnv = require('dotenv');
// const mongoose = require('mongoose');
// const vendorRoutes = require('./routes/vendorRoutes');
// const bodyParser = require('body-parser');
// const firmRoutes = require('./routes/firmRoutes');
// const productRoutes = require('./routes/productRoutes');
// const cors = require('cors');
// const path = require('path')

// const app = express()

// const PORT = process.env.PORT || 4000;

// dotEnv.config();
// app.use(cors())

// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log("MongoDB connected successfully!"))
//     .catch((error) => console.log(error))

// app.use(bodyParser.json());
// app.use('/vendor', vendorRoutes);
// app.use('/firm', firmRoutes)
// app.use('/product', productRoutes);
// app.use('/uploads', express.static('uploads'));

// app.listen(PORT, () => {
//     console.log(`server started and running at ${PORT}`);
// });

// app.use('/', (req, res) => {
//     res.send("<h1> Welcome to SUBY");
// })

require('dotenv').config(); // Load env variables at the very top

const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Routes
const vendorRoutes = require('./routes/vendorRoutes');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected successfully!"))
.catch((error) => console.error("❌ MongoDB connection error:", error));

// Routes
app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes);
app.use('/product', productRoutes);

// Root route
app.get('/', (req, res) => {
    res.send("<h1>Welcome to SUBY</h1>");
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
