from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base, relationship
from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, Boolean, func

Base = declarative_base()

class Reward(Base):
    __tablename__ = "rewards"
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    desc = Column(Text)
    cost = Column(Integer, nullable=False)
    img = Column(String(500))
    active = Column(Boolean, default=True)

class Redemption(Base):
    __tablename__ = "redemptions"
    id = Column(Integer, primary_key=True, autoincrement=True)
    reward_id = Column(Integer, ForeignKey("rewards.id"), nullable=False)
    user_name = Column(String(255), nullable=False)
    date = Column(DateTime(timezone=True), server_default=func.now())
    points = Column(Integer, nullable=False)
    status = Column(String(50), default="Pendiente")

    reward = relationship("Reward")
