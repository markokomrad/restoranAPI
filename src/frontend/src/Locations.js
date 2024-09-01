import logo from './logo.svg';
import axios from "axios";
import {useEffect, useState} from "react";
import './App.css';

const baseUrl = "http://localhost:5000";

function Locations() {
  const [locations, postaviLocations] = useState([]);
  const [location, postaviLocation] = useState({});
  const [locationId, postaviLocationId] = useState(null);
  const [mode, postaviMode] = useState("unos");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const dohvatiLocations = async () => {
    const podaci = await axios.get('http://localhost:5000/location');
    const locations = podaci.data.locations;
    postaviLocations(locations);
  }

  const pokreniPromenu = (l) => {
    postaviLocation(l);
    postaviLocationId(l.id);
    postaviMode('promena');
  }

  const promeniLocation = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.put(`${baseUrl}/location/${locationId}`, location);
  
      const ll = locations.map(l => 
        {
          if (l.id === locationId)
          {
            return data.data.location;
          }
          else{
            return l;
          }
        });
      postaviLocations(ll);
      postaviLocation({});
      postaviMode('unos');
      
    } catch(err)
    {
      console.log(err.message);
    }
  }

  const izbrisiLocation = (l) => {
    try 
    {
      axios.delete(`${baseUrl}/location/${l.id}`, location)
      .then(() => dohvatiLocations()).then(response => console.log('Deleted succesfully'));
    }
    catch(err)
    {
      console.log(err.message)
    }
  }

  const unesiLocation = async (e) => {
    e.preventDefault();
    try {
      
      const data = await axios.post(
        'http://localhost:5000/location', location
      );
      postaviLocations([...locations, data.data]);
      //console.log(location);
    } catch (err) {
      console.log(err.message);
    }
  }
  const promeni = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    postaviLocation(values => ({...values, [name]: value}));
    console.log(location);
  }

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  }

  useEffect( () => {dohvatiLocations(); }, []);
  //console.log(locations);
  return (
    <div className="container mt-3">
      <h2 onClick={toggleForm} className="btn btn-outline-primary" style={{ cursor: 'pointer', display: 'inline-block' }}>Unos Lokacije</h2>

      <div className={isFormOpen ? "collapse show" : "collapse"}>
        <form>
          <div className="mb-3 mt-3">
            <label htmlFor="street">Street:</label>
            <input
              type="text"
              className="form-control"
              id="street"
              placeholder="Upišite street"
              name="street"
              value={location.street}
              onChange={promeni}
            />
          </div>

          <div className="mb-3 mt-3">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              className="form-control"
              id="city"
              placeholder="Upišite city"
              name="city"
              value={location.city}
              onChange={promeni}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => { mode === 'unos' ? unesiLocation(e) : promeniLocation(e) }}
          >
            Sačuvaj
          </button>
        </form>
      </div>

      <table className="table">
        <thead className="table-dark">
          <tr>
            <th></th>
            <th>Street</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {locations.map(location => (
            <tr key={location.street}>
              <td className='col-1'>
                <button
                  type='submit'
                  className='btn btn-secondary btn-sm'
                  onClick={() => pokreniPromenu(location)}
                >
                  Promeni
                </button>
                <button
                  type='submit'
                  className='btn btn-danger btn-sm'
                  onClick={() => izbrisiLocation(location)}
                >
                  Obriši
                </button>
              </td>
              <td>{location.street}</td>
              <td>{location.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Locations;
