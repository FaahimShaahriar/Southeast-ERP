import React, { useState, useEffect } from "react";
import "../../Style/clients.css";
import Sidebar from "../../Components/sidebar";
import MainLayout from "../../Layout/MainLayout";
import axios from "axios";
import Swal from "sweetalert2";
axios.defaults.baseURL = "http://localhost:8080/";

const ClientsPage = () => {
  const [ClientData, setClientData] = useState([]);
  const [addSection, setAddSection] = useState(false); //
  const [addSection2, setAddSection2] = useState(false); //
  const [detailedClient, setDetailedCleintView] = useState(false); //

  const [editClientEmail, setEditClientEmail] = useState(null);
  const [editClientData, setEditClientData] = useState({});
  const [editMode, setEditMode] = useState({});
  //Save Attendace Data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: e.target.name.value,
      address: e.target.address.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
    };
    try {
      const response = await axios.post("/saveClient", data);
      console.log(response);
      if (response.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Attendance data has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error saving attendance data:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to save attendance data",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleEditClick = (client) => {
    const newEditMode = { ...editMode };
    newEditMode[client.email] = !newEditMode[client.email];
    setEditMode(newEditMode);
    setEditClientEmail(client.email);
    setEditClientData(client);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditClientData({ ...editClientData, [name]: value });
    setEditMode({ ...editMode, [editClientEmail]: true });
  };

  const handleSaveClick = async (client) => {
    try {
      const response = await axios.put("/updateClient", editClientData);
      if (response.data.success) {
        const updatedClients = ClientData.map((c) =>
          c.email === client.email ? response.data.client : c
        );
        setClientData(updatedClients);

        Swal.fire("Success", "Client updated successfully", "success");
        const newEditMode = { ...editMode };
        newEditMode[client.email] = false;
        setEditMode(newEditMode);
        setEditClientEmail(null);
      } else {
        Swal.fire("Error", response.data.message, "error");
      }
    } catch (error) {
      Swal.fire(
        "Error",
        "An error occurred while updating the client",
        "error"
      );
    }
  };

  const getFetchData = async () => {
    try {
      const response = await axios.get("/GetClients");
      setClientData(response.data);
      console.log(response.data);
      // console.log(response);
    } catch (error) {
      console.error("Error fetching Client data:", error);
    }
  };
  useEffect(() => {
    getFetchData();
  }, []);

  const [selectedClient, setSelectedClient] = useState(null);

  const handleViewDetails = (client) => {
    setDetailedCleintView(true);
    setSelectedClient(client);
    console.log(client);
  };

  useEffect(() => {
    setAddSection(true);
  }, []);

  return (
    <MainLayout>
      <div className="content">
        <Sidebar></Sidebar>
        <div className="clients-page">
          <div className="buttons">
            <button
              className="button"
              onClick={() => {
                setAddSection2(false);
                setAddSection(true);
              }}
            >
              All Clients
            </button>
            <button
              className="button"
              onClick={() => {
                setAddSection(false);
                setAddSection2(true);
              }}
            >
              Add Client
            </button>
          </div>
          {addSection && (
            <div className="clients">
              {" "}
              <div>
                <h2>Clients</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Serial</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ClientData.map((client, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {editClientEmail === client.email ? (
                            <input
                              type="text"
                              name="name"
                              value={editClientData.name}
                              onChange={handleInputChange}
                            />
                          ) : (
                            client.name
                          )}
                        </td>
                        <td> {editClientEmail === client.email ? (
                            <input
                              type="text"
                              name="email"
                              value={editClientData.email}
                              onChange={handleInputChange}
                            />
                          ) : (
                            client.email
                          )}</td>
                        <td>
                          {editClientEmail === client.email ? (
                            <input
                              type="text"
                              name="email"
                              value={editClientData.phone}
                              onChange={handleInputChange}
                            />
                          ) : (
                            client.phone
                          )}
                        </td>
                        <td>{client.address}</td>
                        <td>
                          <button
                            className="button2"
                            onClick={() => handleViewDetails(client)}
                          >
                            View
                          </button>
                        </td>
                        <td>
                          {editMode[client.email] ? (
                            <button onClick={() => handleSaveClick(client)}>
                              Save
                            </button>
                          ) : (
                            <button onClick={() => handleEditClick(client)}>
                              {editClientEmail === client.email
                                ? "Cancel"
                                : "Edit"}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {selectedClient && (
                  <ClientDetails
                    client={selectedClient}
                    onClose={() => setSelectedClient(null)}
                  />
                )}
              </div>
            </div>
          )}

          {addSection2 && (
            <form className="add-client-form" onSubmit={handleSubmit}>
              <h2>Add Client</h2>
              <div className="form-group">
                <label>Name:</label>
                <input className="clientinput" type="text" name="name" />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input className="clientinput" type="email" name="email" />
              </div>
              <div className="form-group">
                <label>Phone Number:</label>
                <input className="clientinput" type="tel" name="phone" />
              </div>
              <div className="form-group">
                <label>Address:</label>
                <input className="clientinput" type="tel" name="address" />
              </div>
              <button className="button1" type="submit">
                Add Client
              </button>
            </form>
          )}
        </div>
        <div>clients</div>
      </div>
    </MainLayout>
  );
};
const ClientDetails = ({ client, onClose }) => {
  console.log(client);

  return (
    <div className="client-details-container">
      <h3 className="client-details-title">Client Details</h3>
      <p className="client-details-info">Name: {client.name}</p>
      <p className="client-details-info">Email: {client.email}</p>
      <p className="client-details-info">Phone: {client.phone}</p>
      <p className="client-details-info">Address: {client.address}</p>
      <p className="client-details-info">
        Purchased: {client.purchased ? "Yes" : "No"}
      </p>
      <button className="client-details-btn" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default ClientsPage;
