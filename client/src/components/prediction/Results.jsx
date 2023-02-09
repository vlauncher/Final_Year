import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getResults } from "../../features/Slices/predictionSlice";

const Results = () => {
  const dispatch = useDispatch();
  const { predictions } = useSelector((state) => state.prediction);

  useEffect(() => {
    dispatch(getResults());
  }, [dispatch]);
  return (
    <div>
      <h2>Results</h2>
      <table className="table" style={{ marginTop: "50px" }}>
        <thead>
          <tr>
            <th scope="col">S/N</th>
            <th scope="col">Age</th>
            <th scope="col">Sex</th>
            <th scope="col">Trestbps</th>
            <th scope="col">Chol</th>
            <th scope="col">Fbs</th>
            <th scope="col">Restecg</th>
            <th scope="col">Thalach</th>
            <th scope="col">Exang</th>
            <th scope="col">Oldpeak</th>
            <th scope="col">Ca</th>
            <th scope="col">target</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map((item) => (
            <tr key={item.id}>
              <th scope="row">{item.id}</th>
              <td>{item.age}</td>
              <td>{item.sex}</td>
              <td>{item.trestbps}</td>
              <td>{item.chol}</td>
              <td>{item.fbs}</td>
              <td>{item.restecg}</td>
              <td>{item.thalach}</td>
              <td>{item.exang}</td>
              <td>{item.oldpeak}</td>
              <td>{item.ca}</td>
              <td>{item.target}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Results;
