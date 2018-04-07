"""add long_description to exams

Revision ID: 7abffd74212e
Revises:
Create Date: 2018-04-06 19:01:13.030656

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7abffd74212e'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('exams', sa.Column(
        'long_description',
        sa.Text,
        nullable=False,
        server_default='Default exam description'
    ))


def downgrade():
    pass
