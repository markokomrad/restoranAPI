import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const baseUrl = "http://localhost:5000";
const MenuPage = () => {
  // Univerzalni
  const [mode, postaviMode] = useState("unos");
  const [activeForm, setActiveForm] = useState(null)
  // Drzave
  const [countries, postaviCountries] = useState([]);
  const [country, postaviCountry] = useState({});
  const [countryId, postaviCountryId] = useState(null);
  // Lokacije
  const [locations, postaviLocations] = useState([]);
  const [location, postaviLocation] = useState({});
  const [locationId, postaviLocationId] = useState(null);
  // Restorani
  const [restaurants, postaviRestaurants] = useState([]);
  const [restaurant, postaviRestaurant] = useState({});
  const [restaurantId, postaviRestaurantId] = useState(null);
  // Meniji
  const [foods, postaviFoods] = useState([]);
  const [food, postaviFood] = useState({});
  const [foodId, postaviFoodId] = useState(null);

  // POCETAK Funkcija za drzavu ---------------------------------------------------------------

  const dohvatiCountries = async () => {
    const podaci = await axios.get('http://localhost:5000/country');
    const countries = podaci.data.countries;
    postaviCountries(countries);
  }

  const pokreniPromenuCountry = (c) => {
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
      const response = await axios.post('http://localhost:5000/country', country);
      postaviCountries([...countries, response.data]);
    } catch (err) {
      if (err.response.status === 400) {
        alert('Code already exists');
      }
      console.log(err.message);
    }
  }

  const ukucajCountry = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    postaviCountry(values => ({...values, [name]: value}));
  }

  useEffect(() => { dohvatiCountries(); }, []);

  // KRAJ funkcija za drzavu ----------------------------------------------------------------------

  // POCETAK funkcija za location -----------------------------------------------------------------

  const dohvatiLocations = async () => {
    const podaci = await axios.get('http://localhost:5000/location');
    const locations = podaci.data.locations;
    postaviLocations(locations);
  }

  const pokreniPromenuLocation = (l) => {
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
  const ukucajLocation = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    postaviLocation(values => ({...values, [name]: value}));
    console.log(location);
  }

  useEffect( () => {dohvatiLocations(); }, []);
  
  // KRAJ funkcija za location -------------------------------------------------------------------

  // POCETAK funkcija za restaurant -----------------------------------------------------------------

  const dohvatiRestaurants = async () => {
    const podaci = await axios.get('http://localhost:5000/restaurant');
    const restaurants = podaci.data.restaurants;
    postaviRestaurants(restaurants);
  }

  const pokreniPromenuRestaurant = (l) => {
    postaviRestaurant(l);
    postaviRestaurantId(l.id);
    postaviMode('promena');
  }

  const promeniRestaurant = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.put(`${baseUrl}/restaurant/${restaurantId}`, restaurant);
  
      const ll = restaurants.map(l => 
        {
          if (l.id === restaurantId)
          {
            return data.data.restaurant;
          }
          else{
            return l;
          }
        });
      postaviRestaurants(ll);
      postaviRestaurant({});
      postaviMode('unos');
      
    } catch(err)
    {
      console.log(err.message);
    }
  }

  const izbrisiRestaurant = (l) => {
    try 
    {
      axios.delete(`${baseUrl}/restaurant/${l.id}`, restaurant)
      .then(() => dohvatiRestaurants()).then(response => console.log('Deleted succesfully'));
    }
    catch(err)
    {
      console.log(err.message)
    }
  }

  const unesiRestaurant = async (e) => {
    e.preventDefault();
    try {
      
      const data = await axios.post(
        'http://localhost:5000/restaurant', restaurant
      );
      postaviRestaurants([...restaurants, data.data]);
    } catch (err) {
      if (err.response.status === 400) {
        alert('Telephone number already exists');
      }
      console.log(err.message);
    }
  }
  const ukucajRestaurant = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    postaviRestaurant(values => ({...values, [name]: value}));
    console.log(restaurant);
  }

  useEffect( () => {dohvatiRestaurants(); }, []);
  
  // KRAJ funkcija za restaurant -------------------------------------------------------------------

  // POCETAK funkcija za food -----------------------------------------------------------------

  const dohvatiFoods = async () => {
    const podaci = await axios.get('http://localhost:5000/food');
    const foods = podaci.data.foods;
    postaviFoods(foods);
  }

  const pokreniPromenuFood = (l) => {
    postaviFood(l);
    postaviFoodId(l.id);
    postaviMode('promena');
  }

  const promeniFood = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.put(`${baseUrl}/food/${foodId}`, food);
  
      const ll = foods.map(l => 
        {
          if (l.id === foodId)
          {
            return data.data.food;
          }
          else{
            return l;
          }
        });
      postaviFoods(ll);
      postaviFood({});
      postaviMode('unos');
      
    } catch(err)
    {
      console.log(err.message);
    }
  }

  const izbrisiFood = (l) => {
    try 
    {
      axios.delete(`${baseUrl}/food/${l.id}`, food)
      .then(() => dohvatiFoods()).then(response => console.log('Deleted succesfully'));
    }
    catch(err)
    {
      console.log(err.message)
    }
  }

  const unesiFood = async (e) => {
    e.preventDefault();
    try {
      
      const data = await axios.post(
        'http://localhost:5000/food', food
      );
      postaviFoods([...foods, data.data]);
    } catch (err) {
      console.log(err.message);
    }
  }
  const ukucajFood = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    postaviFood(values => ({...values, [name]: value}));
    console.log(food);
  }

  useEffect( () => {dohvatiFoods(); }, []);
  
  // KRAJ funkcija za food -------------------------------------------------------------------

  // POCETAK Univerzalnih funkcija ------------------------------------------------------------------

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/user/logout', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        window.location.href = '/';
      } else if (response.status === 404) {
        console.error('Logout nije uspeo');
        window.location.href ='/'
      }
    } catch (error) {
      console.error('Greška prilikom odjave:', error);
    }
  };

  const toggleForm = (form) => {
    setActiveForm(activeForm === form ? null : form);
  }

  // KRAJ Univerzalnih funkcija ---------------------------------------------------------------------

  return (
    <div className="menu-page">
      <div className="header">
        <button onClick={() => toggleForm('countries')} style={{ cursor: 'pointer', display: 'inline-block' }}>Zemlje</button>
        <button onClick={() => toggleForm('locations')} style={{ cursor: 'pointer', display: 'inline-block' }}>Lokacije</button>
        <button onClick={() => toggleForm('restaurants')} style={{ cursor: 'pointer', display: 'inline-block' }}>Restorani</button>
        <button onClick={() => toggleForm('foods')} style={{ cursor: 'pointer', display: 'inline-block' }}>Meni</button>
      </div>
      <div className="your-text-class">
        <h1 className="heading-menu">RestaurantAPI</h1>
      </div>
      {/* Unos zemlje */}
      {activeForm === 'countries' && (
        <div className="form-container">
          <form>
            <div className="mb-3 mt-3">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Upišite ime zemlje"
                name="name"
                value={country.name}
                onChange={ukucajCountry}
              />
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="code">Code:</label>
              <input
                type="text"
                className="form-control"
                id="code"
                placeholder="Upišite kod zemlje"
                name="code"
                value={country.code}
                onChange={ukucajCountry}
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
          <div className="table-container">
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
                      onClick={() => pokreniPromenuCountry(country)}
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
      )}
      {/* Unos lokacije */}
      {activeForm === 'locations' && (
        <div className="form-container">
          <form>
            <div className="mb-3 mt-3">
              <label htmlFor="street">Street:</label>
              <input
                type="text"
                className="form-control"
                id="street"
                placeholder="Upišite ulicu u kojoj se nalazi restoran"
                name="street"
                value={location.street}
                onChange={ukucajLocation}
              />
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                className="form-control"
                id="city"
                placeholder="Upišite grad u kojem se nalazi restoran"
                name="city"
                value={location.city}
                onChange={ukucajLocation}
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
          <div className="table-container">
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
                      onClick={() => pokreniPromenuLocation(location)}
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
        </div>
      )}
      {/* Unos restorana */}
      {activeForm === 'restaurants' && (
        <div className="form-container">
          <form>
            <div className="mb-3 mt-3">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Upišite ime restorana"
                name="name"
                value={restaurant.name}
                onChange={ukucajRestaurant}
              />
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="telephone">Telephone:</label>
              <input
                type="text"
                className="form-control"
                id="telephone"
                placeholder="Upišite telefonski broj restorana"
                name="telephone"
                value={restaurant.telephone}
                onChange={ukucajRestaurant}
              />
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="rating">Rating:</label>
              <input
                type="text"
                className="form-control"
                id="rating"
                placeholder="Upišite ocenu restorana"
                name="rating"
                value={restaurant.rating}
                onChange={ukucajRestaurant}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => { mode === 'unos' ? unesiRestaurant(e) : promeniRestaurant(e) }}
            >
              Sačuvaj
            </button>
          </form>
          <div className="table-container-dugo">
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th></th>
                <th>Name</th>
                <th>Telephone</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map(restaurant => (
                <tr key={restaurant.telephone}>
                  <td className='col-1'>
                    <button
                      type='submit'
                      className='btn btn-secondary btn-sm'
                      onClick={() => pokreniPromenuRestaurant(restaurant)}
                    >
                      Promeni
                    </button>
                    <button
                      type='submit'
                      className='btn btn-danger btn-sm'
                      onClick={() => izbrisiRestaurant(restaurant)}
                    >
                      Obriši
                    </button>
                  </td>
                  <td>{restaurant.name}</td>
                  <td>{restaurant.telephone}</td>
                  <td>{restaurant.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}
      {/* Unos menija */}
      {activeForm === 'foods' && (
        <div className="form-container">
          <form>
            <div className="mb-3 mt-3">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Upišite naziv menija"
                name="name"
                value={food.name}
                onChange={ukucajFood}
              />
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="price">Price:</label>
              <input
                type="text"
                className="form-control"
                id="price"
                placeholder="Upišite cenu menija"
                name="price"
                value={food.price}
                onChange={ukucajFood}
              />
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="rating">Rating:</label>
              <input
                type="text"
                className="form-control"
                id="rating"
                placeholder="Upišite ocenu menija"
                name="rating"
                value={food.rating}
                onChange={ukucajFood}
              />
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="ingredients">Ingredients:</label>
              <input
                type="text"
                className="form-control"
                id="ingredients"
                placeholder="Upišite sastojke menija"
                name="ingredients"
                value={food.ingredients}
                onChange={ukucajFood}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => { mode === 'unos' ? unesiFood(e) : promeniFood(e) }}
            >
              Sačuvaj
            </button>
          </form>
          <div className="table-container-dugo-dugo">
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th></th>
                <th>Name</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Ingredients</th>
              </tr>
            </thead>
            <tbody>
              {foods.map(food => (
                <tr key={food.name}>
                  <td className='col-1'>
                    <button
                      type='submit'
                      className='btn btn-secondary btn-sm'
                      onClick={() => pokreniPromenuFood(food)}
                    >
                      Promeni
                    </button>
                    <button
                      type='submit'
                      className='btn btn-danger btn-sm'
                      onClick={() => izbrisiFood(food)}
                    >
                      Obriši
                    </button>
                  </td>
                  <td>{food.name}</td>
                  <td>{food.price}</td>
                  <td>{food.rating}</td>
                  <td>{food.ingredients}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}
      <div className='header-logout'>
      <button onClick={handleLogout} className='logout-button'>Log out</button>
      </div>
    </div>
  );
}

export default MenuPage;
