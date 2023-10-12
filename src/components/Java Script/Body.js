import React from 'react';
import '../CSS/Body.css';
import probablity from '../Images/Probability.png';
import linear from '../Images/linear.jpg';
import calcus from '../Images/calcus.jpg';
import data from '../Images/dsa.jpg';
import database from '../Images/database.jpg';
import ml from '../Images/ml.jpg';
import ai from '../Images/ai.jpg';
import { Link } from 'react-router-dom';

export default function Body() {
  const topics = [
    {
      title: 'Probability',
      image: probablity,
      description:
        'Probability and statistics are the tools that help us see through the fog of uncertainty. They give us the power to make better decisions, even when we don\'t have all the information.',
    },
    {
      title: 'Linear Algebra',
      image: linear,
      description:
        'Linear algebra is the branch of mathematics concerning linear equations such as linear functions such as and their representations through matrices and vector spaces.',
    },
    {
      title: 'Calculus and Optimization',
      image: calcus,
      description:
        'Calculus is a branch of mathematics that studies continuous change. Optimization is the process of finding the best solution from all feasible solutions.',
    },
    {
      title: 'Data Structures and Algorithms',
      image: data,
      description:
        'A data structure is a named location that can be used to store and organize data. And, an algorithm is a collection of steps to solve a particular problem.',
    },
    {
      title: 'Database',
      image: database,
      description:
        'A database is an organized collection of structured information, or data, typically stored electronically in a computer system.',
    },
    {
      title: 'Machine Learning',
      image: ml,
      description:
        'Machine learning is the study of computer algorithms that improve automatically through experience. It is seen as a subset of artificial intelligence.',
    },
    {
      title: 'Artificial Intelligence',
      image: ai,
      description:
        'Artificial intelligence is intelligence demonstrated by machines, unlike the natural intelligence displayed by humans and animals, which involves consciousness and emotionality.',
    },
  ];

  return (
    <div className="container">
      <h1 className="text-center mt-4">Welcome Bhavana</h1>
      <div className="row mt-4">
        {topics.map((topic, index) => (
          <div className="col-lg-4 col-md-6 mb-4" key={index}>
            <div className="card">
              <div className="card-body">
                <img src={topic.image} className="card-img-top" alt="Card" />
                <h5 className="card-title">{topic.title}</h5>
                <p className="card-text">{topic.description}</p>
                <Link to={`/topics/${topic.title}`} className="btn btn-primary">
                  Start Learning
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
