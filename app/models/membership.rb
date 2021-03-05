class Membership < ApplicationRecord
  belongs_to :member
  belongs_to :support_group
end
