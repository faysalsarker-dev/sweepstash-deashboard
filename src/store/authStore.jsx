import useAxios from "../hook/useAxios";


const AuthStore = () => {
    const axiosSecure = useAxios()
    const createUser =async(formData)=>{
        const { data: userResponse } = await axiosSecure.post('/user/register', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });

    }





    return (
        <div>
            
        </div>
    );
};

