import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'; 


const Form = () => {
  

    //define the schema of our received data
/*
List of validation rules supported:

required
min
max
minLength
maxLength
pattern
validate
 */
//you can ignore adding .shape method
    const schema = yup.object().shape({
        fullName: yup.string().required() //the key name should be exactly as the name used in ...register
        .matches(/^[a-zA-Z ]+$/, "Only alphabets and spaces are allowed")
        .trim(),   //removes any leading or trailing whitespaces

        email: yup.string().email("Invalid Email").required("Email is required") ,

        age: yup.number().integer().min(18).max(35).typeError("Age must be a number")
        .required("Your Age must be a number"), 

        password : yup.string()
        .min(8,"At least 8 characters are needed").max(12)
        .matches(/^[A-Za-z0-9]+$/, "only allows alphabets and numeral characters include special characters" )
        .required("Password is required"),

        confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Password Dont match!").required(),
        
    })

//on submit function to get the values of the input fields and display them in console.log
const onSubmit2 = (data) =>{
    console.log(data);
    }
    //our form upon submission returns an object of the inputs values

    //in react form onsubmit function you can pass a function directly with a parameter 
    //as long as it returns another function that handles the data submission
    const { register, handleSubmit, watch, formState:{errors} } = useForm({
        resolver: yupResolver(schema)
    });

    const watchedFields = watch(["age", "password", "fullName"]);
    console.log(watchedFields);

  return (

    <form onSubmit={handleSubmit(onSubmit2)}>
        <input type="text" placeholder="full name.." {...register("fullName")} />
        {errors.fullName && <span className='error'>{errors.fullName.message}</span>}

        {/*for vaildation you register accepts an object */}
        <input type="email" placeholder="Email.." {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}

        <input type="number" placeholder="Age.." {...register("age")} />
        {errors.age && <span>{errors.age.message}</span>}

        <input type="password" placeholder="Password.." {...register("password")} />
        {errors.password && <span>{errors.password.message}</span>}

        <input type="password" placeholder="Confirm passowrd.." {...register("confirmPassword")} />
        {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
        <input type="submit" />
    </form>    
    
  )
}

export default Form