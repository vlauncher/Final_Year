import React,{useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getResults } from '../features/Slices/predictionSlice'

const Results = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch( getResults() );
  }, []);
  return (
    <div>
      <h2>Results</h2>
    </div>
  )
}

export default Results
