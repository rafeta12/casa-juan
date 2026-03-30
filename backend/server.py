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
    {
        "id": "1",
        "name": {"es": "Papas Arrugadas con Mojo", "en": "Wrinkled Potatoes with Mojo Sauce", "de": "Runzelkartoffeln mit Mojo-Sauce"},
        "description": {"es": "Papas canarias con mojo rojo y verde", "en": "Canarian potatoes with red and green mojo", "de": "Kanarische Kartoffeln mit roter und grüner Mojo"},
        "price": 6.50,
        "category": "starters",
        "image": None
    },
    {
        "id": "2",
        "name": {"es": "Gofio Escaldado", "en": "Scalded Gofio", "de": "Gebrühter Gofio"},
        "description": {"es": "Tradicional gofio con caldo de pescado", "en": "Traditional gofio with fish broth", "de": "Traditioneller Gofio mit Fischbrühe"},
        "price": 7.00,
        "category": "starters",
        "image": None
    },
    {
        "id": "3",
        "name": {"es": "Carne Fiesta", "en": "Fiesta Meat", "de": "Fiesta-Fleisch"},
        "description": {"es": "Cerdo marinado a la canaria", "en": "Canarian marinated pork", "de": "Kanarisch mariniertes Schweinefleisch"},
        "price": 12.50,
        "category": "mains",
        "image": None
    },
    {
        "id": "4",
        "name": {"es": "Conejo en Salmorejo", "en": "Rabbit in Salmorejo", "de": "Kaninchen in Salmorejo"},
        "description": {"es": "Conejo guisado al estilo canario", "en": "Canarian-style stewed rabbit", "de": "Kanarisches Kanincheneintopf"},
        "price": 14.00,
        "category": "mains",
        "image": None
    },
    {
        "id": "5",
        "name": {"es": "Sancocho Canario", "en": "Canarian Sancocho", "de": "Kanarischer Sancocho"},
        "description": {"es": "Pescado salado con papas y mojo", "en": "Salted fish with potatoes and mojo", "de": "Salzfisch mit Kartoffeln und Mojo"},
        "price": 13.50,
        "category": "mains",
        "image": None
    },
    {
        "id": "6",
        "name": {"es": "Chuletas de Cerdo", "en": "Pork Chops", "de": "Schweinekoteletts"},
        "description": {"es": "Chuletas a la plancha con papas", "en": "Grilled chops with potatoes", "de": "Gegrillte Koteletts mit Kartoffeln"},
        "price": 11.00,
        "category": "mains",
        "image": None
    },
    {
        "id": "7",
        "name": {"es": "Bienmesabe", "en": "Bienmesabe (Almond Dessert)", "de": "Bienmesabe (Mandeldessert)"},
        "description": {"es": "Postre canario de almendras", "en": "Canarian almond dessert", "de": "Kanarisches Mandeldessert"},
        "price": 5.00,
        "category": "desserts",
        "image": None
    },
    {
        "id": "8",
        "name": {"es": "Frangollo", "en": "Frangollo", "de": "Frangollo"},
        "description": {"es": "Postre tradicional de maíz", "en": "Traditional corn pudding", "de": "Traditioneller Maispudding"},
        "price": 4.50,
        "category": "desserts",
        "image": None
    }
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
