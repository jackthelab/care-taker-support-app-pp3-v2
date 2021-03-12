class CheckInsController < ApplicationController

    def index
        @check_ins = CheckIn.all
        render json: @check_ins.to_json(:include => {
            :member => {only: [:id, :name]}
        }, only: [:id, :score, :comment])
    end

    def create
        check_in = CheckIn.create(
            score: params[:score],
            comment: params[:comment],
            member_id: params[:member_id]
        )

        if check_in
            render json: check_in
        else
            render json: {"message": "Failed to create a new check-in"}
        end
    end

    def update
        check_in = CheckIn.find_by(id: params[:id])
        if check_in.update(comment: params[:comment])
            render json: {"message": "Successfully updated this comment", "comment": check_in.comment}
        else
            render json: {"message": "This failed", "comment": "This failed to update"}
        end

    end

    def destroy
        check_in = CheckIn.find_by(id: params[:id])
        if check_in.destroy
            render json: {"message": "Destruction successful."}
        else
            render json: {"message": "Destruction unsuccessful."}
        end
    end

end
