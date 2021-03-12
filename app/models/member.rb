class Member < ApplicationRecord
    has_many :check_ins
    has_many :memberships
    has_many :support_groups, through: :memberships

end
