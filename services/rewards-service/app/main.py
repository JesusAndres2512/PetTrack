from fastapi import FastAPI, HTTPException, Depends
from bson import ObjectId
from .database import get_collection
from .models import Reward, Redemption
from .schemas import RewardCreate, RewardResponse, RedemptionCreate, RedemptionResponse
from .security import require_role

app = FastAPI(title="Rewards Service", version="1.0")

rewards_col = get_collection("rewards")
redemptions_col = get_collection("redemptions")

# ------------------------
# 1️⃣ Crear recompensa (solo ADMIN)
# ------------------------
@app.post("/rewards", response_model=RewardResponse)
def create_reward(
    data: RewardCreate,
    user=Depends(require_role(["admin"]))     # ⬅ solo admin puede crear
):
    doc = data.dict()
    result = rewards_col.insert_one(doc)
    return {**doc, "id": str(result.inserted_id)}

# ------------------------
# 2️⃣ Listar recompensas (admin, doctor, owner)
# ------------------------
@app.get("/rewards", response_model=list[RewardResponse])
def list_rewards(
    user=Depends(require_role(["admin", "doctor", "owner"]))
):
    rewards = list(rewards_col.find({}))
    for r in rewards:
        r["id"] = str(r["_id"])
        del r["_id"]
    return rewards

# ------------------------
# 3️⃣ Registrar canje (solo OWNER)
# ------------------------
@app.post("/redeem", response_model=RedemptionResponse)
def redeem_reward(
    data: RedemptionCreate,
    user=Depends(require_role(["owner"]))
):
    # Validación: el owner solo puede canjear para sí mismo
    if data.user_id != str(user["id"]):
        raise HTTPException(status_code=403, detail="Solo puedes canjear tus propias recompensas")

    doc = {
        "user_id": data.user_id,
        "reward_id": data.reward_id,
        "reward_name": data.reward_name,
        "points": data.points,
        "status": "Pendiente",
    }
    result = redemptions_col.insert_one(doc)
    return {**doc, "id": str(result.inserted_id)}

# ------------------------
# 4️⃣ Historial de canjes por usuario
#    owner → solo los suyos
#    admin → todos
# ------------------------
@app.get("/redemptions/{user_id}", response_model=list[RedemptionResponse])
def user_redemptions(
    user_id: str,
    user=Depends(require_role(["admin", "owner"]))
):
    # owner solo puede consultar su propio historial
    if user["role"] == "owner" and user_id != str(user["id"]):
        raise HTTPException(status_code=403, detail="Solo puedes ver tus propios canjes")

    docs = list(redemptions_col.find({"user_id": user_id}))
    redemptions = []
    for d in docs:
        d["id"] = str(d["_id"])
        del d["_id"]
        redemptions.append(d)
    return redemptions
