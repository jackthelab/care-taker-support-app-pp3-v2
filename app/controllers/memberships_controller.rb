class MembershipsController < ApplicationController

    def index
        memberships = Membership.all
        render json: memberships.to_json(:include => {
            :member => {except: [:created_at, :updated_at]},
            :support_group => {except: [:created_at, :updated_at]}
        }, except: [:created_at, :updated_at])
    end

    def create
        membership = Membership.create(
            member_id: params[:member_id],
            support_group_id: params[:support_group_id]
        )
        render json: membership, include: :support_group
    end

    def destroy
        membership = Membership.find_by(id: params[:id])
        membership.destroy

        render json: {"message": "You successfully left the #{membership.support_group.name} group"}
    end

end
