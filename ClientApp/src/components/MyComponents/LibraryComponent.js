import React, { useState } from 'react';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';

const LibraryComponent = (props) => {

    //LIST LIBRARIES
    const [librariesList, setLibrariesList] = useState([]);

    //SEARCH
    const [searchParameterName, setSearchParameterName] = useState('');
    const handleInputChange = (event) => {
        setSearchParameterName(event.target.value.toString());
    }
    const searchItems = () => {
        let URL = searchParameterName != "" ? ("https://localhost:7093/api/Library/Search?prName=" + searchParameterName)
            : "https://localhost:7093/api/Library/GetAll";
        axios.get(URL).then(response => {
            response.data.map(item => { item.isEditing = false; })
            setLibrariesList(response.data);
        })
    }

    //UPDATE
    const handleLibraryInputChange = (prLibrary, prInput) => {
        let librariesNewReference = [...librariesList];
        const index = librariesNewReference.findIndex((item) => item.name == prLibrary.name);
        const { name, value } = prInput.target; // Get the Name and Value of the property changed.
        librariesNewReference[index] = { ...prLibrary, [name]: value }; //Update just the specific property keeping the others
        setLibrariesList(librariesNewReference);
    }

    const updateEditingStatus = (prLibrary, prFlag) => {
        let librariesNewReference = [...librariesList];
        const index = librariesNewReference.findIndex((item) => item.name == prLibrary.name);
        librariesNewReference[index].isEditing = prFlag;
        setLibrariesList(librariesNewReference);
    }

    const confirmUpdate = (prLibrary) => {
        axios.put("https://localhost:7093/api/Library/Update", prLibrary).then(response => {
            let librariesNewReference = [...librariesList];
            const index = librariesNewReference.findIndex((item) => item.name == prLibrary.name);
            librariesNewReference[index] = prLibrary;
            librariesNewReference[index].isEditing = false;
            setLibrariesList(librariesNewReference);
        })
    }

    // INSERT
    const [libraryToAdd, setLibraryToAdd] = useState({ name: '', address: '', telephone: '' });
    const handleLibraryToAddInputChange = (prInput) => {
        const { name, value } = prInput.target;
        let libraryToAddNewReference = { ...libraryToAdd, [name]: value };
        setLibraryToAdd(libraryToAddNewReference);
    }

    const confirmNewLibrary = () => {
        axios.post("https://localhost:7093/api/Library/Save", libraryToAdd).then(response => {
            let librariesNewReference = [...librariesList];
            librariesNewReference.push(response.data);
            setLibrariesList(librariesNewReference);
            setLibraryToAdd({ name: '', address: '', telephone: '' }); // Clear the state
            setShowAlertNewLibrary(true);
        })
    }

    // DELETE
    const deleteLibrary = (prLibrary) => {
        axios.delete("https://localhost:7093/api/Library/Delete", { data: prLibrary }).then(response => {
            let librariesNewReference = [...librariesList];
            const index = librariesNewReference.findIndex((item) => item.name == prLibrary.name);
            librariesNewReference.splice(index, 1);
            setLibrariesList(librariesNewReference);
        })
    }

    // ALERTS
    const [showAlertNewLibrary, setShowAlertNewLibrary] = useState(false);

    return (
        <div>
            <hr />
            <h2>Library</h2>
            <br />
            <div className="row">
                {/* SEARCH LIBRARY */}
                <div className="col-md-4">
                    <div className="card border border-secondary shadow-0">
                        <div className="card-header bg-secondary text-white"><b>Search</b> library<span className="glyphicon glyphicon-search"></span></div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-7">
                                    <label className="form-label">Name</label>
                                    <input className="form-control" placeholder="Enter Name" name="name" type="text" value={searchParameterName} onChange={handleInputChange} />
                                </div>
                                <div className="col-md-5">
                                    <label className="form-label">&nbsp;</label>
                                    <div className="btn-toolbar">
                                        <button type="button" className="btn btn-primary form-control" onClick={searchItems}>Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* NEW LIBRARY */}
                <div className="col-md-8">
                    <div className="card border border-secondary shadow-0">
                        <div className="card-header bg-secondary text-white"><b>New</b> Library</div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-3">
                                    <label className="form-label">Name</label>
                                    <input className="form-control" placeholder="Enter Name" name="name" value={libraryToAdd.name} onChange={handleLibraryToAddInputChange.bind(this)} type="text" />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Address</label>
                                    <input className="form-control" placeholder="Enter Name" name="address" value={libraryToAdd.address} onChange={handleLibraryToAddInputChange.bind(this)} type="text" />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label">Telephone</label>
                                    <input className="form-control" placeholder="Enter Telephone" name="telephone" value={libraryToAdd.telephone} onChange={handleLibraryToAddInputChange.bind(this)} type="text" />
                                </div>
                                <div className="col-md-2">
                                    <label className="form-label">&nbsp;</label>
                                    <button type="button" className="btn btn-success form-control" onClick={confirmNewLibrary}>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            {/* DISPLAY LIBRARY */}
            <div className="card border border-secondary shadow-0">
                <div className="card-header bg-secondary text-white"><b>Display</b> Libraries</div>
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Telephone</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {librariesList.map(item =>
                                <tr key={item.name}>
                                    <td><input className="form-control" value={item.name} onChange={handleLibraryInputChange.bind(this, item)} name="name" disabled={!item.isEditing} /></td>
                                    <td><input className="form-control" value={item.address} onChange={handleLibraryInputChange.bind(this, item)} name="address" disabled={!item.isEditing} /></td>
                                    <td><input className="form-control" value={item.telephone} onChange={handleLibraryInputChange.bind(this, item)} name="telephone" disabled={!item.isEditing} /></td>
                                    <td>
                                        <div className="btn-toolbar">
                                            <button type="button" className="btn btn-info mr-2" onClick={() => updateEditingStatus(item, true)} style={{ display: item.isEditing ? 'none' : 'block' }}>Edit</button>
                                            <label className="form-label">&nbsp;</label>
                                            <button type="button" className="btn btn-warning mr-2" onClick={() => updateEditingStatus(item, false)} style={{ display: item.isEditing ? 'block' : 'none' }}>Cancel</button>
                                            <label className="form-label">&nbsp;</label>
                                            <button type="button" className="btn btn-success mr-2" onClick={() => confirmUpdate(item)} style={{ display: item.isEditing ? 'block' : 'none' }}>Save</button>
                                            <label className="form-label">&nbsp;</label>
                                            <button type="button" className="btn btn-danger mr-2" onClick={() => deleteLibrary(item)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ALERT LIBRARY ADDED */}
            {
                showAlertNewLibrary &&
                <SweetAlert success
                    confirmBtnText="OK"
                    confirmBtnBsStyle="success"
                    title="Item successfully added!"
                    onConfirm={() => setShowAlertNewLibrary(false)} >
                    Please click "OK" to close
                </SweetAlert>

            }

        </div>
    )
}


export default LibraryComponent;