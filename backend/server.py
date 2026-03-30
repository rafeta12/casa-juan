from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, date

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# ==================== MODELS ====================

class ReservationCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    date: str  # ISO format date
    time: str
    guests: int
    notes: Optional[str] = ""
    language: str = "es"

class Reservation(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    date: str
    time: str
    guests: int
    notes: Optional[str] = ""
    language: str = "es"
    status: str = "pending"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class MenuItem(BaseModel):
    id: str
    name: dict  # {"es": "...", "en": "...", "de": "..."}
    description: dict
    price: float
    category: str
    image: Optional[str] = None

# ==================== MENU DATA ====================

MENU_ITEMS = [
    # PANES
    {"id": "1", "name": {"es": "Pan de la casa", "en": "House bread", "de": "Hausbrot"}, "half": None, "full": 0.80, "category": "panes"},
    {"id": "2", "name": {"es": "Pan con ajo", "en": "Garlic bread", "de": "Knoblauchbrot"}, "half": 1.80, "full": 2.50, "category": "panes"},
    {"id": "3", "name": {"es": "Pan Catalana (tomate, ajo, aceite de oliva)", "en": "Catalan bread (tomato, garlic, olive oil)", "de": "Katalanisches Brot (Tomate, Knoblauch, Olivenöl)"}, "half": 1.80, "full": 2.50, "category": "panes"},
    {"id": "4", "name": {"es": "Pan, tomate, jamón ibérico Badajoz", "en": "Bread, tomato, Iberian ham Badajoz", "de": "Brot, Tomate, Ibérico-Schinken Badajoz"}, "half": 3.50, "full": 6.00, "category": "panes"},
    {"id": "5", "name": {"es": "Pan con tomate y manchego curado", "en": "Bread with tomato and cured manchego", "de": "Brot mit Tomate und gereiftem Manchego"}, "half": 3.50, "full": 6.00, "category": "panes"},
    {"id": "6", "name": {"es": "Pan con tomate, manchego e ibérico", "en": "Bread with tomato, manchego and Iberian ham", "de": "Brot mit Tomate, Manchego und Ibérico"}, "half": 4.00, "full": 7.00, "category": "panes"},
    # ENTRANTES
    {"id": "7", "name": {"es": "Ensaladilla rusa", "en": "Russian salad", "de": "Russischer Salat"}, "half": 4.00, "full": 6.00, "category": "entrantes"},
    {"id": "8", "name": {"es": "Queso blanco de Guía de Isora", "en": "White cheese from Guía de Isora", "de": "Weißkäse aus Guía de Isora"}, "half": 5.00, "full": 8.00, "category": "entrantes"},
    {"id": "9", "name": {"es": "Queso manchego curado", "en": "Cured manchego cheese", "de": "Gereifter Manchego-Käse"}, "half": 7.00, "full": 10.50, "category": "entrantes"},
    {"id": "10", "name": {"es": "Queso blanco a la plancha con mojos o arándanos", "en": "Grilled white cheese with mojos or blueberries", "de": "Gegrillter Weißkäse mit Mojos oder Heidelbeeren"}, "half": None, "full": 9.50, "category": "entrantes"},
    {"id": "11", "name": {"es": "Croquetas mixtas (pollo, bonito, jamón, espinaca)", "en": "Mixed croquettes (chicken, tuna, ham, spinach)", "de": "Gemischte Kroketten (Huhn, Thunfisch, Schinken, Spinat)"}, "half": 5.00, "full": 7.00, "category": "entrantes"},
    {"id": "12", "name": {"es": "Champiñones empanados rellenos de almogrote", "en": "Breaded mushrooms stuffed with almogrote", "de": "Panierte Pilze gefüllt mit Almogrote"}, "half": 6.00, "full": 9.00, "category": "entrantes"},
    {"id": "13", "name": {"es": "Gambas al ajillo", "en": "Garlic prawns", "de": "Knoblauchgarnelen"}, "half": None, "full": 9.90, "category": "entrantes"},
    {"id": "14", "name": {"es": "Tabla de jamón ibérico con tostas con tomate", "en": "Iberian ham board with tomato toasts", "de": "Ibérico-Schinkenplatte mit Tomatentoasts"}, "half": 12.50, "full": 18.00, "category": "entrantes"},
    {"id": "15", "name": {"es": "Pimientos de Padrón", "en": "Padrón peppers", "de": "Padrón-Paprika"}, "half": 5.00, "full": 8.00, "category": "entrantes"},
    {"id": "16", "name": {"es": "Caracoles", "en": "Snails", "de": "Schnecken"}, "half": 7.00, "full": 11.00, "category": "entrantes"},
    # ENSALADAS
    {"id": "17", "name": {"es": "Ensalada mixta", "en": "Mixed salad", "de": "Gemischter Salat"}, "half": None, "full": 6.00, "category": "ensaladas"},
    {"id": "18", "name": {"es": "Ensalada de atún", "en": "Tuna salad", "de": "Thunfischsalat"}, "half": None, "full": 7.00, "category": "ensaladas"},
    {"id": "19", "name": {"es": "Ensalada de la casa", "en": "House salad", "de": "Haussalat"}, "half": None, "full": 8.50, "category": "ensaladas"},
    # CARNES
    {"id": "20", "name": {"es": "Entrecot añojo", "en": "Yearling entrecote", "de": "Jungstier-Entrecôte"}, "half": None, "full": 15.00, "category": "carnes"},
    {"id": "21", "name": {"es": "Carne fiesta", "en": "Fiesta meat", "de": "Fiesta-Fleisch"}, "half": None, "full": 11.90, "category": "carnes"},
    {"id": "22", "name": {"es": "Ternera en salsa", "en": "Beef in sauce", "de": "Rindfleisch in Sauce"}, "half": 8.50, "full": 13.00, "category": "carnes"},
    {"id": "23", "name": {"es": "Albóndigas con papas fritas", "en": "Meatballs with fries", "de": "Fleischbällchen mit Pommes"}, "half": 6.00, "full": 9.90, "category": "carnes"},
    {"id": "24", "name": {"es": "Pechuga de pollo empanada (ensalada y papas fritas)", "en": "Breaded chicken breast (salad and fries)", "de": "Panierte Hähnchenbrust (Salat und Pommes)"}, "half": None, "full": 9.90, "category": "carnes"},
    {"id": "25", "name": {"es": "Alitas de pollo con papas fritas", "en": "Chicken wings with fries", "de": "Hähnchenflügel mit Pommes"}, "half": 5.00, "full": 8.00, "category": "carnes"},
    {"id": "26", "name": {"es": "Salchichas con papas fritas", "en": "Sausages with fries", "de": "Würstchen mit Pommes"}, "half": 5.00, "full": 8.00, "category": "carnes"},
    {"id": "27", "name": {"es": "Lingote de vaca madurada (220 gramos)", "en": "Aged beef ingot (220 grams)", "de": "Gereiftes Rindfleisch (220 Gramm)"}, "half": None, "full": 17.00, "category": "carnes"},
    # PESCADOS
    {"id": "28", "name": {"es": "Pulpo a la gallega", "en": "Galician-style octopus", "de": "Galizischer Oktopus"}, "half": 13.00, "full": 19.00, "category": "pescados"},
    {"id": "29", "name": {"es": "Pulpo a la canaria", "en": "Canarian-style octopus", "de": "Kanarischer Oktopus"}, "half": 13.00, "full": 19.00, "category": "pescados"},
    {"id": "30", "name": {"es": "Chopitos fritos", "en": "Fried baby squid", "de": "Frittierte Baby-Tintenfische"}, "half": 6.50, "full": 9.90, "category": "pescados"},
    {"id": "31", "name": {"es": "Calamares a la andaluza", "en": "Andalusian-style squid", "de": "Andalusische Calamares"}, "half": 7.00, "full": 12.00, "category": "pescados"},
    {"id": "32", "name": {"es": "Chipirones a la plancha", "en": "Grilled baby squid", "de": "Gegrillte Baby-Tintenfische"}, "half": 7.00, "full": 12.00, "category": "pescados"},
    {"id": "33", "name": {"es": "Chocos a la plancha con papas arrugadas y ensalada", "en": "Grilled cuttlefish with wrinkled potatoes and salad", "de": "Gegrillte Sepien mit Runzelkartoffeln und Salat"}, "half": 8.00, "full": 13.00, "category": "pescados"},
    {"id": "34", "name": {"es": "Atún a la plancha con papas arrugadas y ensalada", "en": "Grilled tuna with wrinkled potatoes and salad", "de": "Gegrillter Thunfisch mit Runzelkartoffeln und Salat"}, "half": 7.50, "full": 10.50, "category": "pescados"},
    {"id": "35", "name": {"es": "Bacalao a la portuguesa", "en": "Portuguese-style cod", "de": "Kabeljau auf portugiesische Art"}, "half": 9.90, "full": 17.00, "category": "pescados"},
    {"id": "36", "name": {"es": "Pescado a la espalda", "en": "Fish on the back", "de": "Fisch auf dem Rücken"}, "half": None, "full": 14.50, "category": "pescados"},
    {"id": "37", "name": {"es": "Parrilla de pescado y mariscos (mín. 2 pers.)", "en": "Fish and seafood grill (min. 2 pers.)", "de": "Fisch- und Meeresfrüchtegrill (mind. 2 Pers.)"}, "half": None, "full": 42.00, "category": "pescados"},
    {"id": "38", "name": {"es": "Fritura de pescado y mariscos (mín. 2 pers.)", "en": "Fried fish and seafood (min. 2 pers.)", "de": "Frittierte Fisch und Meeresfrüchte (mind. 2 Pers.)"}, "half": None, "full": 44.00, "category": "pescados"},
    {"id": "39", "name": {"es": "Zamburiñas a la plancha", "en": "Grilled scallops", "de": "Gegrillte Jakobsmuscheln"}, "half": 9.90, "full": 18.00, "category": "pescados"},
    {"id": "40", "name": {"es": "Navajas a la plancha", "en": "Grilled razor clams", "de": "Gegrillte Schwertmuscheln"}, "half": 6.00, "full": 9.90, "category": "pescados"},
    {"id": "41", "name": {"es": "Langostinos a la plancha", "en": "Grilled king prawns", "de": "Gegrillte Riesengarnelen"}, "half": 6.00, "full": 10.90, "category": "pescados"},
    {"id": "42", "name": {"es": "Gambón a la plancha (unidad)", "en": "Grilled large prawn (unit)", "de": "Gegrillte Großgarnele (Stück)"}, "half": None, "full": 2.00, "category": "pescados"},
    # PAPAS
    {"id": "43", "name": {"es": "Papas fritas", "en": "French fries", "de": "Pommes frites"}, "half": None, "full": None, "category": "papas"},
    {"id": "44", "name": {"es": "Papas arrugadas", "en": "Wrinkled potatoes", "de": "Runzelkartoffeln"}, "half": 2.50, "full": 4.00, "category": "papas"},
    {"id": "45", "name": {"es": "Huevos rotos con papas fritas", "en": "Broken eggs with fries", "de": "Zerbrochene Eier mit Pommes"}, "half": None, "full": 8.00, "category": "papas"},
    # POSTRES CASEROS
    {"id": "46", "name": {"es": "Quesillo", "en": "Quesillo (flan)", "de": "Quesillo (Flan)"}, "half": None, "full": 4.00, "category": "postres"},
    {"id": "47", "name": {"es": "Tiramisú", "en": "Tiramisu", "de": "Tiramisu"}, "half": None, "full": 4.50, "category": "postres"},
]

# ==================== ROUTES ====================

@api_router.get("/")
async def root():
    return {"message": "Casa Juan API"}

@api_router.get("/menu", response_model=List[dict])
async def get_menu():
    return MENU_ITEMS

@api_router.post("/reservations", response_model=Reservation)
async def create_reservation(reservation: ReservationCreate):
    reservation_obj = Reservation(
        name=reservation.name,
        email=reservation.email,
        phone=reservation.phone,
        date=reservation.date,
        time=reservation.time,
        guests=reservation.guests,
        notes=reservation.notes,
        language=reservation.language
    )
    
    doc = reservation_obj.model_dump()
    await db.reservations.insert_one(doc)
    
    return reservation_obj

@api_router.get("/reservations", response_model=List[Reservation])
async def get_reservations():
    reservations = await db.reservations.find({}, {"_id": 0}).to_list(1000)
    return reservations

@api_router.get("/reservations/{reservation_id}", response_model=Reservation)
async def get_reservation(reservation_id: str):
    reservation = await db.reservations.find_one({"id": reservation_id}, {"_id": 0})
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")
    return reservation

@api_router.delete("/reservations/{reservation_id}")
async def cancel_reservation(reservation_id: str):
    result = await db.reservations.delete_one({"id": reservation_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Reservation not found")
    return {"message": "Reservation cancelled"}

# Time slots for reservations - Restaurant hours: Tue-Sat 12:00-15:30, 19:00-22:00
@api_router.get("/time-slots")
async def get_time_slots():
    return {
        "lunch": ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00"],
        "dinner": ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30"]
    }

# Get opening hours
@api_router.get("/hours")
async def get_hours():
    return {
        "monday": {"closed": True},
        "tuesday": {"lunch": "12:00-15:30", "dinner": "19:00-22:00"},
        "wednesday": {"lunch": "12:00-15:30", "dinner": "19:00-22:00"},
        "thursday": {"lunch": "12:00-15:30", "dinner": "19:00-22:00"},
        "friday": {"lunch": "12:00-15:30", "dinner": "19:00-22:00"},
        "saturday": {"lunch": "12:00-15:30", "dinner": "19:00-22:00"},
        "sunday": {"closed": True}
    }

# Include the router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
