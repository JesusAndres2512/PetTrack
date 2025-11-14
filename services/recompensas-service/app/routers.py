from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from typing import List
from .config import DB_URL
from . import models, schemas, crud

router = APIRouter()

engine = create_async_engine(DB_URL, echo=False, future=True)
SessionLocal = sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

async def get_session():
    async with SessionLocal() as session:
        yield session

@router.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(models.Base.metadata.create_all)

@router.get("/rewards", response_model=List[schemas.RewardOut])
async def list_rewards(session: AsyncSession = Depends(get_session)):
    return await crud.get_rewards(session)

@router.post("/rewards", response_model=schemas.RewardOut, status_code=201)
async def create_reward(data: schemas.RewardCreate, session: AsyncSession = Depends(get_session)):
    return await crud.create_reward(session, data.dict())

@router.post("/redemptions", response_model=schemas.RedemptionOut, status_code=201)
async def redeem(data: schemas.RedemptionCreate, session: AsyncSession = Depends(get_session)):
    reward = await crud.get_reward(session, data.reward_id)
    if not reward:
        raise HTTPException(status_code=404, detail="Reward not found")
    return await crud.create_redemption(session, reward, data.user_name)

@router.get("/redemptions", response_model=List[schemas.RedemptionOut])
async def list_redemptions(session: AsyncSession = Depends(get_session)):
    return await crud.list_redemptions(session)
