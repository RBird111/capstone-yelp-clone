"""empty message

Revision ID: c47734982156
Revises: cc44ec3ca2d5
Create Date: 2023-05-16 08:29:12.542901

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c47734982156'
down_revision = 'cc44ec3ca2d5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('businesses', schema=None) as batch_op:
        batch_op.alter_column('description',
               existing_type=sa.VARCHAR(length=255),
               type_=sa.String(length=1000),
               existing_nullable=False)

    with op.batch_alter_table('images', schema=None) as batch_op:
        batch_op.alter_column('url',
               existing_type=sa.VARCHAR(length=255),
               type_=sa.String(length=500),
               existing_nullable=False)

    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.alter_column('body',
               existing_type=sa.VARCHAR(length=255),
               type_=sa.String(length=1000),
               existing_nullable=False)

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('hashed_password',
               existing_type=sa.VARCHAR(length=255),
               type_=sa.String(length=500),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('hashed_password',
               existing_type=sa.String(length=500),
               type_=sa.VARCHAR(length=255),
               existing_nullable=False)

    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.alter_column('body',
               existing_type=sa.String(length=1000),
               type_=sa.VARCHAR(length=255),
               existing_nullable=False)

    with op.batch_alter_table('images', schema=None) as batch_op:
        batch_op.alter_column('url',
               existing_type=sa.String(length=500),
               type_=sa.VARCHAR(length=255),
               existing_nullable=False)

    with op.batch_alter_table('businesses', schema=None) as batch_op:
        batch_op.alter_column('description',
               existing_type=sa.String(length=1000),
               type_=sa.VARCHAR(length=255),
               existing_nullable=False)

    # ### end Alembic commands ###