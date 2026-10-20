import "dotenv/config";
import express from "express";
import cors from "cors"
import { connectDb } from "./src/config/db.js";
import authRoutes from "./src/modules/auth/auth.routes.js";
import onboardingRoutes from "./src/modules/onboarding/onboarding.routes.js";
import propertyRoutes from "./src/modules/properties/properties.routes.js";
import messagesRoutes from "./src/modules/messages/messages.routes.js";
import emailRouter from "./src/modules/email/email.route.js";



const app = express()
const PORT = process.env.PORT
app.use(express.json())
app.use(cors())
app.use('/api/auth', authRoutes)
app.use('/api/onboarding', onboardingRoutes)
app.use('/api/properties', propertyRoutes)
app.use('/api/messages/conversations', messagesRoutes)
app.use("/api/email", emailRouter);
app.get('/', (_, res)=>{
    return res.json({
        message:"Welcome to GreenSpringHomes"
    })
})
console.log(PORT);

connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server Running on ${PORT}`);        
    })
})