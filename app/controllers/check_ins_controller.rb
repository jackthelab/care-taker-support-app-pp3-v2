class CheckInsController < ApplicationController

    def index
        @check_ins = CheckIn.all
        render json: @check_ins.to_json(:include => {
            :member => {only: [:id, :name]}
        }, only: [:id, :score, :comment])
    end

end
