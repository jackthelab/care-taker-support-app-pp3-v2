class MembersController < ApplicationController

    def index
        @members = Member.all
        render json: @members.to_json(:include => {
            :support_groups => {except: [:id, :created_at, :updated_at]},
            :check_ins => {only: [:score, :comment]}
        }, only: [:id, :name, :email])
    end

    def create
        member = Member.create(
            name: params[:name],
            email: params[:email]
        )

        render json: member
    end

end
