import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset, createPrediction} from "../../features/Slices/predictionSlice";
import Spinner from "../../layouts/Spinner";

const Predict = () => {
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    ca: "",
  });

  const {
    sex,
    age,
    trestbps,
    chol,
    fbs,
    restecg,
    thalach,
    exang,
    oldpeak,
    ca,
  } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { predictions, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.prediction
  );

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }

    dispatch(reset());
  }, [predictions, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      sex,
      age,
      trestbps,
      chol,
      fbs,
      restecg,
      thalach,
      exang,
      oldpeak,
      ca,
    };

    dispatch(createPrediction(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="prediction-header">
            <h2 className="number-center p-4">Prediction</h2>
          </div>
          <div className="prediction-card">
            <div className="card">
              <div className="card-body">
                <form autoComplete="off" onSubmit={onSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input
                      type="number"
                      className="form-control"
                      name="age"
                      value={age}
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Sex</label>
                    <input
                      type="number"
                      className="form-control"
                      name="sex"
                      value={sex}
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Trestbps</label>
                    <input
                      type="number"
                      className="form-control"
                      name="trestbps"
                      value={trestbps}
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Chol</label>
                    <input
                      type="number"
                      className="form-control"
                      name="chol"
                      value={chol}
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">FBS</label>
                    <input
                      type="number"
                      className="form-control"
                      name="fbs"
                      value={fbs}
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Restecg</label>
                    <input
                      type="number"
                      className="form-control"
                      name="restecg"
                      value={restecg}
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Thalach</label>
                    <input
                      type="number"
                      className="form-control"
                      name="thalach"
                      value={thalach}
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Exang</label>
                    <input
                      type="number"
                      className="form-control"
                      name="exang"
                      value={exang}
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Oldpeak</label>
                    <input
                      type="number"
                      className="form-control"
                      name="oldpeak"
                      value={oldpeak}
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Ca</label>
                    <input
                      type="number"
                      className="form-control"
                      name="ca"
                      value={ca}
                      onChange={onChange}
                    />
                  </div>
                  <div className="d-grid gap-2">
                    <button className="btn btn-dark" type="submit">
                      Predict
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Predict;
