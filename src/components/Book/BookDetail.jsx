import { Button, FormControlLabel, FormLabel, TextField,FormGroup,Box, Checkbox} from '@mui/material';
import React, { useEffect,useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'

const BookDetail = () => {
    const [inputs, setInputs] = useState({});
    const id = useParams().id;
    // console.log(id);
    const history = useNavigate();
    useEffect(() => {
    const fetchHandler = async () => {
        await axios.get(`http://localhost:5000/books/${id}`).then((res)=>console.log(res.data)).then((data)=>{setInputs(data.book)});
    }
        fetchHandler();
    }, [id]);
    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(() =>history('/books'));

    }
    const sendRequest = async () => {
        await axios.put(`http://localhost:5000/books/${id}`, {
            name: String(inputs.name),
            author: String(inputs.author),
            description: String(inputs.description),
            price: Number(inputs.price),
            image: String(inputs.image),
            available: Boolean(checked),
        }).then((response) => {response.data})}

    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }
    const [checked, setChecked] = useState(false);
    // console.log(inputs);
  return (
    <div>
     {inputs &&  (<form onSubmit={handleSubmit}>
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
    <Button variant="contained" type="submit">UPDATE Book</Button>
    </Box>
  </form>)}
        
    </div>
  )
}

export default BookDetail