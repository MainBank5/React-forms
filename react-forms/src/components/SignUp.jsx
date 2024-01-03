import { useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import classes from './Signup.module.css'

const SignUp = () => {

    const schema = yup.object().shape({
        firstName:yup.string().required().matches(/^[A-Za-z]+$/, "Name must contain alpabets only!")
        .trim(),

        lastName:yup.string().required().matches(/^[A-Za-z]+$/, "Name must contain alphabets only"),

        email:yup.string().email("email must contain @").required("Please provide your email"),

        password:yup.string().min(4, "Password is too short").matches(/^[A-Za-z0-9]+$/, "password must contain alphanumerals")
        .required(),

        confirmPassword:yup.string().oneOf([yup.ref("password"), null], "Password doesn't match").required(),
    })





    const {register, handleSubmit, watch, formState:{errors} }= useForm({
        resolver:yupResolver(schema)
    });
    const submit = (data) => {
        console.log(data)
    }
    
  return (
    <div className={classes.wrapper}>
        <form onSubmit={handleSubmit(submit)} className={classes.form}>
        <input type="text" placeholder="Enter first name" {...register("firstName")} />
        {errors.firstName && <span>{errors.firstName.message}</span>}

        <input type="text" placeholder="Enter last name" {...register("lastName")} />
        {errors.lastName && <span>{errors.lastName.message}</span>}

        <input type="email" placeholder="Enter email" {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}

        <input type="password" placeholder="Enter password" {...register("password")} />
        {errors.password && <span>{errors.password.message}</span>}

        <input type="password" placeholder="Enter password" {...register("confirmPassword")} />
        {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
        <input type="submit" className={classes.btn}/>
    </form>
    <h1>{watch(["firstName"])}</h1>
    <h1>{watch(["lastName"])}</h1>
    </div>
    
  )
}

export default SignUp
