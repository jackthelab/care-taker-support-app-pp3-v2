class MembershipsController < ApplicationController

    def create
        Membership.create(
            member_id: params[],
            support_group_id: params[]
        )
    end

end
