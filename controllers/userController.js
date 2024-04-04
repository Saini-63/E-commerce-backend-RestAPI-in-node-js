import { userModel } from "../models/userModel.js";

export const registerController = async (req, res) => {
    try {
        const { name, email, password, address, city, country, phone } = req.body;
        //validation
        if (!name || !email || !password || !address || !city || !country || !phone) {
            return res.status(500).send({
                success: false,
                message: 'Please Provide all fields',
            })
        }

        // check Existing user
        const existingUser = await userModel.findOne({ email })
        //Existing User validation
        if (existingUser) {
            return res.status(500).send({
                success: false,
                message: 'E-mail already taken'
            })
        }
        const user = await userModel.create({
            name,
            email,
            password,
            address,
            city,
            country,
            phone,
        })
        res.status(201).send({
            success: true,
            message: "Registration Success Please Login!",
            user,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Register API',
            error
        })
    }
}