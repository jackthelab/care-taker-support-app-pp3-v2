class SupportGroup < ApplicationRecord
    has_many :memberships
    has_many :members, through: :memberships
end
