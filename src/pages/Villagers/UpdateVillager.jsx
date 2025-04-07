import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Breadcrumbs from "../../components/Breadcrumbs";
import axios from "axios";

function UpdateVillager() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [number, setNumber] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [division, setDivision] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [submit, setSubmit] = useState(false);

  const token = localStorage.getItem("token");
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. Redirecting to login...");
      setTimeout(() => navigate("/login", { replace: true }), 0);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchVillager = async () => {
      try {
        const response = await axios.get(
          `${apiBaseUrl}/villagers/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const villager = response.data;
        console.log(villager);

        setName(villager.name);
        setGender(villager.gender);
        setNumber(villager.address.number);
        setLine1(villager.address.line1);
        setLine2(villager.address.line2);
        setDivision(villager.address.division);
      } catch (error) {
        console.error("Error fetching villager:", error);
        setAlert({
          type: "error",
          message: "Failed to fetch villager details.",
        });
      }
    };

    if (id && token) fetchVillager();
  }, [id, apiBaseUrl, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!gender || gender === "-Select-") {
      setAlert({ type: "danger", message: "Please select a valid Gender!" });
      return;
    }
    if (!division || division === "-Select-") {
      setAlert({ type: "danger", message: "Please select a valid Division!" });
      return;
    }
    setSubmit(true);

    console.log("Submitting form with data:", {
      name,
      gender,
      number,
      line1,
      line2,
      division,
    });
    try {
      const response = await axios.post(
        `${apiBaseUrl}/villagers/save`,
        {
          name,
          gender,
          address: {
            number,
            line1,
            line2,
            division,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setAlert({
        type: "success",
        message: response.data.message || "Villager Saved successfully!",
      });

      setTimeout(() => {
        navigate("/villagers");
      }, 2000);
    } catch (error) {
      setAlert({
        type: "danger",
        message: error.response?.data?.message || "Failed to save villager.",
      });
      console.error("Error:", error);
      setTimeout(() => {
        navigate("/add-villager");
      }, 3000);
    }
  };

  return (
    <div className="d-flex">
      <SideBar />
      <div className="flex-grow-1 d-flex flex-column min-vh-100">
        <Header />
        <div className="ms-sm-auto col-lg-12 px-md-4 flex-grow-1">
          <Breadcrumbs
            title="Add User"
            breadcrumbs={[
              { label: "Home", path: "/dashboard" },
              { label: "Villagers", path: "/villagers" },
              { label: "Add Villager", path: location.pathname, active: true },
            ]}
          />
          <div className="d-flex justify-content-center align-content-center flex-grow-1">
            <div className="col-md-12 col-lg-12 px-md-4">
              <div className="container mt-2 d-flex justify-content-center">
                <div className="col-md-12">
                  <div className="card card-primary card-outline">
                    <div className="d-flex card-header align-items-center justify-content-center">
                      <h4 className="card-title fw-bold">Add Villager</h4>
                    </div>
                    <div className="card-body">
                      {alert.message && (
                        <div
                          className={`alert alert-${alert.type}`}
                          role="alert"
                        >
                          {alert.message}
                        </div>
                      )}

                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label htmlFor="name" className="form-label">
                              Name
                            </label>
                            <input
                              className="form-control"
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                            />
                          </div>
                          <div className="mb-3 col-md-6">
                            <label htmlFor="gender" className="form-label">
                              Gender
                            </label>
                            <select
                              className="form-control"
                              id="gender"
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                              required
                            >
                              <option value="">-Select-</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                          </div>
                        </div>

                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label htmlFor="number" className="form-label">
                              Address Number
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="number"
                              value={number}
                              onChange={(e) => setNumber(e.target.value)}
                              required
                            />
                          </div>
                          <div className="mb-3 col-md-6">
                            <label htmlFor="line1" className="form-label">
                              Address Line 1
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="line1"
                              value={line1}
                              onChange={(e) => setLine1(e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label htmlFor="line2" className="form-label">
                              Address Line 2
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="line2"
                              value={line2}
                              onChange={(e) => setLine2(e.target.value)}
                              required
                            />
                          </div>
                          <div className="mb-3 col-md-6">
                            <label htmlFor="division" className="form-label">
                              Division
                            </label>
                            <select
                              className="form-control"
                              id="division"
                              value={division}
                              onChange={(e) => setDivision(e.target.value)}
                              required
                            >
                              <option value="">-Select-</option>
                              <option value="North">North</option>
                              <option value="East">East</option>
                              <option value="South">South</option>
                              <option value="West">West</option>
                            </select>
                          </div>
                        </div>

                        <div className="card-footer d-flex justify-content-center mt-2">
                          <button
                            type="submit"
                            className="btn btn-primary col-sm-12 mt-3 col-md-6"
                            disabled={submit}
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateVillager;
