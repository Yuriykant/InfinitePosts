import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '@app/api/apiSlice';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export const PostItem = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const { data: post } = useGetPostByIdQuery(+id!)

  return (
    <Box className="container">
      <Paper elevation={3} sx={{
        maxWidth: '600px',
        p: '15px 20px',
        m: '20px 0',
      }}>
        <Typography variant="h6"> {id}. {post?.title}</Typography>
        <Typography variant="body1"> {post?.body}</Typography>
        <Button variant="outlined" onClick={() => navigate(-1)} sx={{
          margin: "10px 0"
        }}>Назад к главной</Button>
      </Paper>
    </Box >
  )
}
