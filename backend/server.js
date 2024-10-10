import express from 'express';
import dotenv from 'dotenv';
import authRoutes from '../backend/routes/auth.route.js'
import productRoutes from '../backend/routes/product.route.js'
import carRoutes from '../backend/routes/cart.route.js'
import couponRoutes from '../backend/routes/coupon.route.js'
import paymentRoutes from '../backend/routes/payment.route.js'
import analyticsRoutes from '../backend/routes/analytics.route.js'
import { connectDB } from './lib/lib.js';
import cookieParser from 'cookie-parser';
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 5000

const __dirname = path.resolve();
const app = express()

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser())
app.use("/api/auth" , authRoutes )
app.use("/api/products" , productRoutes ) 
app.use("/api/cart" , carRoutes ) 
app.use("/api/coupons" , couponRoutes ) 
app.use("/api/payments" , paymentRoutes ) 
app.use("/api/analytics" , analyticsRoutes ) 


if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}



app.listen(PORT , () => {
    console.log('server is runnuing in port ' + PORT);
    connectDB();
})