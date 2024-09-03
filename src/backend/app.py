from flask import Flask, request # type: ignore #ignore
from flask_sqlalchemy import SQLAlchemy # type: ignore #ignore
from datetime import datetime # type: ignore #ignore
from flask_cors import CORS # type: ignore #ignore
from sqlalchemy import create_engine # type: ignore #ignore
from sqlalchemy_utils import database_exists, create_database # type: ignore #ignore

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:pas0123@localhost/tabele"

db = SQLAlchemy(app)
app.app_context().push()

engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'])
if not database_exists(engine.url):
    create_database(engine.url)

CORS(app)

# POCETAK KLASA ZA WEB APLIKACIJU -----------------------------------

class Country(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100), nullable = False)
    code = db.Column(db.String(100), nullable = False)

    def __init__(self, name, code):
        self.name = name
        self.code = code
    
    def __repr__(self) -> str:
        return f"name: {self.name}, code: {self.code}"

class Location(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    street = db.Column(db.String(100), nullable = False)
    city = db.Column(db.String(100), nullable = False)

    def __init__(self, street, city):
        self.street = street
        self.city = city

    def __repr__(self) -> str:
        return f"street: {self.street}, city: {self.city}" 

class Restaurant(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100), nullable = False)
    telephone = db.Column(db.String(100), nullable = False)
    rating = db.Column(db.Float, nullable = False)

    def __init__(self, name, telephone, rating):
        self.name = name
        self.telephone = telephone
        self.rating = rating

    def __repr__(self) -> str:
        return f"name: {self.name}, telephone: {self.telephone}, rating: {self.rating}"
    
class Food(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100), nullable = False)
    price = db.Column(db.Float, nullable = False)
    rating = db.Column(db.Float, nullable = False)
    ingredients = db.Column(db.String(100), nullable = False)

    def __init__(self, name, price, rating, ingredients):
        self.name = name
        self.price = price
        self.rating = rating
        self.ingredients = ingredients

    def __repr__(self) -> str:
        return f"name: {self.name}, telephone: {self.price}, rating: {self.rating}, ingredients: {self.ingredients}"

class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(100), nullable = False)
    password = db.Column(db.String(100), nullable = False)
    email = db.Column(db.String(100), nullable = False)
    logged = db.Column(db.Boolean, nullable = False)

    def __init__(self, username, password, email, logged = False):
        self.username = username
        self.password = password
        self.email = email
        self.logged = logged
    
    def __repr__(self):
        return f"Username: {self.username}, password {self.password}, email: {self.email}, logged: {self.logged}"

db.create_all()

# KRAJ KLASA ZA WEB APLIKACIJU --------------------------------------------------

# zahtev na http://127.0.0.1:5000
@app.route('/')
def inicijalni():
    return 'Caossssss'

# POCETAK METODA ZA WEB APLIKACIJU -------------------------------------------------

# POCETAK Metoda za COUNTRY ----------------------------------------------------------

# Format String za COUNTRY
def formatSCountry(country: Country):
    return {
        'id': country.id,
        'name': country.name,
        'code': country.code
    }

# POST Metoda za COUNTRY
@app.route('/country', methods = ['POST'])
def kreirajCountry():
    name = request.json['name']
    code = request.json['code']
    existing_country = Country.query.filter_by(code=code).first()
    if existing_country:
        return {"error": "Code already exists"}, 400
    country = Country(name, code)
    
    db.session.add(country)
    db.session.commit()
    return formatSCountry(country)

# GET Metoda za COUNTRY
@app.route('/country', methods=['GET'])
def dohvatiCountries():
    countries = Country.query.order_by(Country.id.asc()).all()
    listaCountries = [formatSCountry(s) for s in countries]
    return {'countries': listaCountries}

# GET by ID Metoda za COUNTRY
@app.route('/country/<id>', methods=['GET'])
def dohvatiCountry(id):
    country = Country.query.filter_by(id=id).one()
    return {
        'country': formatSCountry(country=country)
    }

# PUT Metoda za COUNTRY
@app.route("/country/<id>", methods=['PUT'])
def promeniCountry(id):
    country = Country.query.filter_by(id=id)
    name = request.json['name']
    code = request.json['code']
    country.update(
        {
            'name': name,
            'code': code
        }
    )
    db.session.commit()
    return {'country': formatSCountry(country.one())}

# DELETE Metoda za COUNTRY
@app.route("/country/<id>", methods=['DELETE'])
def obrisiCountry(id):
    country = Country.query.filter_by(id=id).one()
    db.session.delete(country)
    db.session.commit()
    return f"Country (id: {country.id}) obrisan."

# KRAJ Metoda za COUNTRY ----------------------------------------------------

# POCETAK Metoda za LOCATION ------------------------------------------------

