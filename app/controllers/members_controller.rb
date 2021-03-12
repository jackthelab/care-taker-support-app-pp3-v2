class MembersController < ApplicationController

    def index
        @members = Member.all
        render json: @members.to_json(:include => {
            :support_groups => {except: [:id, :created_at, :updated_at]},
            :check_ins => {only: [:score, :comment]},
            :memberships => {except: [:created_at, :updated_at]},
        }, only: [:id, :name, :email])
    end

    def show
        member = Member.find_by(id: params[:id])
        render json: {
            "member": member,
        }
    end

    def create
        member = Member.create(
            name: params[:name],
            email: params[:email]
        )

        render json: member
    end

    def get_memberships
        member = Member.find_by(id: params[:id])
        if member
            if member.memberships.count > 0
                memberships = member.memberships
                render json: memberships.to_json(:include => {
                    :support_group => {only: [:id, :name, :meeting_day]},
                    :member => {only: [:id, :name]}
                }, except: [:created_at, :updated_at])
            else
                render json: {"message": "This member isn't currently in any groups"}
            end
        else
            render json: {"message": "This member can't be found."}
        end
    end

    def get_check_ins
        member = Member.find_by(id: params[:id])
        if member
            if member.check_ins.count > 0
                check_ins = member.check_ins
                render json: check_ins.to_json(:include => {
                    :member => {only: [:id, :name]}
                })
            else
                render json: {"message": "This member has no check-ins yet"}
            end
        else
            render json: {"message": "This member can't be found."}
        end 
    end

end
