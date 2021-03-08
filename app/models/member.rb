class Member < ApplicationRecord
    has_many :check_ins
    has_many :memberships
    has_many :support_groups, through: :memberships

    def average_check_ins
        total = 0
        self.check_ins.each do |check_in|
            total += check_in.score
        end

        return total / self.check_ins.count
    end

end