# Format String za LOCATION
def formatSLocation(location: Location):
    return {
        'id': location.id,
        'street': location.street,
        'city': location.city,
    }

# POST Metoda za LOCATION
@app.route('/location', methods = ['POST'])
def kreirajLocation():
    street = request.json['street']
    city = request.json['city']
    location = Location(street, city)
    
    db.session.add(location)
    db.session.commit()
    return formatSLocation(location)

# GET Metoda za LOCATION
@app.route('/location', methods=['GET'])
def dohvatiLocations():
    locations = Location.query.order_by(Location.id.asc()).all()
    listaLocations = [formatSLocation(s) for s in locations]
    return {'locations': listaLocations}

# GET by ID Metoda za LOCATION
@app.route('/location/<id>', methods=['GET'])
def dohvatiLocation(id):
    location = Location.query.filter_by(id=id).one()
    return {
        'location': formatSLocation(location=location)
    }

# PUT Metoda za LOCATION
@app.route("/location/<id>", methods=['PUT'])
def promeniLocation(id):
    location = Location.query.filter_by(id=id)
    street = request.json['street']
    city = request.json['city']
    location.update(
        {
            'street': street,
            'city': city
        }
    )
    db.session.commit()
    return {'location': formatSLocation(location.one())}

# DELETE Metoda za LOCATION
@app.route("/location/<id>", methods=['DELETE'])
def obrisiLocation(id):
    location = Location.query.filter_by(id=id).one()
    db.session.delete(location)
    db.session.commit()
    return f"Location (id: {location.id}) obrisan."

# KRAJ Metoda za LOCATION -----------------------------------------------

# POCETAK Metoda za RESTAURANT ------------------------------------

# Format String za RESTAURANT
def formatSRestaurant(restaurant: Restaurant):
    return {
        'id': restaurant.id,
        'name': restaurant.name,
        'telephone': restaurant.telephone,
        'rating': restaurant.rating,
    }

# POST Metoda za RESTAURANT
@app.route('/restaurant', methods = ['POST'])
def kreirajRestaurant():
    name = request.json['name']
    telephone = request.json['telephone']
    rating = request.json['rating']
    existing_restaurant = Restaurant.query.filter_by(telephone=telephone).first()
    if existing_restaurant:
        return {"error": "Telephone number already exists"}, 400
    restaurant = Restaurant(name, telephone, rating)
    
    db.session.add(restaurant)
    db.session.commit()
    return formatSRestaurant(restaurant)

# GET Metoda za RESTAURANT
@app.route('/restaurant', methods=['GET'])
def dohvatiRestaurants():
    restaurants = Restaurant.query.order_by(Restaurant.id.asc()).all()
    listaRestaurants = [formatSRestaurant(s) for s in restaurants]
    return {'restaurants': listaRestaurants}

# GET by ID Metoda za RESTAURANT
@app.route('/restaurant/<id>', methods=['GET'])
def dohvatiRestaurant(id):
    restaurant = Restaurant.query.filter_by(id=id).one()
    return {
        'restaurant': formatSRestaurant(restaurant=restaurant)
    }

# PUT Metoda za RESTAURANT
@app.route("/restaurant/<id>", methods=['PUT'])
def promeniRestaurant(id):
    restaurant = Restaurant.query.filter_by(id=id)
    name = request.json['name']
    telephone = request.json['telephone']
    rating = request.json['rating']
    restaurant.update(
        {
            'name': name,
            'telephone': telephone,
            'rating': rating
        }
    )
    db.session.commit()
    return {'restaurant': formatSRestaurant(restaurant.one())}

# DELETE Metoda za RESTAURANT
@app.route("/restaurant/<id>", methods=['DELETE'])
def obrisiRestaurant(id):
    restaurant = Restaurant.query.filter_by(id=id).one()
    db.session.delete(restaurant)
    db.session.commit()
    return f"Restaurant (id: {restaurant.id}) obrisan."

# KRAJ Metoda za RESTAURANT --------------------------------------------------------

# POCETAK Metoda za FOOD -----------------------------------------------------------

# Format String za FOOD
def formatSFood(food: Food):
    return {
        'id': food.id,
        'name': food.name,
        'price': food.price,
        'rating': food.rating,
        'ingredients': food.ingredients
    }

# POST Metoda za FOOD
@app.route('/food', methods = ['POST'])
def kreirajFood():
    name = request.json['name']
    price = request.json['price']
    rating = request.json['rating']
    ingredients = request.json['ingredients']
    
    food = Food(name, price, rating, ingredients)
    
    db.session.add(food)
    db.session.commit()
    return formatSFood(food)

