import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { add } from '../slices/SignUpSlice';
import { NavLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

const SignUpHookForm = () => {
  const users = useSelector((state) => state.signup.userInfo);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  
  const { enqueueSnackbar } = useSnackbar();

  const handleShowToast = () => {
    enqueueSnackbar('Account Created Successfully', { variant: 'success' });
  };

  function submitHandler(data) {
    // 1. Check if email already exists
    const emailExists = users.some((user) => user.emailId === data.email);
    if (emailExists) {
      enqueueSnackbar("Email already exists. Please use another email or login.", { variant: "warning" });
      return;
    }

    // 2. Check if passwords match (Logic fix: using consistent names)
    if (data.password !== data.confirmPassword) {
      toast.error("Password and Confirm Password do not match");
      return;
    }
    
    // 3. Dispatch data to Redux
    dispatch(add({
      firstName: data.fname,
      lastName: data.lname,
      phNo: data.phno,
      emailId: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword
    }));

    console.log("Form Data Submitted:", data);
    handleShowToast();
  }

  return (
    <div className="min-h-screen bg-slate-950 py-20 px-4">
      <div className='max-w-4xl bg-slate-900 mx-auto p-8 rounded-3xl opacity-95 transition-all duration-700 ease-in shadow-2xl border border-slate-800'>
        
        <h2 className='text-3xl font-bold text-center text-amber-400 mb-8 tracking-tight'>
          Create Your Account
        </h2>

        <div className='bg-slate-800 p-8 rounded-2xl shadow-inner'>
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
            
            {/* Row 1: Names */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <label className="flex flex-col gap-2">
                <span className='text-sm font-semibold text-amber-400 uppercase tracking-wider'>First Name</span>
                <input
                  type='text'
                  {...register("fname", {
                    required: "First name is required",
                    minLength: { value: 3, message: "Min length is 3" },
                    maxLength: { value: 10, message: "Max length is 10" },
                    pattern: { value: /^[A-Za-z]+$/i, message: "Only letters allowed" }
                  })}
                  placeholder='John'
                  className='bg-slate-900 border border-slate-700 placeholder:text-slate-600 p-3 outline-none focus:border-amber-500 rounded-xl text-amber-100 transition-all'
                />
                {errors.fname && <p className="text-red-400 text-xs">{errors.fname.message}</p>}
              </label>

              <label className="flex flex-col gap-2">
                <span className='text-sm font-semibold text-amber-400 uppercase tracking-wider'>Last Name</span>
                <input
                  type='text'
                  {...register("lname", {
                    required: "Last name is required",
                    minLength: { value: 3, message: "Min length is 3" },
                    pattern: { value: /^[A-Za-z]+$/i, message: "Only letters allowed" }
                  })}
                  placeholder='Doe'
                  className='bg-slate-900 border border-slate-700 placeholder:text-slate-600 p-3 outline-none focus:border-amber-500 rounded-xl text-amber-100 transition-all'
                />
                {errors.lname && <p className="text-red-400 text-xs">{errors.lname.message}</p>}
              </label>
            </div>

            {/* Row 2: Contact Info */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <label className="flex flex-col gap-2">
                <span className='text-sm font-semibold text-amber-400 uppercase tracking-wider'>Email Address</span>
                <input
                  type='email'
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  placeholder='abc@gmail.com'
                  className='bg-slate-900 border border-slate-700 placeholder:text-slate-600 p-3 outline-none focus:border-amber-500 rounded-xl text-amber-100 transition-all'
                />
                {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
              </label>

              <label className="flex flex-col gap-2">
                <span className='text-sm font-semibold text-amber-400 uppercase tracking-wider'>Phone Number</span>
                <input
                  type='text'
                  {...register("phno", { 
                    required: "Phone number is required",
                    minLength: { value: 10, message: "Phone number must be 10 digits" }
                  })}
                  placeholder='8080808080'
                  className='bg-slate-900 border border-slate-700 placeholder:text-slate-600 p-3 outline-none focus:border-amber-500 rounded-xl text-amber-100 transition-all'
                />
                {errors.phno && <p className="text-red-400 text-xs">{errors.phno.message}</p>}
              </label>
            </div>

            {/* Row 3: Passwords */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <label className="flex flex-col gap-2">
                <span className='text-sm font-semibold text-amber-400 uppercase tracking-wider'>Password</span>
                <input
                  type='password'
                  {...register("password", { 
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" }
                  })}
                  placeholder='******'
                  className='bg-slate-900 border border-slate-700 placeholder:text-slate-600 p-3 outline-none focus:border-amber-500 rounded-xl text-amber-100 transition-all'
                />
                {errors.password && <p className="text-red-400 text-xs">{errors.password.message}</p>}
              </label>

              <label className="flex flex-col gap-2">
                <span className='text-sm font-semibold text-amber-400 uppercase tracking-wider'>Confirm Password</span>
                <input
                  type='password'
                  {...register("confirmPassword", { required: "Please confirm your password" })}
                  placeholder='******'
                  className='bg-slate-900 border border-slate-700 placeholder:text-slate-600 p-3 outline-none focus:border-amber-500 rounded-xl text-amber-100 transition-all'
                />
                {errors.confirmPassword && <p className="text-red-400 text-xs">{errors.confirmPassword.message}</p>}
              </label>
            </div>

            {/* Submit Button */}
            <div className='pt-4'>
              <button 
                type='submit'
                className='w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-4 rounded-xl transition-all transform hover:scale-[1.01] active:scale-[0.98] shadow-lg text-lg'
              >
                Create My Account
              </button>
            </div>
          </form>
        </div>
        <NavLink to="/log-in">
          <p className='p-4 font-medium text-amber-400 shadow-2xl text-center'>Already Have an account<br/>Login In.</p>
        </NavLink>
      </div>
    </div>
  );
};

export default SignUpHookForm;