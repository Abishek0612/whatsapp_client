import * as Yup from 'yup';


//Sign up
export const signUpSchema = Yup.object({
    // name
    name: Yup.string()
        .required("Name is required.")
        .matches(/^[a-zA-Z_]*$/, "No special characters allowed.")
        .min(2, "Name must be between 2 and 16 characters.")
        .max(16, "Name must be between 2 and 16 characters."),

    // email
    email: Yup.string().required('Email address is required.')
        .email('Invalid email address.'),

    // status
    status: Yup.string()
        .max(64, 'Status must be less than 64 characters.'),

        //password
        password: Yup.string()
        .required("Password is required.")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
          "Password must contain atleast 6 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character."
        ),
    });


    // Sign in
export const signInSchema = Yup.object({
  
    // email
    email: Yup.string().required('Email address is required.')
        .email('Invalid email address.'),

        //password
        password: Yup.string()
        .required("Password is required.")

    });