# GET Metoda za FOOD
@app.route('/food', methods=['GET'])
def dohvatiFoods():
    foods = Food.query.order_by(Food.id.asc()).all()
    listaFoods = [formatSFood(s) for s in foods]
    return {'foods': listaFoods}

# GET by ID Metoda za FOOD
@app.route('/food/<id>', methods=['GET'])
def dohvatiFood(id):
    food = Food.query.filter_by(id=id).one()
    return {
        'food': formatSFood(food=food)
    }

# PUT Metoda za FOOD
@app.route("/food/<id>", methods=['PUT'])
def promeniFood(id):
    food = Food.query.filter_by(id=id)
    name = request.json['name']
    price = request.json['price']
    rating = request.json['rating']
    ingredients = request.json['ingredients']
    food.update(
        {
            'name': name,
            'price': price,
            'rating': rating,
            'ingredients': ingredients
        }
    )
    db.session.commit()
    return {'food': formatSFood(food.one())}

# DELETE Metoda za FOOD
@app.route("/food/<id>", methods=['DELETE'])
def obrisiFood(id):
    food = Food.query.filter_by(id=id).one()
    db.session.delete(food)
    db.session.commit()
    return f"Food (id: {food.id}) obrisan."

# KRAJ Metoda za FOOD --------------------------------------------------------------

# Format String za USER
def formatSUser(user: User):
    return {
        'id': user.id,
        'username': user.username,
        'password': user.password,
        'email': user.email,
        'logged': user.logged
    }

# handleRegister u PageRegister.js
@app.route('/user', methods = ['POST'])
def kreirajUser():
    username = request.json['username']
    password = request.json['password']
    email = request.json['email']
    logged = request.json['logged']
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return {"error": "Username already taken"}, 400
    existing_user2 = User.query.filter_by(email=email).first()
    if existing_user2:
        return {"error": "Email already taken"}, 401
    user = User(username, password, email, logged = False)
    db.session.add(user)
    db.session.commit()
    return formatSUser(user), 201

# resetPassword u ForgottenPassword.js
@app.route("/user/<username>", methods=['PUT'])
def promeniUser(username):
    user = User.query.filter_by(username=username).first()
    if user is None:
        return {'message': 'Username not found'}, 404
    user = User.query.filter_by(username=username)
    new_password = request.json['new_password']
    user.update(
        {
            'password': new_password,
        }
    )
    db.session.commit()
    return {'message': 'Password updated successfully'}

# handleLogin u PageLogin.js
@app.route('/user/login', methods=['POST'])
def login():
    username = request.json['username']
    password = request.json['password']
    user = User.query.filter_by(username=username).first()
    if user and user.password == password:
        user.logged = True
        db.session.commit()
        return {"message": "Login successful"}, 200
    else:
        return {"error": "Invalid username or password"}, 401

# handleLogout u MenuPage.js
@app.route("/user/logout", methods=['PUT'])
def logoutUser():
    user = User.query.filter_by(logged=True).first()
    if user is None:
        return {'message': 'No logged-in user found'}, 404
    user.logged = False
    db.session.commit()
    return {'message': 'User logged out successfully'}


# KRAJ METODA ZA WEB APLIKACIJU ------------------------------------------------------------




# def formatS(student: Student):
#     return {
#         'id': student.id,
#         'ime': student.ime,
#         'prezime': student.prezime,
#         'email': student.email
#     }

# @app.route('/student', methods = ['POST'])
# def kreirajStudenta():
#     ime = request.json['ime']
#     prezime = request.json['prezime']
#     email = request.json['email']
    
#     student = Student(ime, prezime, email)
    
#     db.session.add(student)
#     db.session.commit()
#     return formatS(student)
    
# @app.route('/student', methods=['GET'])
# def dohvatiStudente():
#     studenti = Student.query.order_by(Student.id.asc()).all()
#     listaStudenata = [formatS(s) for s in studenti]
#     return {'studenti': listaStudenata}

# @app.route('/student/<id>', methods=['GET'])
# def dohvatiStudenta(id):
#     student = Student.query.filter_by(id=id).one()
#     return {
#         'student': formatS(student=student)
#     }

# @app.route("/student/<id>", methods=['PUT'])
# def promeniStudenta(id):
#     student = Student.query.filter_by(id=id)
#     ime = request.json['ime']
#     prezime = request.json['prezime']
#     email = request.json['email']
#     student.update(
#         {
#             'ime': ime,
#             'prezime': prezime,
#             'email': email
#         }
#     )
#     db.session.commit()
#     return {'student': formatS(student.one())}

# @app.route("/student/<id>", methods=['DELETE'])
# def obrisiStudenta(id):
#     student = Student.query.filter_by(id=id).one()
#     db.session.delete(student)
#     db.session.commit()
#     return f"Student (id: {student.id}) obrisan."
    
    
    