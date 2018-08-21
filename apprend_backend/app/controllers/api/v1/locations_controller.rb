class Api::V1::LocationsController < ApplicationController


  def index
    render json: Location.all
  end

end
