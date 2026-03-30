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
    {"id": "1", "name": {"es": "Pan de la casa", "en": "House bread", "de": "Hausbrot", "pl": "Chleb domowy", "it": "Pane della casa", "pt": "Pão da casa", "ru": "Домашний хлеб"}, "half": None, "full": 0.80, "category": "panes"},
    {"id": "2", "name": {"es": "Pan con ajo", "en": "Garlic bread", "de": "Knoblauchbrot", "pl": "Chleb czosnkowy", "it": "Pane all'aglio", "pt": "Pão com alho", "ru": "Чесночный хлеб"}, "half": 1.80, "full": 2.50, "category": "panes"},
    {"id": "3", "name": {"es": "Pan Catalana (tomate, ajo, aceite)", "en": "Catalan bread (tomato, garlic, oil)", "de": "Katalanisches Brot", "pl": "Chleb kataloński", "it": "Pan con tomate", "pt": "Pão catalão", "ru": "Каталонский хлеб"}, "half": 1.80, "full": 2.50, "category": "panes"},
    {"id": "4", "name": {"es": "Pan, tomate, jamón ibérico Badajoz", "en": "Bread, tomato, Iberian ham", "de": "Brot mit Ibérico-Schinken", "pl": "Chleb z szynką ibérico", "it": "Pane con prosciutto ibérico", "pt": "Pão com presunto ibérico", "ru": "Хлеб с хамоном иберико"}, "half": 3.50, "full": 6.00, "category": "panes"},
    {"id": "5", "name": {"es": "Pan con tomate y manchego curado", "en": "Bread with tomato and manchego", "de": "Brot mit Manchego", "pl": "Chleb z manchego", "it": "Pane con manchego", "pt": "Pão com manchego", "ru": "Хлеб с манчего"}, "half": 3.50, "full": 6.00, "category": "panes"},
    {"id": "6", "name": {"es": "Pan con tomate, manchego e ibérico", "en": "Bread with manchego and Iberian ham", "de": "Brot mit Manchego und Ibérico", "pl": "Chleb z manchego i ibérico", "it": "Pane con manchego e ibérico", "pt": "Pão com manchego e ibérico", "ru": "Хлеб с манчего и хамоном"}, "half": 4.00, "full": 7.00, "category": "panes"},
    # ENTRANTES
    {"id": "7", "name": {"es": "Ensaladilla rusa", "en": "Russian salad", "de": "Russischer Salat", "pl": "Sałatka rosyjska", "it": "Insalata russa", "pt": "Salada russa", "ru": "Оливье"}, "half": 4.00, "full": 6.00, "category": "entrantes"},
    {"id": "8", "name": {"es": "Queso blanco de Guía de Isora", "en": "White cheese from Guía de Isora", "de": "Weißkäse aus Guía de Isora", "pl": "Biały ser z Guía de Isora", "it": "Formaggio bianco di Guía de Isora", "pt": "Queijo branco de Guía de Isora", "ru": "Белый сыр из Гиа де Исора"}, "half": 5.00, "full": 8.00, "category": "entrantes"},
    {"id": "9", "name": {"es": "Queso manchego curado", "en": "Cured manchego cheese", "de": "Gereifter Manchego", "pl": "Dojrzały ser manchego", "it": "Manchego stagionato", "pt": "Queijo manchego curado", "ru": "Выдержанный манчего"}, "half": 7.00, "full": 10.50, "category": "entrantes"},
    {"id": "10", "name": {"es": "Queso blanco a la plancha con mojos", "en": "Grilled white cheese with mojos", "de": "Gegrillter Weißkäse mit Mojos", "pl": "Grillowany biały ser z mojos", "it": "Formaggio bianco alla griglia", "pt": "Queijo branco grelhado com mojos", "ru": "Сыр на гриле с мохос"}, "half": None, "full": 9.50, "category": "entrantes"},
    {"id": "11", "name": {"es": "Croquetas mixtas", "en": "Mixed croquettes", "de": "Gemischte Kroketten", "pl": "Krokiety mieszane", "it": "Crocchette miste", "pt": "Croquetes mistos", "ru": "Ассорти крокетов"}, "half": 5.00, "full": 7.00, "category": "entrantes"},
    {"id": "12", "name": {"es": "Champiñones rellenos de almogrote", "en": "Mushrooms stuffed with almogrote", "de": "Pilze mit Almogrote", "pl": "Pieczarki z almogrote", "it": "Funghi ripieni di almogrote", "pt": "Cogumelos recheados", "ru": "Грибы с альмогроте"}, "half": 6.00, "full": 9.00, "category": "entrantes"},
    {"id": "13", "name": {"es": "Gambas al ajillo", "en": "Garlic prawns", "de": "Knoblauchgarnelen", "pl": "Krewetki z czosnkiem", "it": "Gamberi all'aglio", "pt": "Gambas ao alho", "ru": "Креветки с чесноком"}, "half": None, "full": 9.90, "category": "entrantes"},
    {"id": "14", "name": {"es": "Tabla de jamón ibérico", "en": "Iberian ham board", "de": "Ibérico-Schinkenplatte", "pl": "Deska szynki ibérico", "it": "Tagliere di prosciutto ibérico", "pt": "Tábua de presunto ibérico", "ru": "Тарелка хамона иберико"}, "half": 12.50, "full": 18.00, "category": "entrantes"},
    {"id": "15", "name": {"es": "Pimientos de Padrón", "en": "Padrón peppers", "de": "Padrón-Paprika", "pl": "Papryczki Padrón", "it": "Peperoni di Padrón", "pt": "Pimentos de Padrón", "ru": "Перец Падрон"}, "half": 5.00, "full": 8.00, "category": "entrantes"},
    {"id": "16", "name": {"es": "Caracoles", "en": "Snails", "de": "Schnecken", "pl": "Ślimaki", "it": "Lumache", "pt": "Caracóis", "ru": "Улитки"}, "half": 7.00, "full": 11.00, "category": "entrantes"},
    # ENSALADAS
    {"id": "17", "name": {"es": "Ensalada mixta", "en": "Mixed salad", "de": "Gemischter Salat", "pl": "Sałatka mieszana", "it": "Insalata mista", "pt": "Salada mista", "ru": "Смешанный салат"}, "half": None, "full": 6.00, "category": "ensaladas"},
    {"id": "18", "name": {"es": "Ensalada de atún", "en": "Tuna salad", "de": "Thunfischsalat", "pl": "Sałatka z tuńczykiem", "it": "Insalata di tonno", "pt": "Salada de atum", "ru": "Салат с тунцом"}, "half": None, "full": 7.00, "category": "ensaladas"},
    {"id": "19", "name": {"es": "Ensalada de la casa", "en": "House salad", "de": "Haussalat", "pl": "Sałatka domowa", "it": "Insalata della casa", "pt": "Salada da casa", "ru": "Домашний салат"}, "half": None, "full": 8.50, "category": "ensaladas"},
    # CARNES
    {"id": "20", "name": {"es": "Entrecot añojo", "en": "Yearling entrecote", "de": "Jungstier-Entrecôte", "pl": "Antrykot", "it": "Entrecôte di manzo", "pt": "Entrecosto", "ru": "Антрекот"}, "half": None, "full": 15.00, "category": "carnes"},
    {"id": "21", "name": {"es": "Carne fiesta", "en": "Fiesta meat", "de": "Fiesta-Fleisch", "pl": "Mięso fiesta", "it": "Carne fiesta", "pt": "Carne de festa", "ru": "Мясо фиеста"}, "half": None, "full": 11.90, "category": "carnes"},
    {"id": "22", "name": {"es": "Ternera en salsa", "en": "Beef in sauce", "de": "Rindfleisch in Sauce", "pl": "Wołowina w sosie", "it": "Vitello in salsa", "pt": "Vitela em molho", "ru": "Телятина в соусе"}, "half": 8.50, "full": 13.00, "category": "carnes"},
    {"id": "23", "name": {"es": "Albóndigas con papas fritas", "en": "Meatballs with fries", "de": "Fleischbällchen mit Pommes", "pl": "Klopsiki z frytkami", "it": "Polpette con patatine", "pt": "Almôndegas com batatas", "ru": "Фрикадельки с картофелем"}, "half": 6.00, "full": 9.90, "category": "carnes"},
    {"id": "24", "name": {"es": "Pechuga de pollo empanada", "en": "Breaded chicken breast", "de": "Panierte Hähnchenbrust", "pl": "Panierowana pierś kurczaka", "it": "Petto di pollo impanato", "pt": "Peito de frango panado", "ru": "Куриная грудка в панировке"}, "half": None, "full": 9.90, "category": "carnes"},
    {"id": "25", "name": {"es": "Alitas de pollo con papas fritas", "en": "Chicken wings with fries", "de": "Hähnchenflügel mit Pommes", "pl": "Skrzydełka z frytkami", "it": "Ali di pollo con patatine", "pt": "Asas de frango com batatas", "ru": "Куриные крылышки с картофелем"}, "half": 5.00, "full": 8.00, "category": "carnes"},
    {"id": "26", "name": {"es": "Salchichas con papas fritas", "en": "Sausages with fries", "de": "Würstchen mit Pommes", "pl": "Kiełbaski z frytkami", "it": "Salsicce con patatine", "pt": "Salsichas com batatas", "ru": "Сосиски с картофелем"}, "half": 5.00, "full": 8.00, "category": "carnes"},
    {"id": "27", "name": {"es": "Lingote de vaca madurada (220g)", "en": "Aged beef (220g)", "de": "Gereiftes Rindfleisch (220g)", "pl": "Dojrzała wołowina (220g)", "it": "Manzo stagionato (220g)", "pt": "Carne maturada (220g)", "ru": "Выдержанная говядина (220г)"}, "half": None, "full": 17.00, "category": "carnes"},
    # PESCADOS
    {"id": "28", "name": {"es": "Pulpo a la gallega", "en": "Galician-style octopus", "de": "Galizischer Oktopus", "pl": "Ośmiornica po galicyjsku", "it": "Polpo alla galiziana", "pt": "Polvo à galega", "ru": "Осьминог по-галисийски"}, "half": 13.00, "full": 19.00, "category": "pescados"},
    {"id": "29", "name": {"es": "Pulpo a la canaria", "en": "Canarian-style octopus", "de": "Kanarischer Oktopus", "pl": "Ośmiornica po kanaryjsku", "it": "Polpo alla canaria", "pt": "Polvo à canária", "ru": "Осьминог по-канарски"}, "half": 13.00, "full": 19.00, "category": "pescados"},
    {"id": "30", "name": {"es": "Chopitos fritos", "en": "Fried baby squid", "de": "Frittierte Baby-Tintenfische", "pl": "Smażone małe kalmary", "it": "Calamaretti fritti", "pt": "Chocos fritos", "ru": "Жареные кальмарчики"}, "half": 6.50, "full": 9.90, "category": "pescados"},
    {"id": "31", "name": {"es": "Calamares a la andaluza", "en": "Andalusian-style squid", "de": "Andalusische Calamares", "pl": "Kalmary po andaluzyjsku", "it": "Calamari all'andalusa", "pt": "Lulas à andaluza", "ru": "Кальмары по-андалузски"}, "half": 7.00, "full": 12.00, "category": "pescados"},
    {"id": "32", "name": {"es": "Chipirones a la plancha", "en": "Grilled baby squid", "de": "Gegrillte Baby-Tintenfische", "pl": "Grillowane małe kalmary", "it": "Calamaretti alla griglia", "pt": "Lulas grelhadas", "ru": "Кальмарчики на гриле"}, "half": 7.00, "full": 12.00, "category": "pescados"},
    {"id": "33", "name": {"es": "Chocos a la plancha", "en": "Grilled cuttlefish", "de": "Gegrillte Sepien", "pl": "Grillowane mątwy", "it": "Seppie alla griglia", "pt": "Chocos grelhados", "ru": "Каракатицы на гриле"}, "half": 8.00, "full": 13.00, "category": "pescados"},
    {"id": "34", "name": {"es": "Atún a la plancha", "en": "Grilled tuna", "de": "Gegrillter Thunfisch", "pl": "Grillowany tuńczyk", "it": "Tonno alla griglia", "pt": "Atum grelhado", "ru": "Тунец на гриле"}, "half": 7.50, "full": 10.50, "category": "pescados"},
    {"id": "35", "name": {"es": "Bacalao a la portuguesa", "en": "Portuguese-style cod", "de": "Kabeljau auf portugiesische Art", "pl": "Dorsz po portugalsku", "it": "Baccalà alla portoghese", "pt": "Bacalhau à portuguesa", "ru": "Треска по-португальски"}, "half": 9.90, "full": 17.00, "category": "pescados"},
    {"id": "36", "name": {"es": "Pescado a la espalda", "en": "Fish on the back", "de": "Fisch auf dem Rücken", "pl": "Ryba na grzbiecie", "it": "Pesce alla schiena", "pt": "Peixe às costas", "ru": "Рыба на спинке"}, "half": None, "full": 14.50, "category": "pescados"},
    {"id": "37", "name": {"es": "Parrilla de pescado y mariscos (mín. 2)", "en": "Fish & seafood grill (min. 2)", "de": "Fisch-Meeresfrüchte-Grill (mind. 2)", "pl": "Grill z owoców morza (min. 2)", "it": "Grigliata di mare (min. 2)", "pt": "Grelhada de peixe (mín. 2)", "ru": "Гриль из морепродуктов (мин. 2)"}, "half": None, "full": 42.00, "category": "pescados"},
    {"id": "38", "name": {"es": "Fritura de pescado y mariscos (mín. 2)", "en": "Fried fish & seafood (min. 2)", "de": "Frittierte Meeresfrüchte (mind. 2)", "pl": "Smażone owoce morza (min. 2)", "it": "Frittura di mare (min. 2)", "pt": "Fritura de peixe (mín. 2)", "ru": "Жареные морепродукты (мин. 2)"}, "half": None, "full": 44.00, "category": "pescados"},
    {"id": "39", "name": {"es": "Zamburiñas a la plancha", "en": "Grilled scallops", "de": "Gegrillte Jakobsmuscheln", "pl": "Grillowane przegrzebki", "it": "Capesante alla griglia", "pt": "Vieiras grelhadas", "ru": "Морские гребешки на гриле"}, "half": 9.90, "full": 18.00, "category": "pescados"},
    {"id": "40", "name": {"es": "Navajas a la plancha", "en": "Grilled razor clams", "de": "Gegrillte Schwertmuscheln", "pl": "Grillowane małże", "it": "Cannolicchi alla griglia", "pt": "Lingueirões grelhados", "ru": "Морские черенки на гриле"}, "half": 6.00, "full": 9.90, "category": "pescados"},
    {"id": "41", "name": {"es": "Langostinos a la plancha", "en": "Grilled king prawns", "de": "Gegrillte Riesengarnelen", "pl": "Grillowane langustynki", "it": "Scampi alla griglia", "pt": "Lagostins grelhados", "ru": "Лангустины на гриле"}, "half": 6.00, "full": 10.90, "category": "pescados"},
    {"id": "42", "name": {"es": "Gambón a la plancha (unidad)", "en": "Grilled prawn (unit)", "de": "Gegrillte Garnele (Stück)", "pl": "Grillowana krewetka (szt.)", "it": "Gamberone alla griglia (unità)", "pt": "Camarão grelhado (unid.)", "ru": "Креветка на гриле (шт.)"}, "half": None, "full": 2.00, "category": "pescados"},
    # PAPAS
    {"id": "43", "name": {"es": "Papas fritas", "en": "French fries", "de": "Pommes frites", "pl": "Frytki", "it": "Patatine fritte", "pt": "Batatas fritas", "ru": "Картофель фри"}, "half": 2.50, "full": 4.00, "category": "papas"},
    {"id": "44", "name": {"es": "Papas arrugadas", "en": "Wrinkled potatoes", "de": "Runzelkartoffeln", "pl": "Ziemniaki pomarszczone", "it": "Patate rugose", "pt": "Batatas enrugadas", "ru": "Морщинистый картофель"}, "half": 2.50, "full": 4.00, "category": "papas"},
    {"id": "45", "name": {"es": "Huevos rotos con papas fritas", "en": "Broken eggs with fries", "de": "Zerbrochene Eier mit Pommes", "pl": "Jajka z frytkami", "it": "Uova rotte con patatine", "pt": "Ovos rotos com batatas", "ru": "Яичница с картофелем"}, "half": None, "full": 8.00, "category": "papas"},
    # POSTRES CASEROS
    {"id": "46", "name": {"es": "Quesillo", "en": "Quesillo (flan)", "de": "Quesillo (Flan)", "pl": "Quesillo (flan)", "it": "Quesillo (flan)", "pt": "Quesillo (pudim)", "ru": "Кесийо (флан)"}, "half": None, "full": 4.00, "category": "postres"},
    {"id": "47", "name": {"es": "Tiramisú", "en": "Tiramisu", "de": "Tiramisu", "pl": "Tiramisu", "it": "Tiramisù", "pt": "Tiramisu", "ru": "Тирамису"}, "half": None, "full": 4.50, "category": "postres"},
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
