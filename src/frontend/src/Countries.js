import axios from "axios";
import {useEffect, useState} from "react";
import './App.css';

const baseUrl = "http://localhost:5000";

function Countries() {
  const [countries, postaviCountries] = useState([]);
  const [country, postaviCountry] = useState({});
  const [countryId, postaviCountryId] = useState(null);
  const [mode, postaviMode] = useState("unos");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const dohvatiCountries = async () => {
    const podaci = await axios.get('http://localhost:5000/country');
    const countries = podaci.data.countries;
    postaviCountries(countries);
  }

  const pokreniPromenu = (c) => {
    postaviCountry(c);
    postaviCountryId(c.id);
    postaviMode('promena');
  }

  const promeniCountry = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.put(`${baseUrl}/country/${countryId}`, country);
  
      const cc = countries.map(c => 
        {
          if (c.id === countryId)
          {
            return data.data.country;
          }
          else{
            return c;
          }
        });
      postaviCountries(cc);
      postaviCountry({});
      postaviMode('unos');
      
    } catch(err)
    {
      console.log(err.message);
    }
  }

  const izbrisiCountry = (c) => {
    try 
    {
      axios.delete(`${baseUrl}/country/${c.id}`, country)
      .then(() => dohvatiCountries()).then(response => console.log('Deleted succesfully'));
    }
    catch(err)
    {
      console.log(err.message)
    }
  }

  const unesiCountry = async (e) => {
    e.preventDefault();
    try {
      
      const data = await axios.post(
        'http://localhost:5000/country', country
      );
      postaviCountries([...countries, data.data]);
      //console.log(country);
    } catch (err) {
      console.log(err.message);
    }
  }
  const promeni = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    postaviCountry(values => ({...values, [name]: value}));
    console.log(country);
  }

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  }

  useEffect( () => {dohvatiCountries(); }, []);
  //console.log(countries);
  return (
    <div className="container mt-3">
      <h2 onClick={toggleForm} className="btn btn-outline-primary" style={{ cursor: 'pointer', display: 'inline-block' }}>Unos Zemlje</h2>

      <div className={isFormOpen ? "collapse show" : "collapse"}>
        <form>
          <div className="mb-3 mt-3">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Upišite name"
              name="name"
              value={country.name}
              onChange={promeni}
            />
          </div>

          <div className="mb-3 mt-3">
            <label htmlFor="code">Code:</label>
            <input
              type="text"
              className="form-control"
              id="code"
              placeholder="Upišite code"
              name="code"
              value={country.code}
              onChange={promeni}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => { mode === 'unos' ? unesiCountry(e) : promeniCountry(e) }}
          >
            Sačuvaj
          </button>
        </form>
      

      <table className="table">
        <thead className="table-dark">
          <tr>
            <th></th>
            <th>Name</th>
            <th>Code</th>
          </tr>
        </thead>
        <tbody>
          {countries.map(country => (
            <tr key={country.code}>
              <td className='col-1'>
                <button
                  type='submit'
                  className='btn btn-secondary btn-sm'
                  onClick={() => pokreniPromenu(country)}
                >
                  Promeni
                </button>
                <button
                  type='submit'
                  className='btn btn-danger btn-sm'
                  onClick={() => izbrisiCountry(country)}
                >
                  Obriši
                </button>
              </td>
              <td>{country.name}</td>
              <td>{country.code}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Countries;
