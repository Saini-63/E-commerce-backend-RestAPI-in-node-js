import { userModel } from "../models/userModel.js";


//<================Register User Controller    With POST Method =============>
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

//<============ Login  User Controller with GET Method ==============>
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Validation
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: 'Please provide email and password!',
            })
        }

        //Check User
        const user = await userModel.findOne({ email });

        //Check user validation
        if (!user) {
            return res.status(500).send({
                success: false,
                message: 'User Not Found',
            })
        }

        //Check Password
        const isMatch = await user.comparePassword(password);

        //Check Password Validation
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: 'Invalid Credentials',
            })
        }
        //Token
        const token = user.generateToken();
        res.status(200).cookie('token', token, {
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
            secure: process.env.NODE_ENV === 'development' ? true : false,
            httpOnly: process.env.NODE_ENV === 'development' ? true : false,
            sameSite: process.env.NODE_ENV === 'development' ? true : false,
        }).send({
            success: true,
            message: 'Login Successfully',
            token,
            user,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Login API',
            error,
        })
    }
}