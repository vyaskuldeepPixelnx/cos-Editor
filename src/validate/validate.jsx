export default function validate (values) {
    const errors = {}
    const email_pattren = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;
    const pass_pattren = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if(values.name == ''||values.name== undefined){
        errors.name= 'name is Required!'
    }

    if(values.email=="" || values.email== undefined  ){
         errors.email= 'Email is Required!';
    }else if(!email_pattren.test(values.email)){
          errors.email = 'Invalid email address';
    }
    if(values.password=="" || values.password==undefined)
    {
        errors.password= ' password is Required'
    }else if (!pass_pattren.test(values.password)){
        errors.password= "Invalid password "
    }
    return errors;
}