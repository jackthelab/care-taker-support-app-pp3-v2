class SupportGroupsController < ApplicationController

    def index
        @support_groups = SupportGroup.all
        render json: @support_groups.to_json(:include => {
            :members => {only: [:name]}
        }, except: [:created_at, :updated_at])
    end

end
