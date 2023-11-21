import React, { FC, useEffect, useState } from 'react';
import { useGetPostsQuery } from '@app/api/apiSlice';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

const MAX_OFFSET = 90;
const SCROLL_THRESHOLD = 30;
const MAX_POST_LENGTH = 158;

export const HomePage: FC = () => {
  const navigate = useNavigate();
  const [currentPostStart, setCurrentPostStart] = useState(0);
  const [isFetchingDown, setIsFetchingDown] = useState(false);
  const [isFetchingUp, setIsFetchingUp] = useState(false);

  const { data: posts, isLoading, error } = useGetPostsQuery({ limit: 10, offset: currentPostStart });

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  useEffect(() => {
    if (isFetchingDown) {
      setCurrentPostStart(prev => (prev < MAX_OFFSET ? prev + 1 : prev));
      setIsFetchingDown(false);
    }
  }, [isFetchingDown]);

  useEffect(() => {
    if (isFetchingUp) {
      setCurrentPostStart(prev => (prev > 0 ? prev - 1 : prev));
      setIsFetchingUp(false);
    }
  }, [isFetchingUp]);

  const scrollHandler = (): void => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    if (scrollTop < SCROLL_THRESHOLD) {
      setIsFetchingUp(true);
    }

    if (scrollHeight - scrollTop - windowHeight < SCROLL_THRESHOLD) {
      setIsFetchingDown(true);
      window.scrollTo(0, scrollHeight + scrollTop);
    }
  };

  if (isLoading) {
    return <Box sx={{ p: 5, textAlign: 'center' }}>
      <CircularProgress />
    </Box>;
  }

  return (
    <Box className="container">
      {posts?.map((post) => (
        <Paper elevation={3} key={post.id} sx={{
          maxWidth: '600px',
          m: '20px 0',
          p: '15px 20px',
        }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Typography variant="h6"> {post.id}. {post.title}</Typography>
          </Box>
          <Typography variant="body1" sx={{ marginBottom: '10px', }} >
            {post.body.length > MAX_POST_LENGTH ? `${post.body.substring(0, MAX_POST_LENGTH)}...` : post.body}
          </Typography>
          {post.body.length > 158 && (
            <Button variant="text" onClick={() => navigate(`/post/${post.id}`)}>Читать далее</Button>
          )}
        </Paper>
      ))}
      {isLoading && <Box sx={{ p: 5, textAlign: 'center' }}>
        <CircularProgress />
      </Box>}
      {error && <Typography variant="body1" sx={{ color: 'red', textAlign: 'center', m: '20px 0' }} >FETCH ERROR</Typography>}
    </Box>
  );
};