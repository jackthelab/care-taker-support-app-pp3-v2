class MembersController < ApplicationController

    def index
        @members = Member.all
        render json: @members.to_json(:include => {
            :support_groups => {except: [:id, :created_at, :updated_at]},
            :check_ins => {only: [:score, :comment]}
        }, only: [:name])
    end

end
