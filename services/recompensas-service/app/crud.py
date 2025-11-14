from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from .models import Reward, Redemption

async def get_rewards(session: AsyncSession):
    result = await session.execute(select(Reward).where(Reward.active == True))
    return result.scalars().all()

async def get_reward(session: AsyncSession, reward_id: int):
    result = await session.execute(select(Reward).where(Reward.id == reward_id))
    return result.scalar_one_or_none()

async def create_reward(session: AsyncSession, data: dict):
    reward = Reward(**data)
    session.add(reward)
    await session.commit()
    await session.refresh(reward)
    return reward

async def create_redemption(session: AsyncSession, reward: Reward, user_name: str):
    redemption = Redemption(
        reward_id=reward.id,
        user_name=user_name,
        points=reward.cost
    )
    session.add(redemption)
    await session.commit()
    await session.refresh(redemption)
    return redemption

async def list_redemptions(session: AsyncSession):
    result = await session.execute(select(Redemption).order_by(Redemption.date.desc()))
    return result.scalars().all()
