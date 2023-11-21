import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '@features/postList/components/HomePage/HomePage';
import { PostItem } from '@features/postItem/components/PostItem';

export const App: FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage />
        }
      />
      <Route path="/post/:id" element={
        <PostItem />
      } />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
