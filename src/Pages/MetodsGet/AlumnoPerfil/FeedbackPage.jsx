// FeedbackPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import FeedbackList from './FeedbackList';

const FeedbackPage = () => {
  const { id } = useParams();
  return <FeedbackList instructorId={id} />;
};

export default FeedbackPage;
