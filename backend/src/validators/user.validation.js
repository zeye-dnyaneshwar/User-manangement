const Joi=require("joi")

const updateSchema=Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .regex(/^[a-zA-Z\s]+$/)
        .messages({
            'string.base': 'Name should be a type of text',
            'string.empty': 'Name cannot be empty',
            'string.min': 'Name should have at least 3 characters',
            'string.max': 'Name should have at most 30 characters',
            'string.pattern.base': 'Name can only contain alphabets and spaces',
        }),
        email: Joi.string()
        .email()
        .messages({
            'string.base': 'Email should be a type of text',
            'string.empty': 'Email cannot be empty',
            'string.email': 'Email must be a valid email',
        }),
    password: Joi.string()
        .min(8)
        .max(30)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .messages({
            'string.base': 'Password should be a type of text',
            'string.empty': 'Password cannot be empty',
            'string.min': 'Password should have at least 8 characters',
            'string.max': 'Password should have at most 30 characters',
            'string.pattern.base': 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character',
        }),
        bio:Joi.string(),
        phone:Joi.string(),
        image:Joi.string().uri().optional().allow(''),
        accountType:Joi.string().valid("Public","Private")
})

module.exports={updateSchema}