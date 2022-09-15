import { Box,Button,FormControlLabel,FormLabel,TextField,FormGroup, Checkbox } from '@mui/material'
import React,{useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const AddBook = () => {
    const History = useNavigate();
    const [inputs, setInputs] = useState({
        name: "",
        author: "",
        description: "",
        price: "",
        image: "",
    })
    const [checked, setChecked] = useState(false);
    const handleChange = (e) => {
        // console.log(e.target.name,"value",e.target.value)
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }
    const handleSubmit=(e) => {
        e.preventDefault();
        console.log(inputs,checked);
        sendRequest().then(() => {History('/books')});

    }
    const sendRequest = async()=>{
       await axios.post("http://localhost:5000/books",{
            name: String(inputs.name),
            author: String(inputs.author),
            description: String(inputs.description),
            price: Number(inputs.price),
            image: String(inputs.image),
            available: Boolean(checked),
        }).then((response) => {response.data})
    }
  return <form onSubmit={handleSubmit}>
    <Box display="flex" flexDirection="column" justifyContent={'center'} maxWidth={700} alignContent={"center"} alignSelf="center" marginLeft={"auto"} marginRight={"auto"} marginTop={10}>
    <FormLabel>Name</FormLabel>
    <TextField value={inputs.name} onChange={handleChange} margin="normal" fullwidth variant="outlined" name="name"/>
    <FormLabel>Author</FormLabel>
    <TextField value={inputs.author} onChange={handleChange} margin="normal" fullwidth variant="outlined" name="author"/>
    <FormLabel>Description</FormLabel>
    <TextField value={inputs.description} onChange={handleChange} margin="normal" fullwidth variant="outlined" name="description"/>
    <FormLabel>Price</FormLabel>
    <TextField value={inputs.price} type="number" onChange={handleChange} margin="normal" fullwidth variant="outlined" name="price"/>
    <FormLabel>Image</FormLabel>
    <TextField value={inputs.image} onChange={handleChange} margin="normal" fullwidth variant="outlined" name="image"/>
    <FormGroup>
  <FormControlLabel onChange={()=>setChecked(!checked)} control={<Checkbox checkbox={checked} />} label="Available" />
</FormGroup>
    <Button variant="contained" type="submit">Add Book</Button>
    </Box>
  </form>
}

export default AddBook