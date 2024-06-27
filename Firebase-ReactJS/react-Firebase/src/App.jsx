import React, { useEffect, useState } from 'react'
import "./App.css";
import{app,database} from "./firebaseConfig"
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth"
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore"

const App = () => {

  const [array,setArray] = useState([]);
  const [data,setData] = useState({
    name:'',
    email:'',
    password:''
  });

  const auth = getAuth();
  const dbInstance = collection(database,'users');

  const handleInputs = (event) =>{

    let inputs = {[event.target.name]:event.target.value}
    setData({...data,...inputs});

  }

  const handleSignUp = () =>{
    createUserWithEmailAndPassword(auth,data.email,data.password)
    .then((res)=>{
      console.log(res.user);
    })
    .catch((err)=>{
      alert(err.message);
    })
  }

  const handleSignIn = ()=>{
    signInWithEmailAndPassword(auth,data.email,data.password)
    .then((res)=>{
      console.log(res.user);
    })
    .catch((err)=>{
      alert(err.message)
    })
  }

  const handleAddData = ()=>{
    addDoc(dbInstance,data)
    .then((res)=>{
      alert('Data Sent');
    })
    .catch((err)=>{
      alert(err.message);
    })
  }

  // const handleGetData = async () => {        <!-- for console.log the data ->
  //   const data = await getDocs(dbInstance);
  //   console.log(data.docs.map((item)=>{
  //     return {...item.data(),id:item.id}
  //   }));
  // }
  
  const handleGetData = async () => {
    const data = await getDocs(dbInstance);
    setArray(data.docs.map((item)=>{
      return {...item.data(),id:item.id}
    }));
  }

  const handleUpdateData = (id) =>{
    let dataToUpdate = doc(database,'users',id);
    updateDoc(dataToUpdate,{
      name:'vikram',
      email:'vikram@gmail.com',
      password:'vikram12345'
    })
    .then(()=>{
      alert('Data Updated');
      handleGetData();
    })
    .catch((err)=>{
      alert(err)
    })
  }

  const handleDeleteData = (id) =>{
    const dataToDelete = doc(database,'users',id);
    deleteDoc(dataToDelete)
    .then(()=>{
      alert('Data Deleted');
      handleGetData();
    })
    .catch((err)=>{
      alert(err);
    })
  }

  useEffect(()=>{
    handleGetData();
  },[])

  return (
    
    <div className='App-header'>
      <input 
       type='text'
       placeholder='Name'
       name='name'
       onChange={handleInputs}
      />
      <input 
       type='email'
       placeholder='Email'
       name='email'
       onChange={handleInputs}
      />
      <input 
       type='password'
       placeholder='Password'
       name='password'
       onChange={handleInputs}
      />
      <div className='btn-container'>
        <button onClick={handleSignUp} className='btn'>SignUp</button>
        <button onClick={handleSignIn} className='btn'>SignIn</button>
        <button onClick={handleAddData} className='btn'>AddData</button>
      </div>
      <div>
        <button onClick={handleGetData} className='btn'>GetData</button>
      </div>

        {/* showing the data on screen */}
        <div>
        {array.map((item)=>{
          return (
            <div>
              <p className='shw-p'>{item.name}</p>
              <p className='shw-p'>{item.email}</p>
              <p className='shw-p'>{item.password}</p>

              <button className='btn btn-update' onClick={()=> handleUpdateData(item.id)}>Update</button>
              <button className='btn btn-update' onClick={()=> handleDeleteData(item.id)}>Delete</button>
              <hr />
            </div>
          )
        })}
        </div>

    </div>
  )
}

export default App
