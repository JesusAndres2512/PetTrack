from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class RewardCreate(BaseModel):
    title: str
    desc: Optional[str]
    cost: int
    img: Optional[str]

class RewardOut(BaseModel):
    id: int
    title: str
    desc: Optional[str]
    cost: int
    img: Optional[str]
    active: bool
    class Config:
        orm_mode = True

class RedemptionCreate(BaseModel):
    reward_id: int
    user_name: str

class RedemptionOut(BaseModel):
    id: int
    reward_id: int
    user_name: str
    date: datetime
    points: int
    status: str
    reward: RewardOut
    class Config:
        orm_mode = True
