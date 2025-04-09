import { useState, useEffect, useRef } from "react"
import React from 'react'
import Avatar from "./Avatar"
import uploadFile from "../helpers/uploadFile"
import Divider from "./Divider"
import { useDispatch } from "react-redux"
import axios from "axios"
import toast from "react-hot-toast"
import { setUser } from '../redux/userSlice'

const EditUserDetails = ({onClose, user}) => {
    const [data,setData] = useState({
        
        name : user?.user,
        profile_pic : user?.profile_pic
    })
    const uploadPhotoRef = useRef()
    const dispatch = useDispatch()

    useEffect(()=>{
        setData((preve)=>{
            return{
                ...preve,
                ...user
            }
        })
    },[user])

    const handleOnChange = (e)=>{
        const { name, value } = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }

    const handleOpenUploadPhoto = (e)=>{
        e.preventDefault()
        e.stopPropagation()

        uploadPhotoRef.current.click()
    }
    const handleUploadPhoto = async(e)=>{
        const file = e.target.files[0]

        const uploadPhoto = await uploadFile(file)

        setData((preve)=>{
        return{
            ...preve,
            profile_pic : uploadPhoto?.url
        }
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        e.stopPropagation()
        try {
            const URL = `${process.env.REACT_APP_BACKEND_URL}/api/update-user`

            const response = await axios({
                method : 'post',
                url : URL,
                data : data,
                withCredentials : true
            })

            console.log('response',response)
            toast.success(response?.data?.message)
            
            if(response.data.success){
                dispatch(setUser(response.data.data))
                onClose()
            }
         
        } catch (error) {
            console.log(error)
            toast.error()
        }
    }

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 z-10 bg-gray-700 
    bg-opacity-40 flex justify-center items-center'>
      <div className='bg-white p-4 py-6  m-1 rounded w-full max-w-sm'>
        <h1 className='font-semibold text-black '>Profile Details</h1>
        <br></br>
        <p>Edit User Details</p>

        <form className="grid gap-3 mt-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
            <label htmlFor='name'>Name</label>
                <input
                type='text'
                name='name'
                id='name'
                value={data.name}
                onChange={handleOnChange}
                className="w-full py-1 px-2 focus:outline-purple-900 "/>
            </div>

        <div>
            <div>Photo</div>
            <div className="my-1 flex items-center gap-4">
                <Avatar
                width={40}
                height={40}
                imageUrl={data.profile_pic}
                name={data?.name}
                />
                <label htmlFor="profile_pic">
                <button className="font-semibold" onClick={handleOpenUploadPhoto}>Change Photo</button>
                <input
                    type="file"
                    id="profile_pic"
                    className="hidden" 
                    onChange={handleUploadPhoto}
                    ref={uploadPhotoRef}
                />
                </label>
            </div>
        </div>

            <Divider/>
            <div className="flex gap-2  w-fit ml-auto">
                {/*  CANCEL BUTTON  */}
                <button onClick={onClose} className="border-bg-red-600 border px-4 py-1 rounded
                 text-red-600 hover:bg-red-600 hover:text-white ">Cancel</button>
                 
                 {/* SAVE BUTTON  */}
                <button onClick={handleSubmit} className="border-bg-red-600 bg-red-600 border px-4 py-1
                rounded hover:bg-red-800 text-white">Save</button>
            </div>
      </form>
      </div>
    </div>
  )
}

export default EditUserDetails
