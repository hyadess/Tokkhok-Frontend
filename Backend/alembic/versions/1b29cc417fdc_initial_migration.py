"""Initial migration

Revision ID: 1b29cc417fdc
Revises: 90cb524c6c9a
Create Date: 2025-01-04 00:29:26.382088

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1b29cc417fdc'
down_revision: Union[str, None] = '90cb524c6c9a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('files', sa.Column('tags', sa.ARRAY(sa.String()), nullable=True))
    op.add_column('files', sa.Column('image_url', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('files', 'image_url')
    op.drop_column('files', 'tags')
    # ### end Alembic commands ###
